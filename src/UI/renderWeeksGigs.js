import renderMainGigs from '../UI/renderMainGigs.js';
import createMonth from '../modules/createMonth.js';
import renderFlagged from './renderFlagged.js';

class RenderWeeksGigs extends renderMainGigs {
  handlerWeeksViewBtn() {
    window.addEventListener('click', this.renderGigsDueWeek.bind(this));
  }

  renderGigsDueWeek(e) {
    if (!e.target.closest('.next-week-btn')) return;

    this.mainTitle.textContent = 'this weeks gigs';

    this.addRemoveBtnActive('.next-week-btn', e);

    this.clearResults();

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

    if (this.resultsEl.innerHTML === '') {
      this.resultsEl.innerHTML = `
        <h2 class="notice">No gigs this week</h2>
        `;
    }

    renderFlagged.isFlagged();
  }
}

export default new RenderWeeksGigs();
