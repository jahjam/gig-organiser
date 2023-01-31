// node_modules
import { format } from 'date-fns';

class MonthStorageModel {
  // main gig storage
  static months_arr = [];

  // month being amended
  static monthToAmend = undefined;

  // date tracker
  static todaysDate = format(new Date(), 'dd/MM/yyyy');
}

export default MonthStorageModel;
