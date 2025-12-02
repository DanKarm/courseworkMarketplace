import { Element } from "../lib/Element";
import { Component } from "../lib/Component";
import { getGoodsById } from "../api/mockApi";
import { Goods } from "../components/Goods";
import { citiesStore } from "../state/cartStore";

export class Cart extends Component{
    constructor(props){
        super(props)
         this.state = {
            goods: [],
            isLoading: true,
        };
    }
    countPrice(goods) {
        if (!goods || goods.length === 0) return 0;

        const total = goods.reduce((sum, item) => {
            const price = Number(item.price);
            const discount = Number(item.discount);

            const final = price * (1 - discount / 100);

            return sum + final;
        }, 0);

        return Math.round(total * 100) / 100; // округление до 2 знаков
    }




    async loadGoods() {
        this.setState({ 
                isLoading: true 
        });
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        const goods = [];

        for (const id in cart) {
            if (!Object.hasOwn(cart, id)) continue;

            const item = cart[id];


            const product = await getGoodsById(item.id);


            for (let i = 0; i < item.count; i++) {
                goods.push(product);
            }
        }

    console.log("goods:",goods);
    this.setState({ 
                goods: goods,
                isLoading: false 
    });
}

    render(){
        const cart = new Element(
            'ul',
            {
                class:"cards-list"
            },
            
        )
      for (const goods of this.state.goods) {
      const cityEl = new Goods(goods);
      cart.append(cityEl.mount());
    }
        console.log(this.countPrice(this.state.goods))
        const price = new Element(
            "span",{
                class:"price-with-discount",
                textContent :`price:${this.countPrice(this.state.goods)}`,
            }
        )
        cart.append(price);
        return cart;
    }

    mount() {
        this.element = this.render();
        citiesStore.subscribe(() => {
        if (this.element) {
            this.rerender();
        }
        });

        this.loadGoods();
        return this.element;
    }

}

const CART = new Cart();
export{
    CART,
}