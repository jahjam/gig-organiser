// model
import MonthStorageModel from './MonthStorageModel';

// controller
import CreateGigController from '../Controller/CreateGigController';

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
    MonthStorageModel.monthToAmend = this;

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
    MonthStorageModel.months_arr.push(this);
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
    const formattedDate = CreateGigController.FormatDate(date);

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

    MonthStorageModel.months_arr.push(this);
  }
}

export default MonthEntityModel;
