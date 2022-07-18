import { format } from 'date-fns';
import renderMonthSelector from '../UI/renderMonthSelector.js';
import month from './month.js';

class CreateMonth {
  gigsByMonth = [];
  todaysDate = format(new Date(), 'dd/MM/yyyy');

  constructor() {
    this.addDateBtn = document.querySelector('.aside-menu__months-form-submit');
  }

  handler() {
    this.addDateBtn.addEventListener('click', this.createMonth.bind(this));
  }

  createMonth(e) {
    e.preventDefault();
    this.userOption = document.forms['months-form'].month;
    new month(this.userOption.value);
    renderMonthSelector.closeSelector();
  }
}

export default new CreateMonth();
