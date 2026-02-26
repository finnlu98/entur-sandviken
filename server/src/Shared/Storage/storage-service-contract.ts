export type UploadInput = {
  data: Buffer;
  contentType: string;
  filename?: string;
};

export type StoredImage = {
  key: string;
  url: string;
  contentType: string;
  size: number;
};

export interface IStorageService {
  uploadImage(key: string, file: UploadInput): Promise<StoredImage>;
  getImage(key: string): Promise<Buffer | null>;
  removeImage(key: string): Promise<void>;
  getPublicUrl(key: string): string;
}
