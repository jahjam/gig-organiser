// node_modules
import { intervalToDuration, isAfter } from 'date-fns';

//model
import MonthStorageModel from '../Model/MonthStorageModel';

// view
import ResultsView from '../View/ResultsView';

class RenderGigsController {
  RenderGigsDueToday() {
    ResultsView.mainTitle.textContent = "today's gigs";

    ResultsView.ClearResults();

    // TODO sort data

    if (MonthStorageModel.months_arr.length === 0) {
      ResultsView.resultsEl.innerHTML = `
      <h2 class="notice">No gigs today</h2>
      `;
    }

    MonthStorageModel.months_arr.forEach(month =>
      month.gigs_arr.forEach(gig => {
        if (MonthStorageModel.todaysDate === gig.date) {
          ResultsView.RenderGig(gig, month);
        }
      })
    );

    ResultsView.IsViewEmpty('<h2 class="notice">No gigs today</h2>');
  }

  RenderGigsDueThisWeek() {
    ResultsView.mainTitle.textContent = 'this weeks gigs';

    ResultsView.ClearResults();

    // TODO sort data

    if (MonthStorageModel.months_arr.length === 0) {
      ResultsView.resultsEl.innerHTML = `
        <h2 class="notice">No gigs this week</h2>
        `;
    }

    MonthStorageModel.months_arr.forEach(month =>
      month.gigs_arr.forEach(gig => {
        this.FilterWeekMonth(gig, month, 'week');
      })
    );

    ResultsView.IsViewEmpty('<h2 class="notice">No gigs this week</h2>');
  }

  RenderGigsDueThisMonth() {
    ResultsView.mainTitle.textContent = 'this months gigs';

    ResultsView.ClearResults();

    // TODO sort data

    if (MonthStorageModel.months_arr.length === 0) {
      ResultsView.resultsEl.innerHTML = `
        <h2 class="notice">No gigs this month</h2>
        `;
    }

    MonthStorageModel.months_arr.forEach(month =>
      month.gigs_arr.forEach(gig => {
        this.FilterWeekMonth(gig, month, 'month');
      })
    );

    ResultsView.IsViewEmpty('<h2 class="notice">No gigs this month</h2>');
  }

  RenderGigsFlagged() {
    ResultsView.mainTitle.textContent = 'flagged gigs';

    ResultsView.ClearResults();

    // TODO sort data

    if (MonthStorageModel.months_arr.length === 0) {
      ResultsView.resultsEl.innerHTML = `
        <h2 class="notice">No gigs flagged gigs</h2>
        `;
    }

    MonthStorageModel.months_arr.forEach(month =>
      month.gigs_arr.forEach(gig => {
        if (gig.flagged === true) {
          ResultsView.RenderGig(gig, month);
        }
      })
    );

    ResultsView.IsViewEmpty('<h2 class="notice">No gigs flagged gigs</h2>');
  }

  FilterWeekMonth(gig, month, type) {
    this.gigYear = +gig.date.split('/')[2];
    this.gigMonth = +gig.date.split('/')[1];
    this.gigDay = +gig.date.split('/')[0];
    this.todayYear = +MonthStorageModel.todaysDate.split('/')[2];
    this.todayMonth = +MonthStorageModel.todaysDate.split('/')[1];
    this.todayDay = +MonthStorageModel.todaysDate.split('/')[0];

    const numDays = intervalToDuration({
      start: new Date(this.todayYear, this.todayMonth, this.todayDay),
      end: new Date(this.gigYear, this.gigMonth, this.gigDay),
    }).days;

    const numMonths = intervalToDuration({
      start: new Date(this.todayYear, this.todayMonth, this.todayDay),
      end: new Date(this.gigYear, this.gigMonth, this.gigDay),
    }).months;

    const isDateAfter = isAfter(
      new Date(this.gigYear, this.gigMonth, this.gigDay),
      new Date(this.todayYear, this.todayMonth, this.todayDay)
    );

    if (type === 'week') {
      if (isDateAfter && numDays <= 7 && numMonths === 0) {
        ResultsView.RenderGig(gig, month);
      }
    }

    if (type === 'month') {
      if (isDateAfter && numMonths === 0 && numDays < 31) {
        ResultsView.RenderGig(gig, month);
      }
    }
  }
}

export default new RenderGigsController();
