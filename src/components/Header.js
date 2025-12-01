import { Element } from "../lib/Element";
import { Component } from "../lib/Component";

export class Header extends Component{
    constructor(props){
        super(props)
    }
    activeCart(){
        const cart = document.getElementById("cart_wrapper");
        cart.classList.add("active");
    }
    render(){
        const HEADER = new Element(
            "header",
      {
        id: "header",
        class: "header",
      },
      new Element(
        "div",
        {
            id: "container",
            class: "container",
        },
        new Element(
            "form",
            {
                id:"header-form",
                class:"header-form"
            },
            new Element(
                "span",
                {
                    id:"Logo",
                    class:"Logo",
                    textContent:"WB",
                },
            ),
            new Element(
                "input",
                {
                    id:"header-search",
                    class:"header-search",
                    type:"search",
                },
            ),
            new Element(
                "button",
                {
                    id:"header_cart-button",
                    class:"header_cart-button",
                    type:"button",
                    textContent:"Cart",
                    onclick: this.activeCart,
                }
            )
        )
      ),
        )
    return HEADER;
    }
}