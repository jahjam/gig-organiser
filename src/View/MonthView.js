import RenderGigsInMonth from './RenderGigsInMonth';

class MonthView {
  constructor() {
    this.monthsParentEl = document.querySelector('.aside-menu__content-months');
  }

  MonthHTML(month) {
    return `
    <ul class="${
      month.monthName.toLowerCase() + '-month-box'
    } aside-menu__dates-content">
      <li class="aside-menu__dates-content-items-title">
        <h4 class="aside-menu__dates-content-items-title-text">
        ${month.monthName.toLowerCase()}</h4>
        <ion-icon class='${
          month.monthName.toLowerCase() + '-chevron'
        } icon dates-content-icon' name="chevron-down-outline"></ion-icon>
      </li>
    </ul>
  `;
  }

  GigsHTML(month) {
    return `
    <li class="aside-menu__dates-content-items">
      <button class="aside-menu__dates-content-item--btn">Add gig</button>
    </li> 
    `;
  }

  RenderNewMonth(month) {
    const monthHtml = this.MonthHTML(month, displayState);

    this.monthsParentEl.insertAdjacentHTML('beforeend', monthHtml);

    const monthBox = document.querySelector(
      `.${month.monthName.toLowerCase()}-month-box`
    );

    const showHideMonthBtn = document.querySelector(
      `.${month.monthName.toLowerCase()}-chevron`
    );

    const renderGigsInMonthHandler = () => {
      if (monthBox.childElementCount > 1) {
        monthBox.lastElementChild.remove();
      } else {
        let gigsHtml = this.GigsHTML(month, displayState);
        monthBox.insertAdjacentHTML('beforeend', gigsHtml);
      }
    };

    showHideMonthBtn.addEventListener('click', renderGigsInMonthHandler);
  }
}

export default new MonthView();
