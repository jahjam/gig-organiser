import createMonth from './createMonth.js';
import renderGig from '../UI/renderGig.js';
import { format } from 'date-fns';

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

    console.log(this.month);
  }

  addFormData() {
    console.log(this.month);
    this.month.createGig(...this.values);
    this.values = [];
    renderGig.formReset();
  }

  editGig(venue, date, notes, num, str, city, postcode, soundCheck, stageTime) {
    let formattedDate;

    if (date.includes('-')) {
      formattedDate = format(new Date(date.replaceAll('-', '/')), 'dd/MM/yyyy');
    }

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
    });

    this.values = [];
    renderGig.formReset();
  }
}

export default new CreateGig();
