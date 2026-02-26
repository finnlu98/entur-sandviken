import express from 'express';
import path from 'path';
import { StoragePath } from './storage-path';

export function registerMediaRoute(app: express.Express) {
  const mediaRoot =
    process.env.NODE_ENV === 'production'
      ? (process.env.MEDIA_ROOT ?? path.join(process.cwd(), StoragePath.StorageRoot))
      : path.join(process.cwd(), StoragePath.StorageRoot);
  app.use(
    `/${StoragePath.MediaEndpoint}`,
    express.static(mediaRoot, {
      maxAge: '365d',
      immutable: true,
      setHeaders: (res) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      },
    })
  );
}
