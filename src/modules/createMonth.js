import { format } from 'date-fns';
import renderMonthSelector from '../UI/renderMonthSelector.js';
import monthGen from './month.js';

class CreateMonth {
  gigsByMonth = [];
  todaysDate = format(new Date(), 'dd/MM/yyyy');

  createMonth(e) {
    e.preventDefault();
    this.userOption = document.forms['months-form'].month;
    this.doubleMonth = false;

    this.gigsByMonth.forEach(month => {
      if (month.month.toLowerCase() === this.userOption.value.toLowerCase()) {
        this.doubleMonth = true;
      }
    });
    // Checks if month already exists (might implement multiples of months in future)
    if (this.gigsByMonth.length !== 0 && this.doubleMonth) return;

    new monthGen(this.userOption.value);
    renderMonthSelector.closeSelector();
    this.doubleMonth = false;
  }
}

export default new CreateMonth();
