import prisma from "../../Lib/prisma";
import type { HomeConfigDto } from "../../Model/data/Home/HomeConfigDto";

export default class HomeService {
  async getHomeConfig(userId: string): Promise<HomeConfigDto | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    if (!user.home_id) {
      return null;
    }
    const home = await prisma.home.findUnique({ where: { id: user.home_id } });
    if (!home || (!home.widget_positions && !home.widget_config)) {
      return null;
    }

    return {
      widgetPositions: home?.widget_positions ?? null,
      widgetConfig: home?.widget_config ?? null,
    };
  }

  async updateHomeConfig(userId: string, widgetPositions: any, widgetConfig: any): Promise<HomeConfigDto | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    if (!user.home_id) {
      return null;
    }
    const home = await prisma.home.findUnique({ where: { id: user.home_id } });
    if (!home) {
      return null;
    }
    const updatedHome = await prisma.home.update({
      where: { id: user.home_id },
      data: {
        widget_positions: widgetPositions,
        widget_config: widgetConfig,
      },
    });
    return {
      widgetPositions: updatedHome?.widget_positions ?? null,
      widgetConfig: updatedHome?.widget_config ?? null,
    };
  }
}
