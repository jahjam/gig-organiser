import createMonth from '../modules/createMonth.js';
import sortData from '../modules/sortData.js';
import { isPast } from 'date-fns';

export default class UIHelpers {
  resultsEl = document.querySelector('.results-section');
  asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');

  clearResults() {
    this.resultsEl.innerHTML = '';
  }

  isContainerEmpty(DOMEl) {
    if (this.resultsEl.innerHTML === '') {
      this.resultsEl.innerHTML = `
      ${DOMEl}
      `;
    }
  }

  arrayEquals(a, b) {
    return a.every((val, index) => val === b[index]);
  }

  getGig(e) {
    const gigInfo = [];

    e.target.parentElement.parentElement.children.forEach(child => {
      // Don't store any icons in the targetGigs array
      if (child.children[1].classList.contains('icon')) return;

      // Store regular values
      if (child.children[1].children.length === 0) {
        gigInfo.push(child.children[1].textContent.trim());
      }

      // If values have more than one child, run through and store them
      if (child.children[1].children.length > 0) {
        child.children[1].children.forEach(child => {
          gigInfo.push(child.textContent.trim());
        });
      }
    });

    return gigInfo;
  }

  readViewBtns() {
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
    if (
      [...this.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('u-active-btn'))[0]
        .classList.toString()
        .includes('today-btn')
    )
      return 'renderTodaysGigs';

    if (
      [...this.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('u-active-btn'))[0]
        .classList.toString()
        .includes('next-week-btn')
    )
      return 'renderWeeksGigs';

    if (
      [...this.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('u-active-btn'))[0]
        .classList.toString()
        .includes('month-btn')
    )
      return 'renderMonthsGigs';

    if (
      [...this.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('u-active-btn'))[0]
        .classList.toString()
        .includes('flagged-btn')
    )
      return 'renderFlaggedGigs';
  }

  lockDateToSelectedMonth(input, monthName) {
    const daysInMonth = {
        January: 31,
        February: +`${
          createMonth.todaysDate.split('/')[2] % 4 === 0 ? 29 : 28
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
      lastDayInMonth = daysInMonth[monthName],
      selectedMonth = sortData.months[monthName],
      currentYear = createMonth.todaysDate.split('/')[2],
      currentDay = createMonth.todaysDate.split('/')[0],
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
        +sortData.months[monthName] === +createMonth.todaysDate.split('/')[1]
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

  clearHeader() {
    document.querySelector('.header-main-title__text').textContent = '';
  }
}
