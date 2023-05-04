import styles from './index.css';

class Favorites extends HTMLElement{
    image?: string;
    name?: string;
    idn?: string;
    type?: string;

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback() {
        this.render();
      }


        render(){
            if(this.shadowRoot){
                this.shadowRoot.innerHTML=`
                <button class="btn">Add Favorites</button>
                `;
                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);
            }
        }
}
customElements.define("my-favorites", Favorites);
export default Favorites;