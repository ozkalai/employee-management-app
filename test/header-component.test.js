import { fixture, html, expect } from '@open-wc/testing';
import '../src/header-component.js';
import { useLanguageStore } from '../src/stores/language-store.js';

describe('HeaderComponent', () => {
  afterEach(() => {
    // Reset language after each test
    useLanguageStore.getState().setLanguage('tr');
  });

  it('renders Turkish label by default', async () => {
    const el = await fixture(html`<header-component></header-component>`);
    const label = el.shadowRoot.querySelector('.header-top-label');
    expect(label.textContent).to.include('Çalışan Listesi');
  });

  it('renders English label when language is set to en', async () => {
    useLanguageStore.getState().setLanguage('en');
    const el = await fixture(html`<header-component></header-component>`);
    const label = el.shadowRoot.querySelector('.header-top-label');
    expect(label.textContent).to.include('Employee List');
  });

  it('changes label when language is switched', async () => {
    const el = await fixture(html`<header-component></header-component>`);
    const select = el.shadowRoot.querySelector('.lang-picker');
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;
    const label = el.shadowRoot.querySelector('.header-top-label');
    expect(label.textContent).to.include('Employee List');
  });
}); 