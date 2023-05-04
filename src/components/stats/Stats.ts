import styles from './index.css';

export enum Attributes{
    "image"="image",
    "name"="name",
    "idn"="idn",
    "type"="type"
}

class Stats extends HTMLElement{
    image?: string;
    name?: string;
    idn?: string;
    type?: string;

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    static get observedAttributes(){
        const attrs: Record<Attributes, null> = {
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
        propName: Attributes,
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
                this.shadowRoot.innerHTML=`
                <section class="flip-card">
                    <section class="flip-card-inner">
                        <section class="flip-card-front">
                            <img src="${this.image}">
                            <p>${this.name}</p>
                        </section>
                        <section class="flip-card-back">
                            <p class="title">${this.idn}</p>
                            <p>${this.type}</p>
                        </section>
                    </section>
                </section>
                `;
                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);
            }
        }
}
customElements.define("my-stats", Stats);
export default Stats;