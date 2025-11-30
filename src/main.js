import { Header } from "./components/Header";
import { Slider } from "./components/Slider";
import { GoodsList } from "./components/GoodsList";
import { GoodsSection } from "./components/GoodsSection";
const APP = document.getElementById("app")


const HEADER = new Header();
const slider = new Slider();
const goodsList = new GoodsList();
const goodsSection = new GoodsSection();




const fragment = document.createDocumentFragment();
fragment.append(
  HEADER.mount(),
  slider.mount(),
  goodsSection.mount(),
)




APP.append(fragment);