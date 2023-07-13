import { dailyMetadata } from "./dailyMetadata";

export interface DailyUsage {
    forecastDate: string;
    data:dailyMetadata[];
}
  