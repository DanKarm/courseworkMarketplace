import { Element } from "../lib/Element";
import { Component } from "../lib/Component";
import { getGoodsById } from "../api/mockApi";
import { Goods } from "../components/Goods";

export class Cart extends Component{
    constructor(props){
        super(props)
         this.state = {
            goods: [],
            isLoading: true,
        };
    }
    async loadGoods() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const goods = []; // итоговый массив

    for (const id in cart) {
        if (!Object.hasOwn(cart, id)) continue;

        const item = cart[id];

        // получаем данные товара из промиса
        const product = await getGoodsById(item.id);

        // пушим столько раз, сколько count
        for (let i = 0; i < item.count; i++) {
            goods.push(product);
        }
    }

    console.log(goods);
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
            }
            
        )
      for (const goods of this.state.goods) {
      const cityEl = new Goods(goods);
      cart.append(cityEl.mount());
    }
        return cart;
    }

    mount() {
        this.element = this.render();

        this.loadGoods();
        return this.element;
    }

}