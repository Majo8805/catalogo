export class ContadorCantidad extends HTMLElement {
  static get observedAttributes() {
    return ['valor', 'min', 'max'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get valor() { return parseInt(this.getAttribute('valor') || '1', 10); }
  set valor(v) { this.setAttribute('valor', v.toString()); }
  get min() { return parseInt(this.getAttribute('min') || '1', 10); }
  get max() { return parseInt(this.getAttribute('max') || '10', 10); }

  decrementar = () => {
    if (this.valor > this.min) {
      this.valor--;
      this.despacharEvento();
    }
  }

  incrementar = () => {
    if (this.valor < this.max) {
      this.valor++;
      this.despacharEvento();
    }
  }

  despacharEvento() {
    this.dispatchEvent(new CustomEvent('cambio-cantidad', {
      detail: { nuevaCantidad: this.valor },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        .contador { display: flex; align-items: center; gap: 8px; font-family: sans-serif; }
        button { padding: 4px 10px; cursor: pointer; border: 1px solid #ccc; background: #eee; border-radius: 4px; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
      </style>
      <div class="contador">
        <button id="btn-menos" ${this.valor <= this.min ? 'disabled' : ''}>-</button>
        <span>${this.valor}</span>
        <button id="btn-mas" ${this.valor >= this.max ? 'disabled' : ''}>+</button>
      </div>
    `;

    this.shadowRoot.querySelector('#btn-menos')?.addEventListener('click', this.decrementar);
    this.shadowRoot.querySelector('#btn-mas')?.addEventListener('click', this.incrementar);
  }
}

customElements.define('contador-cantidad', ContadorCantidad);