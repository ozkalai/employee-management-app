import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/containers/delete-confirmation-modal.js';
import { useLanguageStore } from '../src/stores/language-store.js';

describe('DeleteConfirmationModal', () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<delete-confirmation-modal></delete-confirmation-modal>`);
  });

  afterEach(() => {
    useLanguageStore.getState().setLanguage('tr');
  });

  it('is hidden by default', () => {
    expect(el.shadowRoot.querySelector('.modal-overlay')).to.be.null;
  });

  it('shows modal with correct employee name and Turkish text', async () => {
    el.open('Ahmet Yılmaz');
    await el.updateComplete;
    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    expect(overlay).to.exist;
    expect(overlay.textContent).to.include('Ahmet Yılmaz');
    expect(overlay.textContent).to.include('İptal');
    expect(overlay.textContent).to.include('Devam Et');
  });

  it('shows modal with correct employee name and English text', async () => {
    useLanguageStore.getState().setLanguage('en');
    el.open('John Doe');
    await el.updateComplete;
    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    expect(overlay).to.exist;
    expect(overlay.textContent).to.include('John Doe');
    expect(overlay.textContent).to.include('Cancel');
    expect(overlay.textContent).to.include('Proceed');
  });

  it('fires delete-confirmed event and closes on delete button click', async () => {
    el.open('Test User');
    await el.updateComplete;
    const deleteBtn = el.shadowRoot.querySelector('.btn-delete');
    setTimeout(() => deleteBtn.click());
    const event = await oneEvent(el, 'delete-confirmed');
    expect(event).to.exist;
    // Modal should close
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.modal-overlay')).to.be.null;
  });

  it('closes on cancel button click', async () => {
    el.open('Test User');
    await el.updateComplete;
    const cancelBtn = el.shadowRoot.querySelector('.btn-cancel');
    cancelBtn.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.modal-overlay')).to.be.null;
  });

  it('closes on close icon click', async () => {
    el.open('Test User');
    await el.updateComplete;
    const closeBtn = el.shadowRoot.querySelector('.btn-close');
    closeBtn.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.modal-overlay')).to.be.null;
  });

  it('closes on Escape key press', async () => {
    el.open('Test User');
    await el.updateComplete;
    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    overlay.dispatchEvent(event);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.modal-overlay')).to.be.null;
  });
});