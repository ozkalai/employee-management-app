import { fixture, html, expect } from '@open-wc/testing';
import '../src/containers/employee-list-list-view.js';
import { useEmployeeStore } from '../src/stores/employee-store.js';
import { usePaginationStore } from '../src/stores/pagination-store.js';

describe('EmployeeListListView', () => {
  let el;
  let employees;

  const getPosition = (i) => {
    if (i % 3 === 0) return 'Junior';
    if (i % 3 === 1) return 'Medior';
    return 'Senior';
  };

  beforeEach(async () => {
    // Set up 12 employees for pagination
    employees = Array.from({ length: 12 }).map((_, i) => ({
      id: `emp-${i}`,
      firstName: `First${i}`,
      lastName: `Last${i}`,
      dateOfEmployment: `2020-01-${String(i + 1).padStart(2, '0')}`,
      dateOfBirth: `1990-01-${String(i + 1).padStart(2, '0')}`,
      phoneNumber: `+90 555 000 00${i}`,
      email: `user${i}@test.com`,
      department: i % 2 === 0 ? 'Analytics' : 'Tech',
      position: getPosition(i)
    }));
    useEmployeeStore.setState({ employees });
    usePaginationStore.setState({ currentPage: 1, totalPages: 2 });

    el = await fixture(html`<employee-list-list-view></employee-list-list-view>`);
    await el.updateComplete;
  });

  it('renders employee cards for paged employees', () => {
    const cards = el.shadowRoot.querySelectorAll('.employee-card');
    // Default page size is 9, so only 9 should be shown on page 1
    expect(cards.length).to.equal(9);
    expect(cards[0].textContent).to.include('First0');
    expect(cards[8].textContent).to.include('First8');
  });

  it('shows correct employee data in card', () => {
    const card = el.shadowRoot.querySelector('.employee-card');
    expect(card.textContent).to.include('First0');
    expect(card.textContent).to.include('Last0');
    expect(card.textContent).to.include('user0@test.com');
    expect(card.textContent).to.include('Analytics');
    expect(card.textContent).to.include('Junior');
  });

  it('edit link points to correct edit page', () => {
    const editLink = el.shadowRoot.querySelector('.actions a');
    expect(editLink.getAttribute('href')).to.equal('/edit/emp-0');
  });

  it('opens delete confirmation modal when delete icon is clicked', async () => {
    const deleteBtn = el.shadowRoot.querySelector('.actions [title="Delete"]');
    deleteBtn.click();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector('delete-confirmation-modal');
    expect(modal.isOpen).to.be.true;
  });

  it('removes employee after confirming delete', async () => {
    // Open modal for first employee
    const deleteBtn = el.shadowRoot.querySelector('.actions [title="Delete"]');
    deleteBtn.click();
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector('delete-confirmation-modal');
    // Confirm delete
    modal.handleDelete();
    await el.updateComplete;
    // Employee should be removed from store
    expect(useEmployeeStore.getState().employees.some(e => e.id === 'emp-0')).to.be.false;
  });

  it('shows only paged employees for current page', async () => {
    // Go to page 2
    usePaginationStore.getState().setPage(2);
    await el.updateComplete;
    const cards = el.shadowRoot.querySelectorAll('.employee-card');
    // Should show 3 employees on page 2 (12 total, 9 per page)
    expect(cards.length).to.equal(3);
    expect(cards[0].textContent).to.include('First9');
    expect(cards[2].textContent).to.include('First11');
  });
});