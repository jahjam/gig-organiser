import createMonth from './createMonth.js';
import renderGig from '../UI/renderGig.js';
import localStorage from './localStorage.js';
import { format } from 'date-fns';

class CreateGig {
  values = [];
  // assigned unique code to gig created
  index = 0;

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
    this.month.createGig(...this.values, this.index);
    this.index++;
    this.values = [];
    renderGig.formReset();
    localStorage.updateLocalStorage();
  }

  editGig(
    isFlagged,
    venue,
    date,
    notes,
    num,
    str,
    city,
    postcode,
    soundCheck,
    stageTime
  ) {
    let formattedDate;

    if (date.includes('-'))
      formattedDate = format(new Date(date.replaceAll('-', '/')), 'dd/MM/yyyy');

    this.month.gig.push({
      venue,
      date: formattedDate,
      notes,
      num,
      str,
      city,
      postcode,
      soundCheck,
      stageTime,
      index: this.index,
      flagged: isFlagged,
    });

    this.index++;
    this.values = [];
    renderGig.formReset();
    localStorage.updateLocalStorage();
  }
}

export default new CreateGig();
