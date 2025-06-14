import { LitElement, html, css } from 'lit';
import { useLanguageStore } from './stores/store-language.js';
import tr from './locales/tr.js';
import en from './locales/en.js';

const ingLogo = new URL('../assets/logos/ing-logo-white.png', import.meta.url).href;

class HeaderComponent extends LitElement {
  static properties = {
    language: { type: String },
  };

  constructor() {
    super();
    this.language = useLanguageStore.getState().language;
    this.unsubscribe = useLanguageStore.subscribe(
      (state) => {
        this.language = state.language;
      },
      (state) => state.language
    );
    this.translations = { tr, en };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
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
      font-size: var(--font-size-sm);
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
      margin-top: var(--space-md);
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
      <span class="header-top-label">${t.label}</span>
      <header>
        <div class="header-content">
          <img class="logo" src="${ingLogo}" alt="ING Logo" />
          <div class="right-section">
            <span class="employees">
              <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>
              ${t.employees}
            </span>
            <button class="add-new-btn">
              <span style="font-size: 1.2em;">+</span> ${t.addNew}
            </button>
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