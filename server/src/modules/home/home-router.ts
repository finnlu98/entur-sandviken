import BaseRouter from '../common/base-router';
import HomeService from './home-service';

export default class HomeRouter extends BaseRouter {
  private homeService: HomeService;
  constructor() {
    super('/me/home');
    this.homeService = new HomeService();
    this.setRoute();
  }
  setRoute(): void {
    this.route.get(`${this.subRoute}/config`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const homeConfig = await this.homeService.getHomeConfig(userId);
      return res.json(homeConfig);
    });

    this.route.post(`${this.subRoute}/config`, async (req, res) => {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const { widgetPositions, widgetConfig } = req.body;

      const updatedData = await this.homeService.updateHomeConfig(
        userId,
        widgetPositions,
        widgetConfig
      );

      if (!updatedData) {
        return res.status(400).json({ error: 'Failed to update home config' });
      }

      return res.json({ updatedData });
    });
  }
}
