import renderMainGigs from '../UI/renderMainGigs.js';
import createMonth from '../modules/createMonth.js';
import renderFlagged from './renderFlagged.js';

class RenderTodaysGigs extends renderMainGigs {
  handlerTodayViewBtn() {
    window.addEventListener('click', this.handleTodayViewBtn.bind(this));
  }

  handleTodayViewBtn(e) {
    if (!e.target.closest('.today-btn')) return;

    this.mainTitle.textContent = "today's gigs";

    this.addRemoveBtnActive('.today-btn', e);

    this.clearResults();

    this.renderGigsDueToday();
  }

  renderGigsDueToday() {
    this.clearResults();

    this.mainTitle.textContent = "today's gigs";

    if (createMonth.gigsByMonth.length === 0) {
      this.resultsEl.innerHTML = `
      <h2 class="notice">No gigs today</h2>
      `;
    }

    createMonth.gigsByMonth.forEach(month =>
      month.gig.forEach(gig => {
        if (createMonth.todaysDate === gig.date) {
          this.renderGigs(
            gig.venue,
            gig.date,
            gig.notes,
            gig.num,
            gig.str,
            gig.city,
            gig.postcode,
            gig.soundCheck,
            gig.stageTime
          );
        }
      })
    );

    this.isContainerEmpty('<h2 class="notice">No gigs today</h2>');

    renderFlagged.isFlagged();
  }
}

export default new RenderTodaysGigs();
