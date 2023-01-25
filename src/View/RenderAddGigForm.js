class RenderAddGigForm {
  constructor() {
    this.resultsSection = document.querySelector('.results-section');
    this.form = document.querySelector('.edit-section__add');
  }

  RenderForm(month) {
    // clear main title (UX)
    document.querySelector('.header-main-title__text').textContent = '';

    this.resultsSection.classList.add('u-no-display');
    this.form.classList.remove('u-no-display');

    month.PrepMonth();
  }

  RejectForm() {
    this.resultsSection.classList.remove('u-no-display');
    this.form.classList.add('u-no-display');
  }
}

export default new RenderAddGigForm();
