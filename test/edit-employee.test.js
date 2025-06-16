import { fixture, html, expect } from '@open-wc/testing';
import '../src/pages/edit-employee-page.js';
import { useEmployeeStore } from '../src/stores/employee-store.js';

describe('EditEmployeePage', () => {
  let el;
  let employee;

  beforeEach(async () => {
    // Add a test employee to the store
    employee = {
      id: 'test-id-123',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfEmployment: '2020-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+90 555 123 4567',
      email: 'jane.doe@email.com',
      department: 'Analytics',
      position: 'Junior'
    };
    useEmployeeStore.setState({
      employees: [
        employee,
        {
          id: 'other-id',
          firstName: 'John',
          lastName: 'Smith',
          dateOfEmployment: '2021-01-01',
          dateOfBirth: '1991-01-01',
          phoneNumber: '+90 555 987 6543',
          email: 'john.smith@email.com',
          department: 'Tech',
          position: 'Senior'
        }
      ]
    });

    // Simulate Vaadin Router location param
    window.appRouter = {
      location: { params: { userId: employee.id } }
    };

    el = await fixture(html`<edit-employee-page></edit-employee-page>`);
    await el.updateComplete;
  });

  it('renders and pre-fills the form with employee data', () => {
    expect(el.values.firstName).to.equal('Jane');
    expect(el.values.lastName).to.equal('Doe');
    expect(el.values.email).to.equal('jane.doe@email.com');
    expect(el.shadowRoot.querySelector('input[name="firstName"]').value).to.equal('Jane');
    expect(el.shadowRoot.querySelector('input[name="email"]').value).to.equal('jane.doe@email.com');
  });

  it('shows validation errors for required fields', async () => {
    el.values = {
      ...el.values,
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
    el.values = { ...el.values, email: 'not-an-email' };
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    expect(el.errors.email).to.include('Invalid email address');
  });

  it('shows validation error for duplicate email (excluding self)', async () => {
    el.values = { ...el.values, email: 'john.smith@email.com' };
    el.requestUpdate();
    await el.updateComplete;
    el.shadowRoot.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    expect(el.errors.email).to.include('Email must be unique');
  });
});