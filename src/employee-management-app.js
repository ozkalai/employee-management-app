import { LitElement, html, css } from 'lit';
import './header-component.js';

class EmployeeManagementApp extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      /* Design System Variables */
      --color-primary: #ff6200;
      --color-background: #fff;
      --color-text: #1a2b42;
      --color-label: #888;
      --color-border: #eee;
      --space-xs: 4px;
      --space-sm: 8px;
      --space-md: 16px;
      --space-lg: 24px;
      --space-xl: 32px;
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.88rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.25rem;
      --font-size-xl: 1.5rem;
      --radius-sm: 2px;
      --radius-md: 4px;
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md: 0 2px 4px rgba(0,0,0,0.08);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: var(--color-text);
      max-width: 1340px;
      margin: 0 auto;
      text-align: center;
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'Employee Management App';
  }

  render() {
    return html`
      <header-component></header-component>
    `;
  }
}

customElements.define('employee-management-app', EmployeeManagementApp);