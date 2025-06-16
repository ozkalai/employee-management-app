import { LitElement, html, css } from 'lit';
import { useEmployeeStore } from '../stores/employee-store.js';
import { useLanguageStore } from '../stores/language-store.js';
import tr from '../locales/tr.js';
import en from '../locales/en.js';
import './delete-confirmation-modal.js';
import { usePaginationStore } from '../stores/pagination-store.js';
import './pagination-component.js';

const editIcon = html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21L4.5 16.4292L15.6443 4.45651C16.3941 3.65091 17.654 3.60255 18.4634 4.34828L18.5369 4.41598C19.3462 5.16162 19.4011 6.42099 18.6597 7.23423L7.5 19.4764L3 21Z" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const deleteIcon = html`<svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 16.0002L15.2526 15.9379L15.252 15.945L15.2515 15.952L16 16.0002ZM4 16.0002L4.74845 15.9521L4.748 15.945L4.74741 15.9379L4 16.0002ZM13 4V4.75H13.75V4H13ZM7 4H6.25V4.75H7V4ZM8.24741 7.9379C8.21301 7.52511 7.8505 7.21837 7.43772 7.25277C7.02493 7.28717 6.71819 7.64968 6.75259 8.06247L8.24741 7.9379ZM7.25259 14.0625C7.28699 14.4752 7.6495 14.782 8.06228 14.7476C8.47507 14.7132 8.78181 14.3507 8.74741 13.9379L7.25259 14.0625ZM13.2474 8.06247C13.2818 7.64968 12.9751 7.28717 12.5623 7.25277C12.1495 7.21837 11.787 7.52511 11.7526 7.9379L13.2474 8.06247ZM11.2526 13.9379C11.2182 14.3507 11.5249 14.7132 11.9377 14.7476C12.3505 14.782 12.713 14.4752 12.7474 14.0625L11.2526 13.9379ZM18 4.75C18.4142 4.75 18.75 4.41421 18.75 4C18.75 3.58579 18.4142 3.25 18 3.25V4.75ZM2 3.25C1.58579 3.25 1.25 3.58579 1.25 4C1.25 4.41421 1.58579 4.75 2 4.75V3.25ZM16.2526 3.93772L15.2526 15.9379L16.7474 16.0625L17.7474 4.06228L16.2526 3.93772ZM15.2515 15.952C15.1997 16.7578 14.6222 17.2502 14.0051 17.2502V18.7502C15.4864 18.7502 16.6507 17.5683 16.7485 16.0483L15.2515 15.952ZM14.0051 17.2502H6V18.7502H14.0051V17.2502ZM6 17.2502C5.38046 17.2502 4.80009 16.7553 4.74845 15.9521L3.25155 16.0483C3.34943 17.5708 4.52098 18.7502 6 18.7502V17.2502ZM4.74741 15.9379L3.74741 3.93772L2.25259 4.06228L3.25259 16.0625L4.74741 15.9379ZM3 4.75H17V3.25H3V4.75ZM13.75 4V2H12.25V4H13.75ZM6.25 2V4H7.75V2H6.25ZM6.75259 8.06247L7.25259 14.0625L8.74741 13.9379L8.24741 7.9379L6.75259 8.06247ZM11.7526 7.9379L11.2526 13.9379L12.7474 14.0625L13.2474 8.06247L11.7526 7.9379ZM12 0.25H8V1.75H12V0.25ZM7 4.75H13V3.25H7V4.75ZM17 4.75H18V3.25H17V4.75ZM18 3.25H3V4.75H18V3.25ZM2 4.75H3V3.25H2V4.75ZM7.75 2C7.75 1.86193 7.86193 1.75 8 1.75V0.25C7.0335 0.25 6.25 1.0335 6.25 2H7.75ZM13.75 2C13.75 1.0335 12.9665 0.25 12 0.25V1.75C12.1381 1.75 12.25 1.86193 12.25 2H13.75Z" fill="none" stroke="var(--color-primary)" stroke-width="1.2"/></svg>`;

const translations = { tr, en };

class EmployeeListTableView extends LitElement {
  static styles = css`
    .table-container {
      background: #fff;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      margin: var(--space-md) auto 0 auto;
      width: 95%;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      font-size: var(--font-size-xs);
      color: var(--color-text);
    }
    thead tr {
      background: #fff;
    }
    th, td {
      padding: 12px 8px;
      text-align: center;
      vertical-align: middle;
    }
    th {
      color: var(--color-primary);
      font-weight: 600;
      font-size: var(--font-size-xs);
      background: #fff;
      border-bottom: 1px solid var(--color-border);
      opacity: 0.85;
      letter-spacing: 0.01em;
    }
    td {
      border-bottom: 1px solid #f3f3f3;
      background: #fff;
      font-size: var(--font-size-xs);
      font-weight: 500;
      opacity: 0.95;
      white-space: nowrap;
      overflow-x: auto;
      scrollbar-width: none; /* Firefox */
    }
    td::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    td.name, td.surname {
      color: var(--color-text);
      font-weight: 600;
      opacity: 1;
      min-width: 120px;
    }
    td.date-of-employment, td.date-of-birth {
      min-width: 150px;
    }
    td.phone, td.email {
      min-width: 120px;
    }
    td.department, td.position {
      min-width: 100px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .actions {
      display: flex;
      gap: var(--space-xs);
      color: var(--color-primary);
      justify-content: center;
    }
    .checkbox-cell {
      width: 32px;
    }
   
    @media (max-width: 600px) {
      .table-container {
        margin: var(--space-xs) 0 0 0;
        width: 100%;
      }
      th, td {
        padding: 6px 2px;
        font-size: 11px;
      }
    }
  `;

  static properties = {
    employees: { type: Array },
    language: { type: String },
    selectedEmployee: { type: Object },
    pagedEmployees: { type: Array },
    currentPage: { type: Number },
    totalPages: { type: Number },
    pageSize: { type: Number },
  };

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees;
    this.language = useLanguageStore.getState().language;
    this.selectedEmployee = null;
    this.pageSize = 9;
    this.currentPage = usePaginationStore.getState().currentPage;
    this.totalPages = Math.ceil(this.employees.length / this.pageSize) || 1;
    this.pagedEmployees = this.getPagedEmployees();
    this.unsubscribeEmployees = useEmployeeStore.subscribe(
      (state) => {
        this.employees = state.employees;
        this.updatePagination();
      },
      (state) => state.employees
    );
    this.unsubscribeLanguage = useLanguageStore.subscribe(
      (state) => {
        this.language = state.language;
      },
      (state) => state.language
    );
    this.unsubscribePagination = usePaginationStore.subscribe(
      (state) => {
        this.currentPage = state.currentPage;
        this.updatePagedEmployees();
      },
      (state) => state.currentPage
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeEmployees();
    this.unsubscribeLanguage();
    this.unsubscribePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.employees.length / this.pageSize) || 1;
    usePaginationStore.getState().setTotalPages(this.totalPages);
    this.updatePagedEmployees();
  }

  updatePagedEmployees() {
    this.pagedEmployees = this.getPagedEmployees();
  }

  getPagedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  handleDeleteClick(employee) {
    this.selectedEmployee = employee;
    this.shadowRoot.querySelector('delete-confirmation-modal').open(
      `${employee.firstName} ${employee.lastName}`
    );
  }

  handleDeleteConfirmed() {
    if (this.selectedEmployee) {
      useEmployeeStore.getState().deleteEmployee(this.selectedEmployee.id);
      this.selectedEmployee = null;
    }
  }

  render() {
    const t = translations[this.language].employeeList;
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell"><input type="checkbox" /></th>
              <th>${t.firstName}</th>
              <th>${t.lastName}</th>
              <th>${t.dateOfEmployment}</th>
              <th>${t.dateOfBirth}</th>
              <th>${t.phone}</th>
              <th>${t.email}</th>
              <th>${t.department}</th>
              <th>${t.position}</th>
              <th>${t.actions}</th>
            </tr>
          </thead>
          <tbody>
            ${this.pagedEmployees.map(emp => html`
              <tr>
                <td class="checkbox-cell"><input type="checkbox" /></td>
                <td class="name">${emp.firstName}</td>
                <td class="surname">${emp.lastName}</td>
                <td class="date-of-employment">${emp.dateOfEmployment}</td>
                <td class="date-of-birth">${emp.dateOfBirth}</td>
                <td class="phone">${emp.phoneNumber}</td>
                <td class="email">${emp.email}</td>
                <td class="department">${emp.department}</td>
                <td class="position">${emp.position}</td>
                <td class="actions">
                  <a 
                    title="Edit"
                    style="cursor:pointer;display:inline-flex;align-items:center;"
                    role="button"
                    tabindex="0"
                    href=${`/edit/${emp.id}`}
                  >
                    <span>${editIcon}</span>
                  </a>
                  <span 
                    title="Delete" 
                    style="cursor:pointer;display:inline-flex;align-items:center;"
                    @click=${() => this.handleDeleteClick(emp)}
                    @keydown=${(e) => e.key === 'Enter' && this.handleDeleteClick(emp)}
                    role="button"
                    tabindex="0"
                  >${deleteIcon}</span>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
      <delete-confirmation-modal
        @delete-confirmed=${this.handleDeleteConfirmed}
      ></delete-confirmation-modal>
    `;
  }
}

customElements.define('employee-list-table-view', EmployeeListTableView); 