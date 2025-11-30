import { Component } from "../lib/Component";
import { GoodsList } from "./GoodsList";
import { Element } from "../lib/Element";

export class GoodsSection extends Component{
    constructor(props){
        super(props)
        this.goodList =  new GoodsList()
    }
    render(){
        const goodsSection = new Element(
            "section",
      {
        id: "goodes-cards",
        class: "goodes-cards",
      },
      new Element(
        "div",
        {
            id: "container",
            class: "container",
        },
       this.goodList.mount()
      )
    )
    return goodsSection;
    }
}