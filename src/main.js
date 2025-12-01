import { Header } from "./components/Header";
import { Slider } from "./components/Slider";
import { GoodsSection } from "./components/GoodsSection";
import { CartSection } from "./components/CartSection";
import { initSlider } from "./slider";

const APP = document.getElementById("app")


const HEADER = new Header();
const slider = new Slider();
const goodsSection = new GoodsSection();
const cartSection = new CartSection();




const fragment = document.createDocumentFragment();
fragment.append(
  HEADER.mount(),
  cartSection.mount(),
  slider.mount(),
  goodsSection.mount(),
)




APP.append(fragment);
export {
  cartSection
}
initSlider();
