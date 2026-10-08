export class BotonApp extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['variante', 'deshabilitado'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variante = this.getAttribute('variante') || 'primario';
    const deshabilitado = this.hasAttribute('deshabilitado');

    this.shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        button {
          font-family: inherit;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          border: 1px solid transparent;
          font-weight: 600;
          cursor: pointer;
        }
        button.primario {
          background-color: #2563eb;
          color: #ffffff;
        }
        button.secundario {
          background-color: #e2e8f0;
          color: #1e293b;
        }
        button:disabled {
          background-color: #94a3b8;
          color: #f1f5f9;
          cursor: not-allowed;
          opacity: 0.7;
        }
      </style>
      <button class="${variante}" ${deshabilitado ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('boton-app', BotonApp);