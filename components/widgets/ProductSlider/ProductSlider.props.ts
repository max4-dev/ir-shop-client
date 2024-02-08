import { DetailedHTMLProps, HTMLAttributes } from "react";
import Swiper from "swiper";

export interface ProductSliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  thumbsSwiper: Swiper | null;
  setThumbsSwiper: (swiper: Swiper) => void;
}