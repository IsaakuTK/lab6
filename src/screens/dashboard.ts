import styles from "./dashboard.css";
import { obtener_pokemon } from "../services/pokeapi";
import { Attribute } from "../components/card/Card";
import { appState, dispatch } from "../store/index";
import { getFavorites } from "../store/actions";

class Dashboard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
        const pokemon = await obtener_pokemon()
        this.render(pokemon)

        if(appState.favorites.length === 0){
          const action = await getFavorites();
          dispatch(action);
        }else{
          this.render(pokemon)
        }
    }
  
    render(pokemon: any) {
      if (this.shadowRoot){ this.shadowRoot.innerHTML = "";

      const css = this.ownerDocument.createElement('style')
      css.innerHTML = styles
      this.shadowRoot?.appendChild(css)

      const tittle = this.ownerDocument.createElement("img")
      tittle.src = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";


      const normal = this.ownerDocument.createElement("section")

      normal.appendChild(tittle)

      pokemon.forEach((data: any)=>{
        const card = this.ownerDocument.createElement('my-card')
        card.setAttribute(Attribute.image, data.sprites.front_default)
        card.setAttribute(Attribute.name, data.species.name)
        card.setAttribute(Attribute.idn, data.id)
        card.setAttribute(Attribute.type, data.types[0].type.name)

        normal.appendChild(card);
      })
      


      const fav = this.ownerDocument.createElement("h1")
      fav.innerText = "Favorites";
      fav.className="favt";

      const imgs = this.ownerDocument.createElement("img")
      imgs.src = "https://www.pngmart.com/files/2/Pokeball-PNG-Pic.png";
      imgs.className="imgs";

      const Favorites = this.ownerDocument.createElement("section")
      Favorites.appendChild(fav)
      Favorites.appendChild(imgs)

      appState.favorites.forEach((e, i)=>{
        const card = this.ownerDocument.createElement('my-card')
        card.setAttribute(Attribute.image, e.image)
        card.setAttribute(Attribute.name, e.name)
        card.setAttribute(Attribute.idn, e.idn)
        card.setAttribute(Attribute.type, e.type)

        Favorites.appendChild(card);
      })

      const all = this.ownerDocument.createElement("section")
      all.className="all";

      all.appendChild(normal);
      all.appendChild(Favorites);

      this.shadowRoot?.appendChild(all);

        } 
    }
}
  
  customElements.define("app-dashboard", Dashboard);