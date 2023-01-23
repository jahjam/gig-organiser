class MonthView {
  static monthViewCounter = 0;

  constructor() {
    this.monthsParentEl = document.querySelector('.aside-menu__content-months');
  }

  renderNewMonth(month) {
    const html = `
      <ul class="${
        month.toLowerCase() + MonthView.monthViewCounter
      } aside-menu__dates-content">
        <li class="aside-menu__dates-content-items-title">
          <h4 class="aside-menu__dates-content-items-title-text">${month}</h4> <ion-icon class='icon dates-content-icon' name="chevron-down-outline"></ion-icon>
        </li>
        <li class="aside-menu__dates-content-items u-no-display">
          <button class="aside-menu__dates-content-item--btn">Add gig</button>
        </li> 
      </ul>
    `;

    this.monthsParentEl.insertAdjacentHTML('beforeend', html);
    this.monthParentEl = document.querySelectorAll(
      '.aside-menu__dates-content'
    );

    MonthView.monthViewCounter++;
  }
}

export default new MonthView();
