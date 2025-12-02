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
                    id:"slider",
                    class: "slider",
                },
                new Element(
                    "div",
                    {
                        class:"img-wrapper"
                    },
                    new Element(
                        "img",
                        {

                        }
                    ),
                    new Element(
                        "span",
                        {
                            textContent:"hello"
                        }
                    )
                ),
                new Element(
                    "div",
                    {
                        class:"img-wrapper"
                    },
                    new Element(
                        "img",
                        {

                        }
                    ),
                     new Element(
                        "span",
                        {
                            textContent:"I am"
                        }
                    )
                ),
                new Element(
                    "div",
                    {
                        class:"img-wrapper"
                    },
                    new Element(
                        "img",
                        {

                        }
                    ),
                    new Element(
                        "span",
                        {
                            textContent:"Slider"
                        }
                    )
                )
            )
        )
        return slider;
    }
}