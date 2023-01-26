import RenderAddGigForm from './RenderAddGigForm';

class MonthView {
  constructor() {
    this.monthsParentEl = document.querySelector('.aside-menu__content-months');
  }

  RenderNewMonth(month) {
    // generate month html
    const monthHtml = this.MonthHTML(month);

    // insert the month html into dom
    this.monthsParentEl.insertAdjacentHTML('beforeend', monthHtml);

    // grab dom elements
    const showHideMonthBtn = document.querySelector(
      `.${month.monthName.toLowerCase()}-chevron`
    );
    const addGigBtn = document.querySelector(
      `.${month.monthName.toLowerCase()}-add-gig-btn`
    );
    const renderAddGigFormHandler = () => {
      RenderAddGigForm.RenderForm(month);
    };

    // handle clicks on chevron within month box
    const renderGigsInMonthHandler = () => {
      const gigsListElement_nodeList = document.querySelectorAll(
        `.${month.monthName.toLowerCase()}-gig-list-el`
      );

      gigsListElement_nodeList.forEach(el =>
        el.classList.toggle('u-no-display')
      );
    };

    showHideMonthBtn.addEventListener('click', renderGigsInMonthHandler);
    addGigBtn.addEventListener('click', renderAddGigFormHandler);
  }

  UpdateGigs(month) {
    if (month.gigs_arr.length === 0) return;

    month.gigs_arr.forEach(gig => {
      const gigEl_arr = [
        ...document.querySelectorAll(`.aside-menu__dates-content-item`),
      ];

      const gigEl = gigEl_arr.find(el => +el.dataset.index === gig.index);

      if (gigEl) return;

      this.RenderGigInMonth(gig, month);
    });
  }

  RenderGigInMonth(gig, month) {
    const gigHtml = this.GigHTML(gig, month);

    const gigsListElement = document.querySelector(
      `.${month.monthName.toLowerCase()}-month-box`
    );

    gigsListElement.insertAdjacentHTML('beforeend', gigHtml);

    const gigElipsis = document.querySelector(`.g${gig.index}-elipsis`);

    const gigOptionsView = document.querySelector(
      `.g${gig.index}-options-view`
    );

    const showGigOptionsEventHandler = () => {
      // TODO handle gig in month options

      gigOptionsView.classList.toggle('u-no-display');
    };

    gigElipsis.addEventListener('click', showGigOptionsEventHandler);
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
      <li class="${
        month.monthName.toLowerCase() + '-gig-list-el'
      } aside-menu__dates-content-items u-no-display">
        <button class="${
          month.monthName.toLowerCase() + '-add-gig-btn'
        } aside-menu__dates-content-item--btn">Add gig</button>
      </li> 
    </ul>
  `;
  }

  GigHTML(gig, month) {
    return `
    <li class="${
      month.monthName.toLowerCase() + '-gig-list-el'
    } aside-menu__dates-content-items">
      <span class="aside-menu__dates-content-item" data-index='${gig.index}'>${
      gig.venue
    }</span>
     <div class='g${gig.index}-elipsis gig-icon-elipsis-wrap'>
        <ion-icon class='icon gig-icon-elipsis' name="ellipsis-vertical-outline"></ion-icon>
        <div class='g${
          gig.index
        }-options-view gig-icon-elipsis__pop-up u-no-display'>
          <div class='gig-icon-elipsis__pop-up-view'>view</div>
          <div class='gig-icon-elipsis__pop-up-delete'>delete</div>
        </div>
     </div>
    </li> 
  `;
  }
}

export default new MonthView();
