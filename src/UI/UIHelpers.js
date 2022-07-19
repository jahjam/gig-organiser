export default class UIHelpers {
  resultsEl = document.querySelector('.results-section');

  clearResults() {
    this.resultsEl.innerHTML = '';
  }

  isContainerEmpty(DOMEl) {
    if (this.resultsEl.innerHTML === '') {
      this.resultsEl.innerHTML = `
      ${DOMEl}
      `;
    }
  }
}
