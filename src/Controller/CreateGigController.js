// node_modules
import { format } from 'date-fns';

// model
import MonthStorageModel from '../Model/MonthStorageModel';
import GigEntityModel from '../Model/GigEntityModel';

// controller
import RenderGigsController from './RenderGigsController';

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

  CreateGig(inputs) {
    inputs.forEach(input => {
      this.values.push(input.value);
    });

    MonthStorageModel.monthToAmend.CreateGig(
      ...this.values,
      GigEntityModel.gigIndex
    );

    MonthView.UpdateGigs(MonthStorageModel.monthToAmend);

    // TODO Sort data
    // sortData.sortGigsInOrderOfDate();
    // sortData.sortGigsInOrderOfStageTime();

    // TODO Render gigs due today if the gig added is today
    const DATE_FROM_VALUES_ARR = this.values[1];
    if (MonthStorageModel.todaysDate === this.FormatDate(DATE_FROM_VALUES_ARR))
      RenderGigsController.RenderGigsDueToday();

    // TODO impliment local storage
    // localStorage.updateLocalStorage();

    // reset the month to amend
    MonthStorageModel.monthToAmend = undefined;

    GigEntityModel.gigIndex++;
    this.values = [];
  }
}

export default new CreateGigController();
