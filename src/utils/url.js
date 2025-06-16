export function getPageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('page') || '1', 10);
}

export function setPageInUrl(page) {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page);
  window.history.replaceState({}, '', url);
} 