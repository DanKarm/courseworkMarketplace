import { Component } from "../lib/Component";
import { Element } from "../lib/Element";

export class Slider extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const slider = new Element(
            "section",
            {
                id: "slider",
                class: "slider"
            },
            new Element(
                "div",
                {
                    id:"container",
                    class: "container",
                },
            )
        )
        return slider;
    }
}