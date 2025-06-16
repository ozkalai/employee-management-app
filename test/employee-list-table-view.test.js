import { fixture, html, expect } from '@open-wc/testing';
import '../src/containers/employee-list-table-view.js';
import { useEmployeeStore } from '../src/stores/employee-store.js';

describe('EmployeeListTableView', () => {
  let el;

  beforeEach(async () => {
    // Reset store to known state
    useEmployeeStore.setState({
      employees: [
        {
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          dateOfEmployment: '2020-01-01',
          dateOfBirth: '1990-01-01',
          phoneNumber: '555-1234',
          email: 'jane@example.com',
          department: 'HR',
          position: 'Manager'
        }
      ]
    });
    el = await fixture(html`<employee-list-table-view></employee-list-table-view>`);
    await el.updateComplete;
  });

  it('renders employee data in table', () => {
    const row = el.shadowRoot.querySelector('tbody tr');
    expect(row).to.exist;
    expect(row.textContent).to.include('Jane');
    expect(row.textContent).to.include('Doe');
    expect(row.textContent).to.include('HR');
  });

  it('opens delete confirmation modal when delete icon is clicked', async () => {
    const deleteBtn = el.shadowRoot.querySelector('.actions [title="Delete"]');
    deleteBtn.click();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector('delete-confirmation-modal');
    expect(modal.isOpen).to.be.true;
    expect(modal.employeeName).to.include('Jane Doe');
  });

  it('removes employee after confirming delete', async () => {
    // Open modal
    const deleteBtn = el.shadowRoot.querySelector('.actions [title="Delete"]');
    deleteBtn.click();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector('delete-confirmation-modal');
    // Confirm delete
    const deleteModalBtn = modal.shadowRoot.querySelector('.btn-delete');
    deleteModalBtn.click();
    await el.updateComplete;
    // Employee should be removed
    expect(el.shadowRoot.querySelector('tbody tr')).to.not.exist;
    expect(useEmployeeStore.getState().employees.length).to.equal(0);
  });
});