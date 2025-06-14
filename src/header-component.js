import { LitElement, html, css } from 'lit';

const ingLogo = new URL('../assets/logos/ing-logo-white.png', import.meta.url).href;

class HeaderComponent extends LitElement {
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
    return html`
      <span class="header-top-label">Employee List (Table View)</span>
      <header>
        <div class="header-content">
          <img class="logo" src="${ingLogo}" alt="ING Logo" />
          <div class="right-section">
            <span class="employees">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7ZM18 4C17.4477 4 17 4.44772 17 5C17 5.55228 17.4477 6 18 6C19.1046 6 20 6.89543 20 8C20 9.10457 19.1046 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4ZM7 14C7 13.4477 6.55228 13 6 13H5C3.34315 13 2 14.3431 2 16V21C2 21.5523 2.44772 22 3 22C3.55228 22 4 21.5523 4 21V16C4 15.4477 4.44772 15 5 15H6C6.55228 15 7 14.5523 7 14ZM10 13C8.34315 13 7 14.3431 7 16V20C7 20.5523 7.44772 21 8 21C8.55228 21 9 20.5523 9 20V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V20C15 20.5523 15.4477 21 16 21C16.5523 21 17 20.5523 17 20V16C17 14.3431 15.6569 13 14 13H10ZM18 13C17.4477 13 17 13.4477 17 14C17 14.5523 17.4477 15 18 15H19C19.5523 15 20 15.4477 20 16V21C20 21.5523 20.4477 22 21 22C21.5523 22 22 21.5523 22 21V16C22 14.3431 20.6569 13 19 13H18ZM7 5C7 4.44772 6.55228 4 6 4C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C4.89543 10 4 9.10457 4 8C4 6.89543 4.89543 6 6 6C6.55228 6 7 5.55228 7 5Z">
               </svg>
              Employees
            </span>
            <button class="add-new-btn">
              <span style="font-size: 1.2em;">+</span> Add New
            </button>
            <select class="lang-picker">
              <option value="tr">🇹🇷</option>
              <option value="en">🇬🇧</option>
            </select>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent); 