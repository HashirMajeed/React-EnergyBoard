import { forecastData } from "./forecastData";

export interface FourteenDayHistory {
  data : forecastData[];
    metadata : { datasets : string[]};
    
  }
  