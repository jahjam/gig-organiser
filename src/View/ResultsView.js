class ResultsView {
  constructor() {
    this.resultsEl = document.querySelector('.results-section');
    this.mainTitle = document.querySelector('.header-main-title__text');
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

  RenderGig(gig) {
    const html = this.GigHTML(gig);

    this.resultsEl.insertAdjacentHTML('beforeend', html);

    const gigFlagIcon = document.querySelector(`.g${gig.index}-flag-icon`);

    const flagClickHandler = e => {
      gig.flagged = true;
      e.target.style.color = '#eeba0b';
    };

    gigFlagIcon.addEventListener('click', flagClickHandler);
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
        <ion-icon class='icon edit-icon' name="create-outline"></ion-icon>
        <ion-icon class='icon delete-icon' name="trash-outline"></ion-icon>
      </div>
    </div>
  `;
  }
}

export default new ResultsView();
