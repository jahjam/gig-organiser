import UIHelpers from './UIHelpers.js';
import createMonth from '../modules/createMonth.js';
import renderTodaysGigs from './renderTodaysGigs.js';
import renderWeeksGigs from './renderWeeksGigs.js';
import renderMonthsGigs from './renderMonthsGigs.js';
import renderFlaggedGigs from './renderFlaggedGigs.js';

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
    // Push the relevent gig info into the targetGig array
    this.targetGig.push(...this.getGig(e));

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        // Compare the current gig with the targetGig array
        if (this.arrayEquals(Object.values(gig), this.targetGig)) {
          const i = month.gig.indexOf(gig);
          // Stop deletion if returns true
          if (this.deleteWarning()) return;
          // Delete the relevent gig with the month
          delete month.gig[i];

          // Rerender gigs based on current tab open in view
          if (this.readViewBtns() === 'renderTodaysGigs')
            renderTodaysGigs.renderGigsDueToday();
          if (this.readViewBtns() === 'renderWeeksGigs')
            renderWeeksGigs.renderGigsDueWeek(e);
          if (this.readViewBtns() === 'renderMonthsGigs')
            renderMonthsGigs.renderGigsDueMonth(e);
          if (this.readViewBtns() === 'renderFlaggedGigs')
            renderFlaggedGigs.renderGigsFlagged(e);

          // Remove correct gig from the side panel
        }
      });
    });
  }
}

export default new RenderDelete();
