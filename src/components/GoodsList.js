import { getGoods } from "../api/mockApi";
import { Goods } from "../components/Goods";
import { Element } from "../lib/Element";
import { Component } from "../lib/Component";

export class GoodsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            goods: [],
            isLoading: true,
        };
    }
//     async getArrayElements() {
//     try {
//         const result = await getGoods();
        
//         const goods = new Goods(result[1]);
//         goodsList.append(
//         goods.mount(),
//       )
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }
    async loadGoods() {
            const goods = await getGoods();
            this.setState({ 
                goods: goods,
                isLoading: false 
            });
    }

    render(){
        if (this.state.isLoading){
            return new Element(
                "ul",
                {
                    class:"cards-list",
                },
            );
        }
        const list = new Element(
                "ul",
                {
                    class:"cards-list",
                },
            );
    for (const goods of this.state.goods) {
      const cityEl = new Goods(goods);
      list.append(cityEl.mount());
    }
    return list;
    }

    mount() {
        this.element = this.render();

        this.loadGoods();
        return this.element;
    }
}