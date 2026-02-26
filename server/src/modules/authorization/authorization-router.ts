import prisma from '../../lib/prisma';
import { StorageService } from '../../shared/storage/storage-service';
import BaseRouter from '../common/base-router';
import AuthorizationService from './authorization-service';
import path from 'path';
import { upload } from '../../shared/storage/upload';

export default class AuthorizationRouter extends BaseRouter {
  private authorizationService: AuthorizationService;
  private storageService: StorageService;
  constructor() {
    super('/auth');
    this.authorizationService = new AuthorizationService();
    this.storageService = new StorageService(path.join(process.cwd(), 'data'), '/media');
    this.setRoute();
  }

  setRoute(): void {
    this.route.post(`${this.subRoute}/invite`, async (req, res) => {
      if (req.header('x-admin-key') !== process.env.ADMIN_KEY) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const emailRaw = String(req.body?.email ?? '');
      const email = emailRaw.trim().toLowerCase();
      if (!email.includes('@')) return res.status(400).json({ error: 'Invalid email' });

      const invite = await this.authorizationService.generateInvite(email);
      console.log('MAGIC LINK:', invite);
      return res.status(200).json({ message: 'Invite created', link: invite });
    });

    this.route.post(`${this.subRoute}/magic/consume`, async (req, res) => {
      const { token } = req.body;
      if (!token) return res.status(400).json({ error: 'Missing token' });

      const result = await this.authorizationService.consumeMagicToken(token);

      if (!result.success) {
        const status = result.error === 'User disabled' ? 403 : 401;
        return res.status(status).json({ error: result.error });
      }

      (req.session as any).userId = result.userId;
      return res.json({ user: { email: result.email } });
    });

    this.route.post(`${this.subRoute}/login`, async (req, res) => {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
      }

      if (user.status === 'disabled') {
        return res.status(403).json({ error: 'User disabled' });
      }

      if (user.status === 'invited') {
        await prisma.user.update({
          where: { id: user.id },
          data: { status: 'active' },
        });
      }

      (req.session as any).userId = user.id;
      return res.json({
        user: { email: user.email },
      });
    });

    this.route.post(`${this.subRoute}/logout`, (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('heimr.sid');
        return res.status(200).json({ message: 'Logged out' });
      });
    });

    this.route.get(`${this.subRoute}/me`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({
        user: {
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_img_key
            ? this.storageService.getPublicUrl(user.avatar_img_key)
            : null,
        },
      });
    });

    this.route.put(`${this.subRoute}/me/personalia`, upload.single('avatar'), async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const { name } = req.body;
      const file = req.file;
      await this.authorizationService.updatePersonalia(userId, name, file);

      return res.status(200).json({ message: 'Profile updated' });
    });

    this.route.get(`${this.subRoute}/me/home`, async (req, res) => {
      let userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      if (!userId) {
        ({ userId } = req.body);
      }

      const home = await this.authorizationService.getUserHome(userId);

      return res.status(200).json({ home });
    });

    this.route.post(`${this.subRoute}/me/home`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const home = await this.authorizationService.createUserHome(userId);
      return res.status(200).json({ home });
    });

    this.route.put(`${this.subRoute}/me/home`, upload.single('banner'), async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const { name, location } = req.body;
      const file = req.file;

      const home = await this.authorizationService.updateHome(userId, { name, location }, file);

      return res.status(200).json({ home });
    });

    this.route.post(`${this.subRoute}/me/home/members`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      const { email } = req.body;

      const result = await this.authorizationService.addHomeMember(userId, email);
      if (!result) {
        return res.status(400).json({ error: 'Failed to add member' });
      }
      return res.status(200).json({ user: result });
    });

    this.route.put(`${this.subRoute}/me/home/member`, upload.single('avatar'), async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      const { email, name } = req.body;
      const file = req.file;

      const result = await this.authorizationService.updateHomeMember(userId, email, name, file);
      if (!result) {
        return res.status(400).json({ error: 'Failed to update member' });
      }
      return res.status(200).json({ user: result });
    });

    this.route.delete(`${this.subRoute}/me/home/members`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      const { email } = req.body;

      const result = await this.authorizationService.removeHomeMember(userId, email);
      if (!result.success) {
        return res.status(400).json({ error: result?.message });
      }
      return res.status(200).json({ message: 'Member removed' });
    });
  }
}
