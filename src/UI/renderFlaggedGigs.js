import renderMainGigs from '../UI/renderMainGigs.js';
import createMonth from '../modules/createMonth.js';
import renderFlagged from './renderFlagged.js';

class RenderFlaggedGigs extends renderMainGigs {
  handlerFlaggedViewBtn() {
    window.addEventListener('click', this.handleFlaggedViewBtn.bind(this));
  }

  handleFlaggedViewBtn(e) {
    if (!e.target.closest('.flagged-btn')) return;

    this.clearResults();

    this.mainTitle.textContent = 'flagged gigs';

    this.addRemoveBtnActive('.flagged-btn', e);

    this.renderGigsFlagged();

    if (this.resultsEl.innerHTML === '') {
      this.resultsEl.innerHTML = `
      <h2 class="notice">No flagged gigs</h2>
      `;
    }

    renderFlagged.isFlagged();
  }

  renderGigsFlagged() {
    this.clearResults();
    if (createMonth.gigsByMonth.length === 0) {
      this.resultsEl.innerHTML = `
      <h2 class="notice">No flagged gigs</h2>
      `;
    }

    createMonth.gigsByMonth.forEach(month =>
      month.gig.forEach(gig => {
        if (gig.flagged === true) {
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

    renderFlagged.isFlagged();
  }
}

export default new RenderFlaggedGigs();
