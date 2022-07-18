import createMonth from '../modules/createMonth.js';
import renderMainGig from './renderMainGigs.js';

class RenderFlagged {
  handlerFlaggedGig() {
    window.addEventListener('click', this.flagGig.bind(this));
  }

  flagGig(e) {
    if (e.target.closest('.flag-icon')) {
      const targetGig = [
        ...renderMainGig.flagIcon[0].parentElement.parentElement.children,
      ]
        .filter(div =>
          div.classList.contains(
            [...div.classList].filter(
              c => c === 'result-card__venue'.toString()
            )
          )
        )[0]
        .lastElementChild.textContent.toLowerCase();

      createMonth.gigsByMonth.forEach(month => {
        month.gig.forEach(gig => {
          if (!gig.flagged) {
            if (gig.venue.toLowerCase() === targetGig) {
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

      console.log(createMonth.gigsByMonth);
    }

    if (
      e.target.closest('.flag-icon') &&
      [...renderMainGig.asideMenuViewBtns]
        .filter(btn => btn.classList.toString().includes('flagged-btn'))[0]
        .classList.contains('u-active-btn')
    )
      renderMainGig.renderGigsFlagged();
  }

  isFlagged() {
    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        if (!renderMainGig.flagIcon) return;
        if (gig.flagged) {
          renderMainGig.flagIcon[0].style.color = '#eeba0b';
        } else {
          this.turnOnHover();
          renderMainGig.flagIcon[0].style.color = '#140000';
        }
      });
    });
  }

  turnOnHover() {
    renderMainGig.flagIcon[0].classList.add('u-is-flag-hovered');
  }
}

export default new RenderFlagged();
