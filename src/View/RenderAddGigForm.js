// controller
import HelperController from '../Controller/HelperController';

class RenderAddGigForm {
  constructor() {
    this.resultsSection = document.querySelector('.results-section');
    this.form = document.querySelector('.edit-section__add');
    this.dateInput = document.querySelector('.edit-window__input-date');
  }

  RenderForm(month) {
    // clear main title (UX)
    document.querySelector('.header-main-title__text').textContent = '';

    HelperController.LockDateToSelectedMonth(this.dateInput, month);

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
