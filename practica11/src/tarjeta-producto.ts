import './boton-app';

export class TarjetaProducto extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute('producto-id') || '';
    const nombre = this.getAttribute('nombre') || '';
    const precio = Number(this.getAttribute('precio')) || 0; // Atributos llegan como texto
    const imagen = this.getAttribute('imagen') || '';
    const existencia = Number(this.getAttribute('existencia')) || 0;

    const estaAgotado = existencia === 0;

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .tarjeta {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .imagen-container {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 6px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .titulo {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        .precio {
          font-size: 1.125rem;
          font-weight: 700;
          color: #16a34a;
          margin: 0;
        }
        .existencia {
          font-size: 0.875rem;
          margin: 0;
          color: ${estaAgotado ? '#dc2626' : '#64748b'};
        }
      </style>
      <div class="tarjeta">
        <div class="imagen-container">
          <img src="${imagen}" alt="${nombre}" />
        </div>
        <h3 class="titulo">${nombre}</h3>
        <p class="precio">$${precio}</p>
        <p class="existencia">${estaAgotado ? 'Agotado' : `Disponibles: ${existencia}`}</p>
        <boton-app id="btn-comprar" variante="primario" ${estaAgotado ? 'deshabilitado' : ''}>
          ${estaAgotado ? 'Agotado' : 'Agregar al carrito'}
        </boton-app>
      </div>
    `;

    const btnComprar = this.shadow.querySelector('#btn-comprar');
    if (btnComprar && !estaAgotado) {
      btnComprar.addEventListener('click', () => {
        // bubbles y composed permiten que el evento atraviese el Shadow DOM
        this.dispatchEvent(
          new CustomEvent('agregar', {
            detail: { id, nombre, precio },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }
}

customElements.define('tarjeta-producto', TarjetaProducto);