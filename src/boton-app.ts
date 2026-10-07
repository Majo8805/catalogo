import estilos from './boton-app.css?inline';

export class BotonApp extends HTMLElement {
    //Entradas: 
    static observedAttrributes = ['variante', 'deshabilitado'];

    private boton: HTMLButtonElement;

    //Se ejecuta cuando se crea el elemento
    constructor() {
        super();

        const sombra = this.attachShadow({ mode: 'open' });

        sombra.innerHTML = `
            <style>${estilos}</style>
            <button><slot></slot></button>
        `;

        this.boton = sombra.querySelector('button')!;
    }

    //connectedCallback - se ejecuta cuando la etiqueta ENTRA en la pagina
    connectedCallback() {
        this.pintar();
    }

    attributeChangedCallback() {
        this.pintar();
    }

    //disconnectedCallback - se ejecuta cuando la etiqueta SALE de la pagina
    //adoptedCallback - se ejecuta cuando la etiqueta se muda de una pagina a otra

    private pintar() {
        this.boton.className = this.getAttribute('variante') ?? 'primario';
        this.boton.disabled = this.hasAttribute('deshabilitado');
    }
}

customElements.define('button-app', BotonApp);
