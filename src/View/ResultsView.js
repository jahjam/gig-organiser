class ResultsView {
  constructor() {
    this.resultsEl = document.querySelector('.results-section');
  }

  ClearResults() {
    this.resultsEl.innerHTML = '';
  }

  IsContainerEmpty(DOMEl) {
    if (this.resultsEl.innerHTML === '') {
      this.resultsEl.innerHTML = `
      ${DOMEl}
      `;
    }
  }
}

export default new ResultsView();
