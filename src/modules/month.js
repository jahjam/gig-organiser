import createMonth from './createMonth.js';
import renderMonthAndGigs from '../UI/renderMonthsAndGigs.js';
import renderTodaysGigs from '../UI/renderTodaysGigs.js';
import localStorage from './localStorage.js';
import sortData from './sortData.js';
import sortDOM from '../UI/sortDOM.js';
import { format } from 'date-fns';

export default class Month {
  monthToAmend = undefined;
  // Storage for gigs within each month
  gig = [];

  constructor(month) {
    this.month = month;
    createMonth.gigsByMonth.push(this);
    renderMonthAndGigs.renderNewMonth(this.month);
    sortData.sortMonthsInOrder();
    sortDOM.sortAsideMenuMonths();
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

  cancelPrep() {
    createMonth.gigsByMonth.push(this.monthToAmend);
    this.monthToAmend = undefined;
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

    date.includes('-')
      ? (formattedDate = format(
          new Date(date.replaceAll('-', '/')),
          'dd/MM/yyyy'
        ))
      : (formattedDate = date);

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

    // Render the gig within the result view
    renderMonthAndGigs.renderGig(venue, this.month, index, fromStorage);

    // Push the gig into the month
    createMonth.gigsByMonth.push(this);

    // reset the month to amend
    this.monthToAmend = undefined;

    // Sort data
    sortData.sortGigsInOrderOfDate();
    sortData.sortGigsInOrderOfStageTime();

    // Render gigs due today if the gig added is today
    if (createMonth.todaysDate === formattedDate)
      renderTodaysGigs.renderGigsDueToday();

    localStorage.updateLocalStorage();
  }
}
