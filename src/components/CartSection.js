import { Component } from "../lib/Component";
import { Cart } from "./Cart";
import { Element } from "../lib/Element";

export class CartSection extends Component{
    constructor(props){
        super(props)
    }
    disableCart(){
        const cart = document.getElementById("cart_wrapper");
        cart.classList.remove("active");
    }
    render(){
        this.cart =  new Cart()
        const goodsSection = new Element(
          
            "section",
      {
        id: "cart_wrapper",
        class: "cart_wrapper",
      },
      new Element(
        "div",
        {
            id: "wrap",
            class: "wrap",
        },
        new Element(
            "button",
            {
                type:"button",
                class:"buttto_cart_exet",
                textContent:"X",
                onclick: this.disableCart,
            }

        ),
        new Element(
            "div",{
                class:"cart_list"
            },
            this.cart.mount()
        )

      )
    )
    return goodsSection;
    }
}