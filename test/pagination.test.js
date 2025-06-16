import { fixture, html, expect } from '@open-wc/testing';
import '../src/containers/pagination-component.js';
import { usePaginationStore } from '../src/stores/pagination-store.js';

describe('PaginationComponent', () => {
  let el;

  beforeEach(async () => {
    // Reset store before each test
    usePaginationStore.setState({
      currentPage: 1,
      totalPages: 10,
    });
    el = await fixture(html`<pagination-component></pagination-component>`);
    await el.updateComplete;
  });

  it('renders correct number of page buttons and ellipsis', async () => {
    usePaginationStore.getState().setTotalPages(10);
    usePaginationStore.getState().setPage(1);
    await el.updateComplete;
    const buttons = el.shadowRoot.querySelectorAll('.page-btn');
    const ellipsis = el.shadowRoot.querySelectorAll('.ellipsis');
    expect(buttons.length).to.be.above(0);
    expect(ellipsis.length).to.be.above(0);
    expect(buttons[0].textContent.trim()).to.equal('1');
    expect(buttons[buttons.length - 1].textContent.trim()).to.equal('10');
  });

  it('highlights the current page', async () => {
    usePaginationStore.getState().setPage(3);
    await el.updateComplete;
    const active = el.shadowRoot.querySelector('.page-btn.active');
    expect(active).to.exist;
    expect(active.textContent.trim()).to.equal('3');
  });

  it('disables previous button on first page', async () => {
    usePaginationStore.getState().setPage(1);
    await el.updateComplete;
    const prev = el.shadowRoot.querySelector('.chevron[aria-label="Previous"]');
    expect(prev.disabled).to.be.true;
  });

  it('disables next button on last page', async () => {
    usePaginationStore.getState().setPage(10);
    await el.updateComplete;
    const next = el.shadowRoot.querySelector('.chevron[aria-label="Next"]');
    expect(next.disabled).to.be.true;
  });

  it('navigates to next and previous pages', async () => {
    usePaginationStore.getState().setPage(2);
    await el.updateComplete;
    const prev = el.shadowRoot.querySelector('.chevron[aria-label="Previous"]');
    const next = el.shadowRoot.querySelector('.chevron[aria-label="Next"]');
    next.click();
    await el.updateComplete;
    expect(usePaginationStore.getState().currentPage).to.equal(3);
    prev.click();
    await el.updateComplete;
    expect(usePaginationStore.getState().currentPage).to.equal(2);
  });

  it('reacts to store changes', async () => {
    usePaginationStore.getState().setPage(7);
    await el.updateComplete;
    const active = el.shadowRoot.querySelector('.page-btn.active');
    expect(active.textContent.trim()).to.equal('7');
  });
});