// model
import MonthStorageModel from '../Model/MonthStorageModel';
import Month from '../Model/MonthEntityModel';

// controller
import SortData from '../Controller/SortData';

// view
import RenderMonthSelector from '../View/RenderMonthSelector';
import MonthView from '../View/MonthView';
import RenderSortDom from '../View/RenderSortDom';
import LocalStorageController from './LocalStorageController';

class CreateMonthController {
  CreateMonth(e) {
    e.preventDefault();
    // gets the users selected month
    const userOption = document.forms['months-form'].month;
    // prevent double months
    let doubleMonth = false;

    MonthStorageModel.months_arr.forEach(month => {
      if (month.monthName.toLowerCase() === userOption.value.toLowerCase())
        doubleMonth = true;
    });

    // Checks if month already exists (might implement multiples of months in future)
    if (MonthStorageModel.months_arr.length !== 0 && doubleMonth) return;

    // create a new month using user selected option
    const newMonth = new Month(userOption.value);

    // render the month in the view passing in the newly
    // generated month
    MonthView.RenderNewMonth(newMonth);

    // sort aside months to keep them in order
    SortData.SortMonthsInOrder();
    RenderSortDom.SortAsideMenuMonths();

    // Remove month selector
    RenderMonthSelector.Reject(e);

    // reset
    doubleMonth = false;

    // update local storage
    LocalStorageController.UpdateLocalStorage();
  }

  DeleteMonth(month) {
    // Finds index of correct month and removes it
    const index = MonthStorageModel.months_arr.indexOf(month);
    MonthStorageModel.months_arr.splice(index, 1);
  }
}

export default new CreateMonthController();
