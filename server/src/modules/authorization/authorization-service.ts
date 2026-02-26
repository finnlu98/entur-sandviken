import prisma from '../../lib/prisma';
import { StorageService } from '../../Shared/storage/storage-service';
import path from 'path';
import { StoragePath } from '../../Shared/storage/storage-path';
import type { Home, User } from '../../generated/prisma';
import type { Location } from '../../model/data/location';
import moment from 'moment';
import { generateToken, hashToken } from '../../lib/encryption';

export default class AuthorizationService {
  private storageService: StorageService;
  constructor() {
    this.storageService = new StorageService(
      path.join(process.cwd(), StoragePath.StorageRoot),
      `/${StoragePath.MediaEndpoint}`
    );
  }

  async generateInvite(email: string): Promise<string> {
    const user = await prisma.user.upsert({
      where: { email },
      update: { status: 'invited' },
      create: { email, status: 'invited', created_at: new Date() },
    });

    if (!user.home_id) {
      const home = await prisma.home.create({ data: {} });
      await prisma.user.update({
        where: { id: user.id },
        data: { home_id: home.id },
      });
    }

    const token = generateToken();
    const tokenHash = hashToken(token);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days (login link)
    await prisma.loginTokens.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        purpose: 'invite',
        expires_at: expiresAt,
        created_at: new Date(),
      },
    });

    return `${process.env.FRONTEND_ORIGIN}?token=${encodeURIComponent(token)}`;
  }

  async consumeMagicToken(token: string): Promise<{
    success: boolean;
    error?: string;
    userId?: string;
    email?: string;
  }> {
    const tokenHash = hashToken(token);

    const record = await prisma.loginTokens.findUnique({
      where: { token_hash: tokenHash },
      include: { user: true },
    });

    if (!record) {
      return { success: false, error: 'Invalid token' };
    }

    if (record.used_at) {
      return { success: false, error: 'Token already used' };
    }

    if (record.expires_at.getTime() < Date.now()) {
      return { success: false, error: 'Token expired' };
    }

    const user = record.user;

    if (user.status === 'disabled') {
      return { success: false, error: 'User disabled' };
    }

    await prisma.loginTokens.update({
      where: { id: record.id },
      data: { used_at: new Date() },
    });

    if (user.status !== 'active') {
      await prisma.user.update({
        where: { id: user.id },
        data: { status: 'active' },
      });
    }

    return { success: true, userId: user.id, email: user.email };
  }

  async uploadImage(file: Express.Multer.File, storePath: string): Promise<string> {
    const ext = this.storageService.getMimeTypeExtension(file.mimetype);
    const key = this.storageService.imageKey(storePath, ext);
    const stored = await this.storageService.uploadImage(key, {
      data: file.buffer,
      contentType: file.mimetype,
      filename: file.originalname,
    });
    return stored.key;
  }

  async updatePersonalia(userId: string, name?: string, file?: Express.Multer.File): Promise<any> {
    const updateData: { name?: string; avatar_img_key?: string } = {};

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (file) {
      updateData.avatar_img_key = await this.uploadImage(file, StoragePath.UserPath);

      if (user.avatar_img_key) {
        await this.storageService.removeImage(user.avatar_img_key);
      }
    }

    if (name) {
      updateData.name = name;
    }

    if (Object.keys(updateData).length > 0) {
      const res = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      return res;
    }

    return this.transformUser(user);
  }

  async getUserHome(userId: any): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (!user?.home_id) {
      return null;
    }

    const home = await prisma.home.findFirst({
      where: { id: user.home_id },
      include: { users: true },
    });

    return home ? this.transformHome(home) : null;
  }

  async createUserHome(userId: any): Promise<Home> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (user.home_id) {
      const existingHome = await prisma.home.findUnique({
        where: { id: user.home_id },
        include: { users: true },
      });
      if (existingHome) {
        return existingHome;
      }
    }

    const home = await prisma.home.create({ data: {} });
    await prisma.user.update({
      where: { id: userId },
      data: { home_id: home.id },
    });

    return home;
  }

  async updateHome(
    userId: any,
    homeData: Partial<Home>,
    file?: Express.Multer.File
  ): Promise<Home> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let homeId = user.home_id;

    if (!homeId) {
      const home = await this.createUserHome(userId);
      homeId = home.id;
    }

    const { ...updateData } = homeData;
    const filteredUpdateData: any = {};

    if (file) {
      const existingHome = await prisma.home.findUnique({ where: { id: homeId } });
      filteredUpdateData.home_img_key = await this.uploadImage(file, StoragePath.HomePath);
      if (existingHome?.home_img_key) {
        await this.storageService.removeImage(existingHome.home_img_key);
      }
    }

    if (updateData.name !== undefined) filteredUpdateData.name = updateData.name;

    if (updateData.location !== undefined) {
      try {
        const parsed =
          typeof updateData.location === 'string'
            ? JSON.parse(updateData.location)
            : updateData.location;

        if (parsed && typeof parsed === 'object' && 'lat' in parsed && 'lon' in parsed) {
          const loc: Location = {
            lat: parsed.lat,
            lon: parsed.lon,
          };
          filteredUpdateData.location = loc;
        }
      } catch {
        filteredUpdateData.location = null;
      }
    }

    const updatedHome = await prisma.home.update({
      where: { id: homeId },
      data: filteredUpdateData,
      include: { users: true },
    });

    return this.transformHome(updatedHome);
  }

  async addHomeMember(userId: string, addUserEmail: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (!user.home_id) {
      return null;
    }

    const addUser = await prisma.user.findUnique({ where: { email: addUserEmail } });
    if (!addUser) {
      const newUser = await prisma.user.create({
        data: {
          email: addUserEmail,
          status: 'invited',
          created_at: moment().toDate(),
          home_id: user.home_id,
        },
      });

      return this.transformUser(newUser);
    }

    const updatedUser = await prisma.user.update({
      where: { id: addUser.id },
      data: { home_id: user.home_id },
    });

    return this.transformUser(updatedUser);
  }

  async updateHomeMember(
    userId: string,
    updateUserEmail: string,
    name: string,
    file?: Express.Multer.File
  ): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (!user.home_id) {
      return null;
    }
    const updateUser = await prisma.user.findUnique({ where: { email: updateUserEmail } });
    if (!updateUser) {
      return null;
    }

    if (updateUser.home_id !== user.home_id) {
      return null;
    }

    const updateData: { name?: string; avatar_img_key?: string } = {};

    if (file) {
      updateData.avatar_img_key = await this.uploadImage(file, StoragePath.UserPath);

      if (user.avatar_img_key) {
        await this.storageService.removeImage(user.avatar_img_key);
      }
    }

    if (name) {
      updateData.name = name;
    }
    const res = await prisma.user.update({
      where: { id: updateUser.id },
      data: updateData,
    });

    return this.transformUser(res);
  }

  async removeHomeMember(
    userId: string,
    email: string
  ): Promise<{ success: boolean; message?: string }> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (!user.home_id) {
      return { success: false, message: 'User has no home' };
    }
    const removeUser = await prisma.user.findUnique({ where: { email } });
    if (!removeUser) {
      return { success: false, message: 'User not found' };
    }
    if (removeUser.home_id !== user.home_id) {
      return { success: false, message: 'User is not a member of your home' };
    }

    await prisma.user.update({
      where: { id: removeUser.id },
      data: { home_id: null },
    });
    return { success: true };
  }

  transformHome(home: Home & { users?: User[] }): any {
    const { home_img_key, users, ...rest } = home;
    return {
      ...rest,
      bannerUrl: home_img_key ? this.storageService.getPublicUrl(home_img_key) : null,
      users: users?.map((user) => this.transformUser(user)),
    };
  }

  transformUser(user: User): any {
    const { avatar_img_key, ...rest } = user;
    return {
      ...rest,
      avatarUrl: avatar_img_key ? this.storageService.getPublicUrl(avatar_img_key) : null,
    };
  }
}
