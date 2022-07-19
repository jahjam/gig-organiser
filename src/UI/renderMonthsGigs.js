import renderMainGigs from '../UI/renderMainGigs.js';
import createMonth from '../modules/createMonth.js';
import renderFlagged from './renderFlagged.js';

class RenderMonthsGigs extends renderMainGigs {
  handlerMonthsViewBtn() {
    window.addEventListener('click', this.renderGigsDueMonth.bind(this));
  }

  renderGigsDueMonth(e) {
    if (!e.target.closest('.month-btn')) return;

    this.mainTitle.textContent = 'this months gigs';

    this.addRemoveBtnActive('.month-btn', e);

    this.clearResults();

    if (createMonth.gigsByMonth.length === 0) {
      this.resultsEl.innerHTML = `
      <h2 class="notice">No gigs this month</h2>
      `;
    }

    createMonth.gigsByMonth.forEach(month =>
      month.gig.forEach(gig => {
        this.filterWeekMonth(gig, 'month');
      })
    );

    this.isContainerEmpty('<h2 class="notice">No gigs this month</h2>');

    renderFlagged.isFlagged();
  }
}

export default new RenderMonthsGigs();
