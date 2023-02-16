import { Image } from "./image.interface";

export interface Images {
  resources: Array<Image>;
  next_cursor: string;
}