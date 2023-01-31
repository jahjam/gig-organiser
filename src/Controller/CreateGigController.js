// node_modules
import { format } from 'date-fns';

// model
import MonthStorageModel from '../Model/MonthStorageModel';
import GigEntityModel from '../Model/GigEntityModel';

// controller
import RenderGigsController from './RenderGigsController';
import HelperController from './HelperController';
import SortData from '../Controller/SortData';
import LocalStorageController from './LocalStorageController';

// view
import MonthView from '../View/MonthView';

class CreateGigController {
  constructor() {
    this.values = [];
  }

  FormatDate(date) {
    let formattedDate;

    date.includes('-')
      ? (formattedDate = format(
          new Date(date.replaceAll('-', '/')),
          'dd/MM/yyyy'
        ))
      : (formattedDate = date);

    return formattedDate;
  }

  CreateGig(inputs, flagged = false) {
    inputs.forEach(input => {
      this.values.push(input.value);
    });

    MonthStorageModel.monthToAmend.CreateGig(
      ...this.values,
      GigEntityModel.gigIndex,
      flagged
    );

    this.UpdateGigs(MonthStorageModel.monthToAmend);

    SortData.SortGigsInOrderOfDate();
    SortData.SortGigsInOrderOfStageTime();

    const DATE_FROM_VALUES_ARR = this.values[1];
    if (MonthStorageModel.todaysDate === this.FormatDate(DATE_FROM_VALUES_ARR))
      RenderGigsController.RenderGigsDueToday();

    LocalStorageController.UpdateLocalStorage();

    // reset the month to amend
    MonthStorageModel.monthToAmend = undefined;

    GigEntityModel.gigIndex++;
    this.values = [];
  }

  UpdateGigs(month) {
    if (month.gigs_arr.length === 0) return;

    month.gigs_arr.forEach(gig => {
      const gigEl_arr = [
        ...document.querySelectorAll(`.aside-menu__dates-content-item`),
      ];

      const gigEl = gigEl_arr.find(el => +el.dataset.index === gig.index);

      if (gigEl) return;

      MonthView.RenderGigInMonth(gig, month);
    });
  }

  ReplaceGig(inputs) {
    const arrayEquals = (a, b) => {
      return a.every((val, index) => val === b[index]);
    };

    MonthStorageModel.monthToAmend.gigs_arr.forEach(gig => {
      if (arrayEquals(Object.values(gig), GigEntityModel.targetGig)) {
        const flagged = gig.flagged;
        MonthView.RemoveGigFromAside(gig.index);

        const gigIndex = MonthStorageModel.monthToAmend.gigs_arr.indexOf(gig);
        MonthStorageModel.monthToAmend.gigs_arr.splice(gigIndex, 1);

        this.CreateGig(inputs, flagged);
      }
    });

    GigEntityModel.targetGig = undefined;

    HelperController.RenderResultsBasedOnSelectedView();
  }
}

export default new CreateGigController();
