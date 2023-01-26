import MonthStorageModel from '../Model/MonthStorageModel';
import GigEntityModel from '../Model/GigEntityModel';

// view
import MonthView from '../View/MonthView';

class CreateGigController {
  constructor() {
    this.values = [];
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

    // reset the month to amend
    MonthStorageModel.monthToAmend = undefined;

    GigEntityModel.gigIndex++;
    this.values = [];
  }
}

export default new CreateGigController();
