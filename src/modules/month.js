import createMonth from './createMonth.js';
import renderMonthAndGigs from '../UI/renderMonthsAndGigs.js';
import renderTodaysGigs from '../UI/renderTodaysGigs.js';
import localStorage from './localStorage.js';
import { format } from 'date-fns';

export default class Month {
  monthToAmend;
  gig = [];

  constructor(month) {
    this.month = month;
    createMonth.gigsByMonth.push(this);
    renderMonthAndGigs.renderNewMonth(this.month);
    localStorage.updateLocalStorage();
  }

  prepMonth() {
    this.monthToAmend = createMonth.gigsByMonth.find(
      ({ month }) => month === this.month
    );

    createMonth.gigsByMonth.splice(
      createMonth.gigsByMonth.findIndex(({ month }) => month === this.month),
      1
    );
  }

  createGig(
    venue,
    date,
    notes,
    num,
    str,
    city,
    postcode,
    soundCheck,
    stageTime,
    index,
    flagged = false,
    fromStorage = false
  ) {
    let formattedDate;

    if (date.includes('-')) {
      formattedDate = format(new Date(date.replaceAll('-', '/')), 'dd/MM/yyyy');
    } else {
      formattedDate = date;
    }

    this.gig.push({
      venue,
      date: formattedDate,
      notes,
      num,
      str,
      city,
      postcode,
      soundCheck,
      stageTime,
      index,
      flagged: flagged,
    });

    renderMonthAndGigs.renderGig(venue, this.month, index, fromStorage);

    createMonth.gigsByMonth.push(this);
    this.monthToAmend = undefined;

    if (createMonth.todaysDate === formattedDate)
      renderTodaysGigs.renderGigsDueToday();

    localStorage.updateLocalStorage();
  }
}
