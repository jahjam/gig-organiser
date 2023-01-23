import createMonth from '../modules/createMonth.js';
import localStorage from '../modules/localStorage.js';
import renderMainGigs from './renderMainGigs';
import renderFlaggedGigs from './renderFlaggedGigs.js';
import UIHelpers from './UIHelpers.js';

class RenderFlagged extends UIHelpers {
  resultsSection = document.querySelector('.results-section');
  asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');

  handlerFlaggedGig() {
    window.addEventListener('click', this.flagGig.bind(this));
  }

  flagGig(e) {
    if (e.target.closest('.flag-icon')) {
      this.flagIcon = e.target.closest('.flag-icon');
      this.gigElement = this.flagIcon.parentElement.parentElement;

      // gets the venue name of the flag icon clicked
      const targetGig = [...this.gigElement.children]
        .filter(div =>
          div.classList.contains(
            [...div.classList].filter(
              c => c === 'result-card__venue'.toString()
            )
          )
        )[0]
        .lastElementChild.textContent.toLowerCase();

      // gets the date of the flag icon clicked
      const targetDate = [...this.gigElement.children]
        .filter(div =>
          div.classList.contains(
            [...div.classList].filter(c => c === 'result-card__date'.toString())
          )
        )[0]
        .lastElementChild.textContent.toLowerCase();

      createMonth.gigsByMonth.forEach(month =>
        month.gig.forEach(gig => {
          // If gig.flagged === false or doesn't exist, run this code
          if (!gig.flagged) {
            // Flag a gig when the flag is clicked
            if (
              gig.venue.toLowerCase() === targetGig &&
              gig.date === targetDate
            ) {
              // Mark gig flagged as true
              gig.flagged = true;

              // Add the flagged gigs element reference to flagged array
              createMonth.flaggedGigsEl.push(this.gigElement);

              // Render it the flagged gig color
              e.target.style.color = '#eeba0b';
            }

            // Update local storage to saved flagged state
            localStorage.updateLocalStorage();
          } else {
            // Unflag gig when flag is clicked
            if (
              gig.venue.toLowerCase() === targetGig &&
              gig.date === targetDate
            ) {
              // Mark gig flagged as false
              gig.flagged = false;

              this.removeFlaggedGigRef(this.gigElement);
              // // Remove flagged gig element reference from flagged array
              // createMonth.flaggedGigsEl.forEach(gig => {
              //   // Take the relevent part of the stored gig element
              //   const splitPrevElement =
              //     this.gigElement.innerHTML.split('icon');

              //   // Take the relevent part of the newly rendered elements
              //   const splitCurElement = gig.innerHTML.split('icon');

              //   // Compare them so to apply the correct element is removed the reference array
              //   if (splitCurElement[0] === splitPrevElement[0]) {
              //     const index = createMonth.flaggedGigsEl.indexOf(gig);
              //     createMonth.flaggedGigsEl.splice(index, 1);
              //   }
              // });

              // Render it the default color
              this.turnOnHover(this.flagIcon);
              e.target.style.color = '#140000';
            }

            // Update local storage to saved flagged state
            localStorage.updateLocalStorage();
          }
        })
      );
    }

    // Rerenders gigs if already on flagged view to remove the unflagged gig
    if (
      e.target.closest('.flag-icon') &&
      [...this.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('flagged-btn'))[0]
        .classList.contains('u-active-btn')
    ) {
      this.clearResults();

      renderFlaggedGigs.renderGigsFlagged();

      // Display no flagged gigs if the container is empty
      this.isContainerEmpty('<h2 class="notice">No Flagged Gigs</h2>');

      // Rerun the isFlagged check
      this.isFlagged();
    }
  }

  // gig === flagged ? render correct color
  isFlagged() {
    createMonth.gigsByMonth.forEach(month =>
      month.gig.forEach(gig => {
        // if the gig has never been flagged, return
        if (!gig.flagged) return;

        // if the gig is flagged, apply the correct color
        if (gig.flagged) {
          createMonth.flaggedGigsEl.forEach(g => {
            // Retrieve the correct index for the relevent stored gig element
            const index = createMonth.flaggedGigsEl.indexOf(g);

            this.resultsSection.children.forEach(card => {
              // Take the relevent part of the stored gig element
              const splitPrevElement =
                createMonth.flaggedGigsEl[index].innerHTML.split('icon');

              // Take the relevent part of the newly rendered elements
              const splitCurElement = card.innerHTML.split('icon');

              // Compare them so to apply the correct color to the correct card
              if (splitCurElement[0] === splitPrevElement[0])
                card.children[6].children[0].style.color = '#eeba0b';
            });
          });
        } else {
          this.turnOnHover(card.children[6].children[0]);
          this.resultsSection.children.forEach(card => {
            card.children[6].children[0].style.color = '#140000';
          });
        }
      })
    );
  }

  turnOnHover(el) {
    el.classList.add('u-is-flag-hovered');
  }
}

export default new RenderFlagged();
