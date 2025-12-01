import { Element } from "../lib/Element";
import { Component } from "../lib/Component";

export class Goods extends Component{
    constructor(props){
        super(props);
        this.value = 0;
        this.value = localStorage.getItem(this.props.id);
        this.addToCart = this.addToCart.bind(this);

        
    }

    getDiscount(){
        const cardInfo = this.props;
        const {
            price = 0,
            discount = 0,
        } = cardInfo;
        const discountedPrice = price - (price * discount / 100);
        return Number(discountedPrice.toFixed(2));
    }
    addToCart(){
    const { id } = this.props;

    let cart = JSON.parse(localStorage.getItem("cart")) || {};


    if (!cart[id]) {
        cart[id] = { id, count: 1 };
    } else {
        cart[id].count += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    }
    
    render(){
    const cardInfo = this.props;
          const {
      name = "not data",
      price = 999,
      discount = 0,
      img = "not_data",
    } = cardInfo;

    const card = new Element(
        "li",
        {
            class: "cards-item",
        },
        new Element(
            "div",
            {
                class:"cards-main"
            },
            new Element(
                "div",
                {
                    class: "cards-img"
                },
                new Element(
                    "img",
                    {
                        src: `/goods_pictures/${img}.jpg`
                    }
                )
            ),
            new Element(
                "form",
                {
                    class:"cards-main-form"
                },
                new Element(
                    "span",
                    {
                        class:"discount",
                        textContent: `${discount}%`
                    }
                ),
                new Element(
                    "button",
                    {
                       type:"button", 
                       class:"submit-button",
                       textContent:"Add",
                       onclick: this.addToCart,
                       
                    }
                )
            )
        ),
        new Element(
            "div",
            {
                class: "cards-bottom",
            },
            new Element(
                "div",
                {
                    class:"cards-bottom-left",
                },
                new Element(
                    "span",
                    {
                        class:"price-with-discount",
                        textContent:`${this.getDiscount()}`,
                    },
                ),
                new Element(
                    "span",
                    {
                        class:"name-of-goods",
                        textContent:`${name}`,
                    },
                )
            ),
            new Element(
                "div",
                {
                    class:"cards-bottom-right",
                },
                new Element(
                    "span",
                    {
                        class:"price",
                        textContent:`${price}`
                    }
                )
            )
            
        )
    )
    return card;
    }
}