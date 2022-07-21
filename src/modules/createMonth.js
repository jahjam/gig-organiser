import { format } from 'date-fns';
import renderMonthSelector from '../UI/renderMonthSelector.js';
import month from './month.js';

class CreateMonth {
  gigsByMonth = [];
  todaysDate = format(new Date(), 'dd/MM/yyyy');

  createMonth(e) {
    e.preventDefault();
    this.userOption = document.forms['months-form'].month;

    // Checks if month already exists (might implement multiples of months in future)
    if (
      this.gigsByMonth.length !== 0 &&
      this.gigsByMonth.every(month => {
        if (month.month.toLowerCase() === this.userOption.value.toLowerCase()) {
          return true;
        }
      })
    )
      return;

    new month(this.userOption.value);
    renderMonthSelector.closeSelector();
  }
}

export default new CreateMonth();
