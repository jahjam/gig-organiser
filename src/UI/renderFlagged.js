import createMonth from '../modules/createMonth.js';
import UIHelpers from './UIHelpers.js';

class RenderFlagged extends UIHelpers {
  flagIcon;
  asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');

  handlerFlaggedGig() {
    window.addEventListener('click', this.flagGig.bind(this));
  }

  flagGig(e) {
    if (e.target.closest('.flag-icon')) {
      const targetGig = [
        ...this.flagIcon[0].parentElement.parentElement.children,
      ]
        .filter(div =>
          div.classList.contains(
            [...div.classList].filter(
              c => c === 'result-card__venue'.toString()
            )
          )
        )[0]
        .lastElementChild.textContent.toLowerCase();

      const targetDate = [
        ...this.flagIcon[0].parentElement.parentElement.children,
      ]
        .filter(div =>
          div.classList.contains(
            [...div.classList].filter(c => c === 'result-card__date'.toString())
          )
        )[0]
        .lastElementChild.textContent.toLowerCase();

      // Flag a gig when the flag is clicked
      createMonth.gigsByMonth.forEach(month => {
        month.gig.forEach(gig => {
          if (!gig.flagged) {
            if (
              gig.venue.toLowerCase() === targetGig &&
              gig.date === targetDate
            ) {
              gig.flagged = true;
              e.target.style.color = '#eeba0b';
            }
          } else {
            if (gig.venue.toLowerCase() === targetGig) {
              gig.flagged = false;
              this.turnOnHover();
              e.target.style.color = '#140000';
            }
          }
        });
      });
    }

    // Rerenders gigs if already on flagged view to remove the unflagged gig.
    if (
      e.target.closest('.flag-icon') &&
      [...this.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('flagged-btn'))[0]
        .classList.contains('u-active-btn')
    ) {
      this.clearResults();

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

      this.isContainerEmpty('<h2 class="notice">No Flagged Gigs</h2>');

      this.isFlagged();
    }
  }

  // gig === flagged ? render correct colour
  isFlagged() {
    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        if (!this.flagIcon) return;
        if (gig.flagged) {
          this.flagIcon[0].style.color = '#eeba0b';
        } else {
          this.turnOnHover();
          this.flagIcon[0].style.color = '#140000';
        }
      });
    });
  }

  turnOnHover() {
    this.flagIcon[0].classList.add('u-is-flag-hovered');
  }
}

export default new RenderFlagged();
