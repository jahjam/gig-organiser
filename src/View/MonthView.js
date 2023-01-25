import RenderAddGigForm from './RenderAddGigForm';

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
    const gigsHtml_arr = month.gigs_arr.map(gig => {
      // TODO write logic to loop through gigs and
      // turn into html
    });

    return `
    <li class="aside-menu__dates-content-items">
      <button class="${
        month.monthName.toLowerCase() + '-add-gig-btn'
      } aside-menu__dates-content-item--btn">Add gig</button>
    </li> 
    `;
  }

  GigHTML(index, venue) {
    return `
    <li class="aside-menu__dates-content-items">
      <span class="aside-menu__dates-content-item" data-index='${index}'>${venue}</span>
      <div class='gig-icon-elipsis-wrap'>
        <ion-icon class='icon gig-icon-elipsis' name="ellipsis-vertical-outline"></ion-icon>
        <div class='gig-icon-elipsis__pop-up u-no-display'>
          <div class='gig-icon-elipsis__pop-up-view'>view</div>
          <div class='gig-icon-elipsis__pop-up-delete'>delete</div>
        </div>
      </div>
    </li> 
  `;
  }

  RenderNewMonth(month) {
    // generate month html
    const monthHtml = this.MonthHTML(month);

    // insert the month html into dom
    this.monthsParentEl.insertAdjacentHTML('beforeend', monthHtml);

    // grab dom elements and store them using closures
    const monthBox = document.querySelector(
      `.${month.monthName.toLowerCase()}-month-box`
    );

    // grab dom elements and store them using closures
    const showHideMonthBtn = document.querySelector(
      `.${month.monthName.toLowerCase()}-chevron`
    );

    let addGigBtn;

    const renderAddGigFormHandler = () => {
      RenderAddGigForm.RenderForm(month);
    };

    // handle clicks on chevron within month box
    const renderGigsInMonthHandler = () => {
      // check to see whether "ADD GIG" button remains in month box
      if (monthBox.childElementCount > 1) {
        monthBox.lastElementChild.remove();
      } else {
        let gigsHtml = this.GigsHTML(month);
        monthBox.insertAdjacentHTML('beforeend', gigsHtml);

        // bind each add gig button to specific month
        addGigBtn = document.querySelector(
          `.${month.monthName.toLowerCase()}-add-gig-btn`
        );

        addGigBtn.addEventListener('click', renderAddGigFormHandler);
      }
      console.log(month);
    };

    showHideMonthBtn.addEventListener('click', renderGigsInMonthHandler);
  }
}

export default new MonthView();
