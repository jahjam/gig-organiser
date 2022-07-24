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
}
