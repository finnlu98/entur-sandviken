import type { JsonValue } from "@prisma/client/runtime/client";

export interface HomeConfigDto {
  widgetPositions: JsonValue | null;
  widgetConfig: JsonValue | null;
}
