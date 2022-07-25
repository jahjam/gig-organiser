import UIHelpers from './UIHelpers.js';
import createMonth from '../modules/createMonth.js';
import renderTodaysGigs from './renderTodaysGigs.js';
import renderWeeksGigs from './renderWeeksGigs.js';
import renderMonthsGigs from './renderMonthsGigs.js';
import renderFlaggedGigs from './renderFlaggedGigs.js';
import localStorage from '../modules/localStorage.js';

class RenderDelete extends UIHelpers {
  targetGig = [];
  // Delete button handler
  handlerDeleteBtn() {
    window.addEventListener('click', this.deleteGig.bind(this));
  }

  // Show a warning sign before deleting
  deleteWarning() {
    // UI pop up to give option for the user to cancel the deletion or proceed
  }

  // Delete functionality
  deleteGig(e) {
    if (!e.target.closest('.delete-icon')) return;
    // this.saveIndex;

    this.gigsInAside = document.querySelectorAll(
      '.aside-menu__dates-content-item'
    );

    // Push the relevent gig info into the targetGig array
    this.targetGig.push(...this.getGig(e));

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        // Stop deletion if returns true
        if (this.deleteWarning()) return;

        // Extract relevent info from the gig to compere
        const gigExtract = [
          gig.venue,
          gig.date,
          gig.notes,
          gig.num,
          gig.str,
          gig.city,
          gig.postcode,
          gig.soundCheck,
          gig.stageTime,
        ];

        // Compare the current gig with the targetGig array
        if (this.arrayEquals(gigExtract, this.targetGig)) {
          const i = month.gig.indexOf(gig);

          // Delete the relevent gig within the month
          month.gig.splice(i, 1);

          // Remove correct gig from the side panel
          this.gigsInAside.forEach(gigEl => {
            console.log(gig);
            if (Object.values(gig).includes(+gigEl.dataset.index))
              gigEl.parentNode.parentNode.removeChild(gigEl.parentNode);
          });

          // Rerender gigs based on current tab open in view
          if (this.readViewBtns() === 'renderTodaysGigs')
            renderTodaysGigs.renderGigsDueToday();
          if (this.readViewBtns() === 'renderWeeksGigs')
            renderWeeksGigs.renderGigsDueWeek(e);
          if (this.readViewBtns() === 'renderMonthsGigs')
            renderMonthsGigs.renderGigsDueMonth(e);
          if (this.readViewBtns() === 'renderFlaggedGigs')
            renderFlaggedGigs.renderGigsFlagged(e);

          this.targetGig = [];
          localStorage.updateLocalStorage();
        }
      });
    });
  }
}

export default new RenderDelete();
