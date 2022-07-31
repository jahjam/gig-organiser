import UIHelpers from './UIHelpers.js';
import createMonth from '../modules/createMonth.js';
import renderTodaysGigs from './renderTodaysGigs.js';
import renderWeeksGigs from './renderWeeksGigs.js';
import renderMonthsGigs from './renderMonthsGigs.js';
import renderFlaggedGigs from './renderFlaggedGigs.js';
import renderFlagged from '../UI/renderFlagged.js';
import localStorage from '../modules/localStorage.js';

class RenderDelete extends UIHelpers {
  targetGig = [];
  gigElement;

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

    this.gigsInAside = document.querySelectorAll(
      '.aside-menu__dates-content-item'
    );
    this.deleteIcon = e.target.closest('.delete-icon');
    this.gigElement = this.deleteIcon.parentElement.parentElement;

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
            if (Object.values(gig).includes(+gigEl.dataset.index))
              gigEl.parentNode.parentNode.removeChild(gigEl.parentNode);
          });

          if (gig.flagged) {
            // Remove flagged gig element reference from flagged array
            renderFlagged.flaggedGigsEl.forEach(gigEl => {
              // Take the relevent part of the stored gig element
              const splitPrevElement = this.gigElement.innerHTML.split('icon');

              // Take the relevent part of the newly rendered elements
              const splitCurElement = gigEl.innerHTML.split('icon');

              // Compare them so to apply the correct element is removed the reference array
              if (splitCurElement[0] === splitPrevElement[0]) {
                const index = renderFlagged.flaggedGigsEl.indexOf(gigEl);
                renderFlagged.flaggedGigsEl.splice(index, 1);
              }
            });
          }

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
