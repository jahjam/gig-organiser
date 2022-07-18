import createMonth from './createMonth.js';
import renderGig from '../UI/renderGig.js';

class CreateGig {
  values = [];

  selectMonthFromArray(e) {
    this.month = createMonth.gigsByMonth.filter(
      month =>
        month.month.toLowerCase() ===
        e.target.parentElement.previousElementSibling.textContent
          .toLowerCase()
          .trim()
    )[0];

    this.month.prepMonth();
  }

  addFormData() {
    this.month.createGig(...this.values);
    this.values = [];
    renderGig.formReset();
  }
}

export default new CreateGig();
