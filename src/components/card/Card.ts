import styles from './index.css';
import { dispatch } from '../../store/index';
import { addFavorites } from '../../store/actions';

export enum Attribute{
    "image"="image",
    "name"="name",
    "idn"="idn",
    "type"="type"
}

class Card extends HTMLElement{
    image?: string;
    name?: string;
    idn?: string;
    type?: string;

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    static get observedAttributes(){
        const attrs: Record<Attribute, null> = {
            image: null,
            name: null,
            idn: null,
            type: null
        };
        return Object.keys(attrs);
    }

    connectedCallback() {
        this.render();
      }

      attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                default:
                this[propName] = newValue;
                break;
            }
            
            this.render();
        }

        render(){
            if(this.shadowRoot){
                this.shadowRoot.innerHTML=``;

                const stats = this.ownerDocument.createElement('my-stats');
                stats.setAttribute(Attribute.image, String(this.image));
                stats.setAttribute(Attribute.name, String(this.name));
                stats.setAttribute(Attribute.idn, String(this.idn));
                stats.setAttribute(Attribute.type, String(this.type));

                const fav = this.ownerDocument.createElement('my-favorites');
                fav.addEventListener('click', ()=>{
                    dispatch(
                        addFavorites({
                            payload:{
                                image: String(this.image),
                                name: String(this.name),
                                idn: String(this.idn),
                                type: String(this.type)
                            }
                        })
                    )
                })

                const card = this.ownerDocument.createElement('section')
                card.appendChild(stats)
                card.appendChild(fav)

                this.shadowRoot?.appendChild(card)

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);
            }
        }
}
customElements.define('my-card', Card);
export default Card;