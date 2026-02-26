import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import crypto from "crypto";
import type { IStorageService, UploadInput, StoredImage } from "./storage-service-contract";

export class StorageService implements IStorageService {
  constructor(
    private readonly rootDir: string,
    private readonly publicBaseUrl: string,
  ) {}

  private safeJoin(key: string) {
    const safeKey = key.replace(/\\/g, "/").replace(/^\/+/, "");
    const full = path.join(this.rootDir, safeKey);
    const normalized = path.normalize(full);
    if (!normalized.startsWith(path.normalize(this.rootDir))) {
      throw new Error("Invalid key (path traversal)");
    }
    return { safeKey, fullPath: normalized };
  }

  getPublicUrl(key: string) {
    const safeKey = key.replace(/\\/g, "/").replace(/^\/+/, "");
    return `${process.env.BACKEND_ORIGIN}${this.publicBaseUrl.replace(/\/$/, "")}/${safeKey}`;
  }

  async uploadImage(key: string, file: UploadInput): Promise<StoredImage> {
    const { safeKey, fullPath } = this.safeJoin(key);
    const dir = path.dirname(fullPath);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(fullPath, file.data);

    return {
      key: safeKey,
      url: this.getPublicUrl(safeKey),
      contentType: file.contentType,
      size: file.data.length,
    };
  }

  async removeImage(key: string): Promise<void> {
    const { fullPath } = this.safeJoin(key);
    if (!existsSync(fullPath)) return;
    await fs.unlink(fullPath);
  }

  async getImage(key: string): Promise<Buffer | null> {
    const { fullPath } = this.safeJoin(key);
    if (!existsSync(fullPath)) return null;
    return await fs.readFile(fullPath);
  }

  imageKey(path: string, ext = "webp") {
    const randomName = crypto.randomBytes(16).toString("hex");
    return `${path}/${randomName}.${ext}`;
  }

  getMimeTypeExtension(mimeType: string): string {
    switch (mimeType) {
      case "image/jpeg":
        return "jpg";
      case "image/png":
        return "png";
      case "image/webp":
        return "webp";
      default:
        return "bin";
    }
  }
}
