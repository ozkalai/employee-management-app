import { LitElement, html, css } from 'lit';
import './employee-list-table-view.js';
import { useViewStore } from './stores/view-store.js';

const listViewIcon = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 9C7.55228 9 8 8.55228 8 8C8 7.44772 7.55228 7 7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9ZM7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13ZM8 16C8 16.5523 7.55228 17 7 17C6.44772 17 6 16.5523 6 16C6 15.4477 6.44772 15 7 15C7.55228 15 8 15.4477 8 16ZM10 7C9.44772 7 9 7.44772 9 8C9 8.55228 9.44772 9 10 9H18C18.5523 9 19 8.55228 19 8C19 7.44772 18.5523 7 18 7H10ZM9 12C9 11.4477 9.44772 11 10 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H10C9.44772 13 9 12.5523 9 12ZM10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17H18C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15H10Z" fill="currentColor"/></svg>`;

const tableViewIcon = html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4C5.55228 4 6 4.44772 6 5ZM8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13ZM5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20ZM5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20ZM12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8ZM20 19C20 19.5523 19.5523 20 19 20C18.4477 20 18 19.5523 18 19C18 18.4477 18.4477 18 19 18C19.5523 18 20 18.4477 20 19ZM22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19ZM19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13ZM19 15C20.6569 15 22 13.6569 22 12C22 10.3431 20.6569 9 19 9C17.3431 9 16 10.3431 16 12C16 13.6569 17.3431 15 19 15ZM20 5C20 5.55228 19.5523 6 19 6C18.4477 6 18 5.55228 18 5C18 4.44772 18.4477 4 19 4C19.5523 4 20 4.44772 20 5ZM22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z" fill="currentColor"/></svg>`;

class EmployeeList extends LitElement {
  static styles = css`
    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-md) 0;
      width: 95%;
      margin: 0 auto;
    }
      
    .title {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-primary);
    }
    .view-toggle {
      display: flex;
      gap: var(--space-xs);
    }
    .view-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: var(--color-primary);
    }
    .view-btn svg {
      display: block;
    }
    @media (max-width: 600px) {
      .list-header {
        gap: var(--space-xs);
        padding: var(--space-sm) 0;
        margin: 0;
        width: 100%;
      }
      .title {
        font-size: var(--font-size-md);
      }
      .view-btn {
        font-size: var(--font-size-xs);
        width: 32px;
        height: 32px;
      }
    }
  `;

  static properties = {
    view: { type: String },
  };

  constructor() {
    super();
    this.view = useViewStore.getState().view;
    this.unsubscribe = useViewStore.subscribe(
      (state) => {
        this.view = state.view;
      },
      (state) => state.view
    );
  }

  handleViewChange(view) {
    this.view = view;
    useViewStore.getState().setView(view);
  }

  render() {
    return html`
      <div class="list-header">
        <span class="title">Employee List</span>
        <div class="view-toggle">
          <button style="scale: 1.8;" class="view-btn ${this.view === 'list' ? 'active' : ''}" @click="${() => this.handleViewChange('list')}">${listViewIcon}</button>
          <button class="view-btn  ${this.view === 'table' ? 'active' : ''}" @click="${() => this.handleViewChange('table')}">${tableViewIcon}</button>
        </div>
      </div>
      ${this.view === 'table' ? html`<div>table</div>` : ''}
      ${this.view === 'list' ? html`<div>list</div>` : ''}
    `;
  }
}

customElements.define('employee-list', EmployeeList); 