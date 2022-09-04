import renderMainGigs from '../UI/renderMainGigs.js';
import createMonth from '../modules/createMonth.js';
import sortData from '../modules/sortData';
import renderFlagged from './renderFlagged.js';

class RenderWeeksGigs extends renderMainGigs {
  handlerWeeksViewBtn() {
    window.addEventListener('click', this.handleWeeksViewBtn.bind(this));
  }

  handleWeeksViewBtn(e) {
    if (!e.target.closest('.next-week-btn')) return;

    this.mainTitle.textContent = 'this weeks gigs';

    this.addRemoveBtnActive('.next-week-btn', e);

    this.clearResults();

    this.renderGigsDueWeek();
  }

  renderGigsDueWeek() {
    this.clearResults();

    sortData.sortMonthsInOrder();

    if (createMonth.gigsByMonth.length === 0) {
      this.resultsEl.innerHTML = `
        <h2 class="notice">No gigs this week</h2>
        `;
    }

    createMonth.gigsByMonth.forEach(month =>
      month.gig.forEach(gig => {
        this.filterWeekMonth(gig, 'week');
      })
    );

    this.isContainerEmpty('<h2 class="notice">No gigs this week</h2>');

    renderFlagged.isFlagged();
  }
}

export default new RenderWeeksGigs();
