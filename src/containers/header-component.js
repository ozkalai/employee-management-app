import { LitElement, html, css } from 'lit';
import { useLanguageStore } from '../stores/language-store.js';
import { useViewStore } from '../stores/view-store.js';
import tr from '../locales/tr.js';
import en from '../locales/en.js';

const ingLogo = new URL('../../assets/logos/ing-logo-white.png', import.meta.url).href;

class HeaderComponent extends LitElement {
  static properties = {
    language: { type: String },
    view: { type: String },
  };

  constructor() {
    super();
    this.language = useLanguageStore.getState().language;
    this.view = useViewStore.getState().view;
    this.unsubscribe = useLanguageStore.subscribe(
      (state) => {
        this.language = state.language;
      },
      (state) => state.language
    );
    this.unsubscribeView = useViewStore.subscribe(
      (state) => {
        this.view = state.view;
      },
      (state) => state.view
    );
    this.translations = { tr, en };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
    this.unsubscribeView();
  }

  handleLangChange(e) {
    this.language = e.target.value;
    useLanguageStore.getState().setLanguage(e.target.value);
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      margin-top: var(--space-lg);
    }
    .header-top-label {
      font-size: var(--font-size-xs);
      color: var(--color-label);
      margin-bottom: var(--space-xs);
      font-weight: var(--header-label-weight, 500);
      letter-spacing: var(--header-label-spacing, 0.01em);
      margin-left: 0;
      display: block;
      text-align: left;
    }
    header {
      color: var(--color-primary);
      background: var(--color-background);
      padding: var(--space-sm) var(--space-md);
      box-sizing: border-box;
      width: 100%;
      box-shadow: var(--shadow-md);
      margin-top: var(--space-sm);
    }
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      height: var(--header-logo-height, 24px);
      width: auto;
    }
    .right-section {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    .employees {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: var(--font-size-xs);
      color: var(--color-primary);
      gap: var(--space-xs);
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
    }
    .employees svg {
      width: 16px;
      height: 16px;
      color: var(--color-primary);
      fill: var(--color-primary);
    }
    .icon-placeholder {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: var(--color-primary);
      border-radius: var(--radius-md);
      color: var(--color-background);
      text-align: center;
      line-height: 20px;
      font-size: 16px;
      font-family: sans-serif;
    }
    .add-new-btn {
      text-decoration: none;
      background: none;
      border: none;
      color: var(--color-primary);
      font-weight: 500;
      font-size: var(--font-size-xs);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .add-new-btn:hover {
      opacity: 1;
    }
    .lang-picker {
      background: var(--color-background);
      padding: var(--header-lang-picker-padding, 2px 8px);
      border: none;
      font-size: var(--header-lang-picker-font-size, 0.95rem);
      color: var(--color-primary);
      cursor: pointer;
      border-radius: var(--radius-sm);
    }
  `;

  render() {
    const t = this.translations[this.language].header;
    return html`
      <span class="header-top-label">${t.label} (${this.view === 'table' ? t.tableView : t.listView})</span>
      <header>
        <div class="header-content">
          <img class="logo" src="${ingLogo}" alt="ING Logo" />
          <div class="right-section">
            <a class="employees" href="/">
              <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>
              ${t.employees}
            </a>
            <a class="add-new-btn" href="/add">
              <span style="font-size: 1.2em;">+</span> ${t.addNew}
            </a>
            <select class="lang-picker" @change="${this.handleLangChange}">
              <option value="tr" ?selected=${this.language === 'tr'}>🇹🇷</option>
              <option value="en" ?selected=${this.language === 'en'}>🇬🇧</option>
            </select>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent); 