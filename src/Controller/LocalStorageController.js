// model
import MonthStorageModel from '../Model/MonthStorageModel';
import GigEntityModel from '../Model/GigEntityModel';
import Month from '../Model/MonthEntityModel';

// controller
import SortData from './SortData';

// view
import MonthView from '../View/MonthView';
import CreateGigController from './CreateGigController';
import RenderSortDom from '../View/RenderSortDom';

class LocalStorageController {
  UpdateLocalStorage() {
    // set storage for months
    localStorage.setItem(
      'months_arr',
      JSON.stringify(MonthStorageModel.months_arr)
    );

    // set storage for gig indices
    localStorage.setItem('gigIndex', JSON.stringify(GigEntityModel.gigIndex));
  }

  LocalStorageInitialise() {
    let monthsStorage_arr;

    // get the months
    this.months_arr = localStorage.getItem('months_arr');
    if (this.months_arr) monthsStorage_arr = JSON.parse(this.months_arr);

    // reinitialise gig index
    this.gigIndex = localStorage.getItem('gigIndex');
    if (this.gigIndex) GigEntityModel.gigIndex = +JSON.parse(this.gigIndex);

    if (monthsStorage_arr) this.Reload(monthsStorage_arr);
  }

  Reload(monthsStorage_arr) {
    // reload the months
    monthsStorage_arr.forEach(month => {
      const newMonth = new Month(month.monthName);

      MonthView.RenderNewMonth(newMonth);

      // sort aside months to keep them in order
      SortData.SortMonthsInOrder();
      RenderSortDom.SortAsideMenuMonths();

      month.gigs_arr.forEach(gig => {
        if (month.gigs_arr.length === 0) return;

        const monthToAmend = MonthStorageModel.months_arr.find(
          ({ monthName }) => monthName === month.monthName
        );

        monthToAmend.PrepMonth();

        monthToAmend.CreateGig(
          gig.venue,
          gig.date,
          gig.notes,
          gig.num,
          gig.street,
          gig.city,
          gig.postcode,
          gig.soundCheck,
          gig.stageTime,
          gig.index,
          gig.flagged,
          true
        );

        CreateGigController.UpdateGigs(newMonth);

        MonthStorageModel.monthToAmend = undefined;
      });
    });
  }
}

export default new LocalStorageController();
