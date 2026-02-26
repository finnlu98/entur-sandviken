import BaseRouter from '../common/base-router';
import type { Request, Response } from 'express';
import { UserService } from './user-fetcher';

export class UserRouter extends BaseRouter {
  fetcher: UserService;

  constructor() {
    super('/user');
    this.fetcher = new UserService();
    this.setRoute();
  }

  setRoute(): void {
    this.route.get(`${this.subRoute}`, async (req: Request, res: Response) => {
      try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await this.fetcher.getUserById(id);

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
      } catch {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
    });

    this.route.post(this.subRoute, async (req: Request, res: Response) => {
      try {
        const { email } = req.body;

        if (!email) {
          return res.status(400).json({ error: 'Email is required' });
        }

        const user = await this.fetcher.createUser(email);
        res.status(201).json(user);
      } catch (error: any) {
        if (error.code === 'P2002') {
          return res.status(409).json({ error: 'User with this email already exists' });
        }
        res.status(500).json({ error: 'Failed to create user' });
      }
    });
  }
}
