// node_modules
import { format } from 'date-fns';

// model
import MonthStorageModel from './MonthStorageModel';

// view
import MonthView from '../View/MonthView';

class MonthEntityModel {
  // gigs stored within each month
  gigs_arr = [];

  constructor(monthName) {
    this.monthName = monthName;
    MonthStorageModel.months_arr.push(this);
    console.log(MonthStorageModel.months_arr);
  }

  // get the relevent months to add a gig within
  PrepMonth() {
    // grab relevent month
    MonthStorageModel.monthToAmend = MonthStorageModel.months_arr.find(
      ({ monthName }) => monthName === this.monthName
    );

    // remove month ready for new, amended month to be added
    MonthStorageModel.months_arr.splice(
      MonthStorageModel.months_arr.findIndex(
        ({ monthName }) => monthName === this.monthName
      ),
      1
    );
  }

  // if user cancels out of add gig form before completion
  CancelPrepMonth() {
    MonthStorageModel.months_arr.push(this.monthToAmend);
    MonthStorageModel.monthToAmend = undefined;
  }

  CreateGig(
    venue,
    date,
    notes,
    num,
    street,
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

    this.gigs_arr.push({
      venue,
      date: formattedDate,
      notes,
      num,
      street,
      city,
      postcode,
      soundCheck,
      stageTime,
      index,
      flagged: flagged,
    });

    // TODO Render the gig within the result view

    // Push the gig into the month
    MonthStorageModel.months_arr.push(this);

    // reset the month to amend
    MonthStorageModel.monthToAmend = undefined;

    // TODO Sort data
    // sortData.sortGigsInOrderOfDate();
    // sortData.sortGigsInOrderOfStageTime();

    // TODO Render gigs due today if the gig added is today
    // if (createMonth.todaysDate === formattedDate)
    //   renderTodaysGigs.renderGigsDueToday();

    // localStorage.updateLocalStorage();
  }
}

export default MonthEntityModel;
