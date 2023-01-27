// node_modules
import { isPast } from 'date-fns';

// model
import MonthStorageModel from '../Model/MonthStorageModel';

// controller
import RenderGigsController from './RenderGigsController';
import SortData from './SortData';

class HelperController {
  constructor() {
    this.resultsEl = document.querySelector('.results-section');
    this.asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');
  }

  readViewBtns() {
    const viewBtnEl_string = [...this.asideMenuViewBtns]
      .filter(btn => btn.classList.toString().includes('u-active-btn'))[0]
      .classList.toString();

    // If editting a specifically viewed gig
    if (
      [...this.asideMenuViewBtns].every(btn => {
        if (btn.classList.toString().includes('u-active-btn') === false)
          return true;
      })
    ) {
      [...this.asideMenuViewBtns].forEach(btn => {
        if (btn.classList.contains('today-btn'))
          btn.classList.add('u-active-btn');
      });

      return 'renderTodaysGigs';
    }

    // If editting a gig in normal view
    if (viewBtnEl_string.includes('today-btn')) return 'renderTodaysGigs';

    if (viewBtnEl_string.includes('next-week-btn')) return 'renderWeeksGigs';

    if (viewBtnEl_string.includes('month-btn')) return 'renderMonthsGigs';

    if (viewBtnEl_string.includes('flagged-btn')) return 'renderFlaggedGigs';
  }

  RenderResultsBasedOnSelectedView() {
    // Rerender gigs based on current tab open in view
    if (this.readViewBtns() === 'renderTodaysGigs') {
      RenderGigsController.RenderGigsDueToday();
    } else if (this.readViewBtns() === 'renderWeeksGigs') {
      RenderGigsController.RenderGigsDueThisWeek();
    } else if (this.readViewBtns() === 'renderMonthsGigs') {
      RenderGigsController.RenderGigsDueThisMonth();
    } else if (this.readViewBtns() === 'renderFlaggedGigs') {
      RenderGigsController.RenderGigsFlagged();
    }
  }

  LockDateToSelectedMonth(input, month) {
    const daysInMonth = {
        January: 31,
        February: +`${
          MonthStorageModel.todaysDate.split('/')[2] % 4 === 0 ? 29 : 28
        }`,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31,
      },
      lastDayInMonth = daysInMonth[month.monthName],
      selectedMonth = SortData.months[month.monthName],
      currentYear = MonthStorageModel.todaysDate.split('/')[2],
      currentDay = MonthStorageModel.todaysDate.split('/')[0],
      minDate = `${currentYear}-${
        selectedMonth.toString().length === 1
          ? `0${selectedMonth}`
          : selectedMonth
      }-01`,
      minDateToday = `${currentYear}-${
        selectedMonth.toString().length === 1
          ? `0${selectedMonth}`
          : selectedMonth
      }-${currentDay.toString().length === 1 ? `0${currentDay}` : currentDay}`,
      maxDateThisYear = `${currentYear}-${
        selectedMonth.toString().length === 1
          ? `0${selectedMonth}`
          : selectedMonth
      }-${lastDayInMonth}`,
      minDateNextYear = `${+currentYear + 1}-${
        selectedMonth.toString().length === 1
          ? `0${selectedMonth}`
          : selectedMonth
      }-01`,
      maxDateNextYear = `${+currentYear + 1}-${
        selectedMonth.toString().length === 1
          ? `0${selectedMonth}`
          : selectedMonth
      }-${lastDayInMonth}`;

    // Set date setting to default to this year if the month hasn't passed yet
    if (!isPast(new Date(maxDateThisYear))) {
      input.setAttribute(
        'min',
        +SortData.months[month.monthName] ===
          +MonthStorageModel.todaysDate.split('/')[1]
          ? minDateToday
          : minDate
      );
      input.setAttribute('max', maxDateThisYear);
    }

    // Set date setting to default to next year if the month has already passed
    if (isPast(new Date(maxDateThisYear))) {
      if (input.classList.contains('edit-window__input-date')) {
        input.value = `${+currentYear + 1}-${
          selectedMonth.toString().length === 1
            ? `0${selectedMonth}`
            : selectedMonth
        }-01`;
      }

      input.setAttribute('min', minDateNextYear);
      input.setAttribute('max', maxDateNextYear);
    }
  }
}

export default new HelperController();
