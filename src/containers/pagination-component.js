import { LitElement, html, css } from 'lit';
import { usePaginationStore } from '../stores/pagination-store.js';

class PaginationComponent extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 24px;
      display: flex;
      justify-content: center;
      z-index: 100;
      pointer-events: none;
    }
    .pagination {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: inherit;
      user-select: none;
      padding: 8px 20px;
      pointer-events: auto;
    }
    .page-btn, .chevron {
      background: none;
      border: none;
      color: var(--color-secondary, #888);
      font-size: 18px;
      min-width: 32px;
      min-height: 32px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .page-btn.active {
      background: var(--color-primary, #ff6600);
      color: #fff;
      font-weight: bold;
    }
    .page-btn:not(.active):hover, .chevron:hover {
      background: #f3f3f3;
      color: var(--color-primary, #ff6600);
    }
    .ellipsis {
      padding: 0 4px;
      color: var(--color-secondary, #888);
      font-size: 18px;
      pointer-events: none;
    }
    .chevron[disabled] {
      opacity: 0.4;
      pointer-events: none;
    }
    @media (max-width: 600px) {
      :host {
        bottom: 8px;
      }
      .pagination {
        padding: 4px 8px;
        gap: 4px;
      }
    }
  `;

  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
  };

  constructor() {
    super();
    this.currentPage = usePaginationStore.getState().currentPage;
    this.totalPages = usePaginationStore.getState().totalPages;
    this.unsubscribe = usePaginationStore.subscribe(
      (state) => {
        this.currentPage = state.currentPage;
        this.totalPages = state.totalPages;
      },
      (state) => [state.currentPage, state.totalPages]
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  setPage(page) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      usePaginationStore.getState().setPage(page);
    }
  }

  renderPages() {
    const { currentPage, totalPages } = this;
    const pages = [];

    // Always show first, last, current, and up to 2 neighbors
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 4) end = 4;
      if (currentPage >= totalPages - 3) start = totalPages - 3;
      for (let i = start; i <= end; i += 1) {
        pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((p, idx) =>
      p === '...'
        ? html`<span class="ellipsis" key="ellipsis-${idx}">…</span>`
        : html`<button
            class="page-btn${p === currentPage ? ' active' : ''}"
            @click=${() => this.setPage(p)}
            aria-current=${p === currentPage ? 'page' : undefined}
          >${p}</button>`
    );
  }

  render() {
    return html`
      <nav class="pagination" aria-label="Pagination">
        <button
          class="chevron"
          @click=${() => this.setPage(this.currentPage - 1)}
          ?disabled=${this.currentPage === 1}
          aria-label="Previous"
        >
          &#x2039;
        </button>
        ${this.renderPages()}
        <button
          class="chevron"
          @click=${() => this.setPage(this.currentPage + 1)}
          ?disabled=${this.currentPage === this.totalPages}
          aria-label="Next"
        >
          &#x203A;
        </button>
      </nav>
    `;
  }
}

customElements.define('pagination-component', PaginationComponent); 