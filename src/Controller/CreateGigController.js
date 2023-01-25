import MonthStorageModel from '../Model/MonthStorageModel';
import GigEntityModel from '../Model/GigEntityModel';

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
    GigEntityModel.gigIndex++;
    this.inputs = [];
  }
}

export default new CreateGigController();
