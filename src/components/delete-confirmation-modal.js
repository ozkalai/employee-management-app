import { LitElement, html, css } from 'lit';
import { useLanguageStore } from '../stores/language-store.js';
import tr from '../locales/tr.js';
import en from '../locales/en.js';

const translations = { tr, en };
const closeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

class DeleteConfirmationModal extends LitElement {
  static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      
    }

    .modal-content {
      background: white;
      padding: var(--space-lg);
      border-radius: var(--radius-md);
      width: 90%;
      max-width: 400px;
      box-shadow: var(--shadow-lg);
    }

    .modal-header {
      margin-bottom: var(--space-sm);
      text-align: start;
      position: relative;
    }

    .modal-title {
      color: var(--color-text);
      font-size: var(--font-size-lg);
      font-weight: 600;
      margin: 0;
      text-align: start;
    }

    .modal-body {
      margin-bottom: var(--space-lg);
      text-align: start;
      font-weight: 400;
      font-size: var(--font-size-sm);
    }

    .modal-text {
      color: var(--color-text);
      font-size: var(--font-size-sm);
      line-height: 1.5;
      margin: 0;
    }

    .modal-footer {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: var(--space-sm);
    }

    .btn {
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-close {
      position: absolute;
      background: none;
      top: 0;
      right: 0;
      border: none;
      cursor: pointer;
      color: var(--color-primary);
    }

    .btn-cancel {
      border-radius: var(--radius-md);
      background: var(--color-background);
      border: 1px solid var(--color-secondary);
      color: var(--color-secondary);
    }

    .btn-cancel:hover {
      background: #e5e5e5;
    }

    .btn-delete {   
      border-radius: var(--radius-md);
      background: var(--color-primary);
      color: white;
      border: none;
    }

    .btn-delete:hover {
      opacity: 0.9;
    }
  `;

  static properties = {
    isOpen: { type: Boolean },
    employeeName: { type: String },
    language: { type: String },
  };

  constructor() {
    super();
    this.isOpen = false;
    this.employeeName = '';
    this.language = useLanguageStore.getState().language;
    this.unsubscribeLanguage = useLanguageStore.subscribe(
      (state) => {
        this.language = state.language;
      },
      (state) => state.language
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeLanguage();
  }

  open(employeeName) {
    this.employeeName = employeeName;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('delete-confirmed'));
    this.close();
  }

  render() {
    if (!this.isOpen) return null;

    const t = translations[this.language].deleteConfirmation;
    return html`
      <div 
        class="modal-overlay" 
        @click=${this.close}
        @keydown=${(e) => e.key === 'Escape' && this.close()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
 
        <div 
          class="modal-content" 
          @click=${(e) => e.stopPropagation()}
          @keydown=${(e) => e.stopPropagation()}
          role="document"
        >
       
          <div class="modal-header">
            <h2 id="modal-title" class="modal-title">${t.title}</h2>
             <button class="btn-close" @click=${this.close}>
        ${closeIcon}</button>
          </div>
          <div class="modal-body">
            <p class="modal-text">${t.message.replace('{name}', this.employeeName)}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-delete" @click=${this.handleDelete}>${t.proceed}</button>
            <button class="btn btn-cancel" @click=${this.close}>${t.cancel}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('delete-confirmation-modal', DeleteConfirmationModal); 