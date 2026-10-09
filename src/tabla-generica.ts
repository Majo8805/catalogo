export class TablaGenerica extends HTMLElement {
  private _columnas: Array<{ clave: string; titulo: string }> = [];
  private _filas: Array<any> = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
  }

  set columnas(valor: Array<{ clave: string; titulo: string }>) {
    this._columnas = valor;
    this.render();
  }

  set filas(valor: Array<any>) {
    this._filas = valor;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    let html = `<link rel="stylesheet" href="/src/tabla-generica.css">`;

    if (this._filas.length === 0) {
      html += `<p class="sin-datos">Sin datos</p>`;
    } else {
      html += `<table><thead><tr>`;
      this._columnas.forEach(col => {
        html += `<th>${col.titulo}</th>`;
      });
      html += `</tr></thead><tbody>`;

      this._filas.forEach(fila => {
        html += `<tr>`;
        this._columnas.forEach(col => {
          html += `<td>${fila[col.clave]}</td>`;
        });
        html += `</tr>`;
      });
      html += `</tbody></table>`;
    }

    this.shadowRoot.innerHTML = html;
  }
}

customElements.define('tabla-generica', TablaGenerica);