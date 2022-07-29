import createMonth from '../modules/createMonth.js';
import UIHelpers from './UIHelpers.js';
import { intervalToDuration, isAfter } from 'date-fns';

export default class RenderMainGigs extends UIHelpers {
  asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');
  mainTitle = document.querySelector('.header-main-title__text');

  addRemoveBtnActive(el, event) {
    this.asideMenuViewBtns.forEach(btn => btn.classList.remove('u-active-btn'));

    if (!event.target.closest(el).classList.contains('u-active-btn'))
      event.target.closest(el).classList.add('u-active-btn');
  }

  filterWeekMonth(gig, type) {
    this.gigYear = +gig.date.split('/')[2];
    this.gigMonth = +gig.date.split('/')[1];
    this.gigDay = +gig.date.split('/')[0];
    this.todayYear = +createMonth.todaysDate.split('/')[2];
    this.todayMonth = +createMonth.todaysDate.split('/')[1];
    this.todayDay = +createMonth.todaysDate.split('/')[0];

    const numDays = intervalToDuration({
      start: new Date(this.todayYear, this.todayMonth, this.todayDay),
      end: new Date(this.gigYear, this.gigMonth, this.gigDay),
    }).days;

    const numMonths = intervalToDuration({
      start: new Date(this.todayYear, this.todayMonth, this.todayDay),
      end: new Date(this.gigYear, this.gigMonth, this.gigDay),
    }).months;

    const isDateAfter = isAfter(
      new Date(this.gigYear, this.gigMonth, this.gigDay),
      new Date(this.todayYear, this.todayMonth, this.todayDay)
    );

    if (type === 'week') {
      if (isDateAfter && numDays <= 7 && numMonths === 0) {
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
    }

    if (type === 'month') {
      if (isDateAfter && numMonths <= 1) {
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
    }
  }

  renderGigs(
    venue,
    date,
    notes,
    num,
    str,
    city,
    postcode,
    soundCheck,
    stageTime
  ) {
    const html = `
      <div class="result-card">
        <div class="result-card__venue">
          <span class="result-card__venue-title">Venue:</span>
          <span class="result-card__venue-venue">${venue}</span>
        </div>
        <div class="result-card__date">
          <span class="result-card__date-title">Date:</span>
          <span class="result-card__date-date">${date}</span>
        </div>
        <div class="result-card__info">
          <span class="result-card__info-title">Notes:</span>
          <p class="result-card__info-notes">${notes}</p>
        </div>
        <div class="result-card__address">
          <span class="result-card__address-title">Address:</span>
          <ul class="result-card__address-format">
            <li class="result-card__address-format-num">${num}</li>
            <li class="result-card__address-format-street">${str}</li>
            <li class="result-card__address-format-city">${city}</li>
            <li class="result-card__address-format-postcode">${postcode}</li>
          </ul>
        </div>
        <div class="result-card__sound-check">
          <span class="result-card__sound-check-title">Soundcheck:</span>
          <span class="result-card__sound-check-time">${soundCheck}</span>
        </div>
        <div class="result-card__stage-time">
          <span class="result-card__stage-time-title">Stage time:</span>
          <span class="result-card__stage-time-time">${stageTime}</span>
        </div>
        <div class="result-card__icon">
          <ion-icon class='icon flag-icon' name="flag-outline"></ion-icon>         
          <ion-icon class='icon edit-icon' name="create-outline"></ion-icon>
          <ion-icon class='icon delete-icon' name="trash-outline"></ion-icon>
        </div>
      </div>
    `;

    this.resultsEl.insertAdjacentHTML('beforeend', html);
  }
}
