import { format } from 'date-fns';
import renderMonthSelector from '../UI/renderMonthSelector.js';
import month from './month.js';

class CreateMonth {
  gigsByMonth = [];
  todaysDate = format(new Date(), 'dd/MM/yyyy');

  createMonth(e) {
    e.preventDefault();
    this.userOption = document.forms['months-form'].month;

    if (this.gigsByMonth.length !== 0) {
      this.gigsByMonth.forEach(month => {
        if (month.month.toLowerCase() === this.userOption.value.toLowerCase())
          return;
      });
      // Need to display and error here for trying to render two months with same name.
      return;
    }

    new month(this.userOption.value);
    renderMonthSelector.closeSelector();
  }
}

export default new CreateMonth();
