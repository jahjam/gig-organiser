import RenderGigsController from './RenderGigsController';

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
}

export default new HelperController();
