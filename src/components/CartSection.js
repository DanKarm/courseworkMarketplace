import { Component } from "../lib/Component";
import { CART }from "./Cart";
import { Element } from "../lib/Element";

export class CartSection extends Component{
    constructor(props){
        super(props)
        this.cart = CART
    }
    disableCart(){
        const cart = document.getElementById("cart_wrapper");
        cart.classList.remove("active");
    }
    deleteAll(){
        localStorage.clear()
        CART.loadGoods()
    }
    render(){

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
            "button",
            {
                type:"button",
                class:"buttto_cart_delete-all",
                textContent:"DALL",
                onclick: this.deleteAll,
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