import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/add-employee-page.js';
import { useEmployeeStore } from '../src/stores/employee-store.js';

describe('AddEmployeePage', () => {
  let el;

  beforeEach(async () => {
    // Reset store before each test
    useEmployeeStore.setState({
      employees: [
        {
          id: 'existing-id',
          firstName: 'Jane',
          lastName: 'Doe',
          dateOfEmployment: '2020-01-01',
          dateOfBirth: '1990-01-01',
          phoneNumber: '+90 555 123 4567',
          email: 'jane.doe@email.com',
          department: 'Analytics',
          position: 'Junior'
        }
      ]
    });
    el = await fixture(html`<add-employee-page></add-employee-page>`);
    await el.updateComplete;
  });

  it('renders all input fields and the submit button', () => {
    const inputs = el.shadowRoot.querySelectorAll('input, select');
    const button = el.shadowRoot.querySelector('button[type="submit"]');
    expect(inputs.length).to.equal(8); // 6 inputs + 2 selects
    expect(button).to.exist;
  });

  it('shows validation errors for required fields', async () => {
    el.values = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: ''
    };
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    expect(Object.keys(el.errors).length).to.be.above(0);
    expect(el.shadowRoot.textContent).to.include('First name is required');
    expect(el.shadowRoot.textContent).to.include('Last name is required');
  });

  it('shows validation error for invalid email', async () => {
    el.values = {
      ...el.values,
      email: 'not-an-email'
    };
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    expect(el.errors.email).to.include('Invalid email address');
  });

  it('shows validation error for duplicate email', async () => {
    el.values = {
      ...el.values,
      email: 'jane.doe@email.com'
    };
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    expect(el.errors.email).to.include('Email must be unique');
  });

  it('adds a new employee and navigates to list on success', async () => {
    // Mock router
    window.appRouter = { navigate: sinon.spy() };
    el.values = {
      firstName: 'John',
      lastName: 'Smith',
      dateOfEmployment: '2022-01-01',
      dateOfBirth: '1995-01-01',
      phoneNumber: '+90 555 987 6543',
      email: 'john.smith@email.com',
      department: 'Tech',
      position: 'Senior'
    };
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    const { employees } = useEmployeeStore.getState();
    expect(employees.some(e => e.email === 'john.smith@email.com')).to.be.true;
    expect(window.appRouter.navigate.calledWith('/')).to.be.true;
  });
});