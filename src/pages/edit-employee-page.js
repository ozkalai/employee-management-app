import { LitElement, html, css } from 'lit';
import { useEmployeeStore } from '../stores/employee-store.js';
import en from '../locales/en.js';
import tr from '../locales/tr.js';
import { useLanguageStore } from '../stores/language-store.js';
import { usePaginationStore } from '../stores/pagination-store.js';

const DEPARTMENTS = ['Analytics', 'Tech'];
const POSITIONS = ['Junior', 'Medior', 'Senior'];
const translations = { tr, en };

export class EditEmployeePage extends LitElement {
  static styles = css`
    .form-container {
      margin: var(--space-lg) auto;
      background: var(--color-background);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      padding: var(--space-lg) var(--space-md);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap:  var(--space-md) var(--space-lg);
    }
    .input-wrapper {
      font-weight: 500;
      display: block;
      font-size: var(--font-size-sm);
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    input, select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: var(--radius-sm);
      font-size: 16px;
      margin-bottom: 8px;
    }
    .error {
      color: #d32f2f;
      font-size: 13px;
      margin-bottom: 8px;
    }
    button {
      background: var(--color-primary, #ff6600);
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      padding: 10px 0;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
      grid-column: 1 / -1;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    @media (max-width: 700px) {
      .form-container {
        grid-template-columns: 1fr;
        max-width: 98vw;
        padding: 16px 4px;
      }
    }
  `;

  static properties = {
    errors: { type: Object },
    values: { type: Object },
    submitting: { type: Boolean },
    language: { type: String },
    userId: { type: String },
  };

  constructor() {
    super();
    this.errors = {};
    this.values = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: DEPARTMENTS[0],
      position: POSITIONS[0],
    };
    this.submitting = false;
    this.language = useLanguageStore.getState().language;
    this.unsubscribeLanguage = useLanguageStore.subscribe(
      (state) => { this.language = state.language; },
      (state) => state.language
    );
  }

  async connectedCallback() {
    super.connectedCallback();
    // Get userId from Vaadin Router location
    const routerLocation = window.appRouter && window.appRouter.location;
    let userId = null;
    if (routerLocation && routerLocation.params && routerLocation.params.userId) {
      userId = routerLocation.params.userId;
    } else {
      // fallback: parse from URL
      const match = window.location.pathname.match(/\/edit\/(.+)$/);
      userId = match ? match[1] : null;
    }
    this.userId = userId;
    if (this.userId) {
      const emp = useEmployeeStore.getState().employees.find(e => e.id === this.userId);
      if (emp) {
        this.values = { ...emp };
      }
    }
  }

  handleInput(e) {
    this.values = { ...this.values, [e.target.name]: e.target.value };
    this.errors = { ...this.errors, [e.target.name]: undefined };
  }

  validate() {
    const errors = {};
    const { firstName, lastName, dateOfEmployment, dateOfBirth, phoneNumber, email, department, position } = this.values;
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!dateOfEmployment) errors.dateOfEmployment = 'Date of employment is required';
    if (!dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (dateOfBirth && new Date(dateOfBirth) >= new Date()) errors.dateOfBirth = 'Date of birth must be in the past';
    if (dateOfEmployment && new Date(dateOfEmployment) > new Date()) errors.dateOfEmployment = 'Date of employment cannot be in the future';
    if (!phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    if (!email.trim()) errors.email = 'Email is required';
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Invalid email address';
    // Uniqueness check (exclude self)
    const { employees } = useEmployeeStore.getState();
    if (employees.some(emp => emp.email.toLowerCase() === email.trim().toLowerCase() && emp.id !== this.userId)) {
      errors.email = 'Email must be unique';
    }
    if (!department) errors.department = 'Department is required';
    if (!position) errors.position = 'Position is required';
    return errors;
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.errors = this.validate();
    if (Object.keys(this.errors).length > 0) return;
    this.submitting = true;
    // Update employee
    useEmployeeStore.getState().editEmployee(this.userId, { ...this.values });
    this.submitting = false;
    const page = usePaginationStore.getState().currentPage;
    window.location.href = `/${page ? `?page=${page}` : ''}`;
  }

  render() {
    const t = translations[this.language].addEmployee;
    return html`
      <form class="form-container" @submit=${this.handleSubmit} autocomplete="off">
        <div class="input-wrapper">${t.firstName}
          <input name="firstName" .value=${this.values.firstName} @input=${this.handleInput} required placeholder="e.g. Jane" />
          ${this.errors.firstName ? html`<div class="error">${this.errors.firstName}</div>` : ''}
        </div>
        <div class="input-wrapper">${t.lastName}
          <input name="lastName" .value=${this.values.lastName} @input=${this.handleInput} required placeholder="e.g. Doe" />
          ${this.errors.lastName ? html`<div class="error">${this.errors.lastName}</div>` : ''}
        </div>
        <div class="input-wrapper">${t.dateOfEmployment}
          <input type="date" name="dateOfEmployment" .value=${this.values.dateOfEmployment} @input=${this.handleInput} required placeholder="YYYY-MM-DD" />
          ${this.errors.dateOfEmployment ? html`<div class="error">${this.errors.dateOfEmployment}</div>` : ''}
        </div>
        <div class="input-wrapper">${t.dateOfBirth}
          <input type="date" name="dateOfBirth" .value=${this.values.dateOfBirth} @input=${this.handleInput} required placeholder="YYYY-MM-DD" />
          ${this.errors.dateOfBirth ? html`<div class="error">${this.errors.dateOfBirth}</div>` : ''}
        </div>
        <div class="input-wrapper">${t.phone}
          <input name="phoneNumber" .value=${this.values.phoneNumber} @input=${this.handleInput} required placeholder="e.g. +90 555 123 4567" />
          ${this.errors.phoneNumber ? html`<div class="error">${this.errors.phoneNumber}</div>` : ''}
        </div>
        <div class="input-wrapper">${t.email}
          <input name="email" .value=${this.values.email} @input=${this.handleInput} required placeholder="e.g. jane.doe@email.com" />
          ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ''}
        </div>
        <div class="input-wrapper">${t.department}
          <select name="department" .value=${this.values.department} @change=${this.handleInput}>
            ${DEPARTMENTS.map(dep => html`<option value=${dep}>${dep}</option>`)}
          </select>
        </div>
        <div class="input-wrapper">${t.position}
          <select name="position" .value=${this.values.position} @change=${this.handleInput}>
            ${POSITIONS.map(pos => html`<option value=${pos}>${pos}</option>`)}
          </select>
        </div>
        <button type="submit" ?disabled=${this.submitting}>Update Employee</button>
      </form>
    `;
  }
}

customElements.define('edit-employee-page', EditEmployeePage); 