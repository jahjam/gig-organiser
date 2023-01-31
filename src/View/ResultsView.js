// controller
import HelperController from '../Controller/HelperController';
import LocalStorageController from '../Controller/LocalStorageController';

// view
import MonthView from './MonthView';
import EditView from './EditView';

class ResultsView {
  constructor() {
    this.resultsEl = document.querySelector('.results-section');
    this.mainTitle = document.querySelector('.header-main-title__text');
  }

  RenderGig(gig, month) {
    const html = this.GigHTML(gig);

    this.resultsEl.insertAdjacentHTML('beforeend', html);

    const gigFlagIcon = document.querySelector(`.g${gig.index}-flag-icon`);
    const gigEditIcon = document.querySelector(`.g${gig.index}-edit-icon`);
    const gigDeleteIcon = document.querySelector(`.g${gig.index}-delete-icon`);

    if (gig.flagged) gigFlagIcon.style.color = '#eeba0b';

    const flagClickHandler = e => {
      gig.flagged = !gig.flagged;
      if (gig.flagged) {
        e.target.style.color = '#eeba0b';
      } else {
        e.target.style.color = '#140000';
      }

      LocalStorageController.UpdateLocalStorage();
    };

    const editClickHandler = () => {
      // add edit gig to render correct form
      // (there's two different forms for adding and editing gigs)
      EditView.RenderEditGigForm(month);

      // TODO Lock date to the month

      EditView.RenderGigInForm(gig);
    };

    const deleteClickHandler = () => {
      // TODO render warning message before deletion

      month.gigs_arr.forEach(gig => {
        MonthView.RemoveGigFromAside(gig.index);

        const targetGigIndex = month.gigs_arr.indexOf(gig);
        month.gigs_arr.splice(targetGigIndex, 1);

        HelperController.RenderResultsBasedOnSelectedView();
      });

      LocalStorageController.UpdateLocalStorage();
    };

    gigFlagIcon.addEventListener('click', flagClickHandler);
    gigEditIcon.addEventListener('click', editClickHandler);
    gigDeleteIcon.addEventListener('click', deleteClickHandler);
  }

  ClearResults() {
    this.resultsEl.innerHTML = '';
  }

  IsViewEmpty(DOMEl) {
    if (this.resultsEl.innerHTML === '') {
      this.resultsEl.innerHTML = `
      ${DOMEl}
      `;
    }
  }

  GigHTML(gig) {
    return `
    <div class="result-card">
      <div class="result-card__venue">
        <span class="result-card__venue-title">Venue:</span>
        <span class="result-card__venue-venue">${gig.venue}</span>
      </div>
      <div class="result-card__date">
        <span class="result-card__date-title">Date:</span>
        <span class="result-card__date-date">${gig.date}</span>
      </div>
      <div class="result-card__info">
        <span class="result-card__info-title">Notes:</span>
        <p class="result-card__info-notes">${gig.notes}</p>
      </div>
      <div class="result-card__address">
        <span class="result-card__address-title">Address:</span>
        <ul class="result-card__address-format">
          <li class="result-card__address-format-num">${gig.num}</li>
          <li class="result-card__address-format-street">${gig.street}</li>
          <li class="result-card__address-format-city">${gig.city}</li>
          <li class="result-card__address-format-postcode">${gig.postcode}</li>
        </ul>
      </div>
      <div class="result-card__sound-check">
        <span class="result-card__sound-check-title">Soundcheck:</span>
        <span class="result-card__sound-check-time">${gig.soundCheck}</span>
      </div>
      <div class="result-card__stage-time">
        <span class="result-card__stage-time-title">Stage time:</span>
        <span class="result-card__stage-time-time">${gig.stageTime}</span>
      </div>
      <div class="result-card__icon">
        <ion-icon class='g${gig.index}-flag-icon icon flag-icon' name="flag-outline"></ion-icon>         
        <ion-icon class='g${gig.index}-edit-icon icon edit-icon' name="create-outline"></ion-icon>
        <ion-icon class='g${gig.index}-delete-icon icon delete-icon' name="trash-outline"></ion-icon>
      </div>
    </div>
  `;
  }
}

export default new ResultsView();
