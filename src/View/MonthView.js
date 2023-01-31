// controller
import HelperController from '../Controller/HelperController';
import LocalStorageController from '../Controller/LocalStorageController';

// view
import RenderAddGigForm from './RenderAddGigForm';
import RenderDeleteAside from './RenderDeleteAside';
import ResultsView from './ResultsView';

class MonthView {
  constructor() {
    this.monthsParentEl = document.querySelector('.aside-menu__content-months');
    this.asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');
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
    const renderGigsInMonthHandler = e => {
      if (e.target.name === 'trash-outline') {
        RenderDeleteAside.DeleteAsideItemMonth(month);

        return;
      }

      const gigsListElement_nodeList = document.querySelectorAll(
        `.${month.monthName.toLowerCase()}-gig-list-el`
      );

      gigsListElement_nodeList.forEach(el =>
        el.classList.toggle('u-no-display')
      );

      e.target.attributes[1].nodeValue === 'chevron-down-outline'
        ? (e.target.attributes[1].nodeValue = 'chevron-up-outline')
        : (e.target.attributes[1].nodeValue = 'chevron-down-outline');
    };

    showHideMonthBtn.addEventListener('click', renderGigsInMonthHandler);
    addGigBtn.addEventListener('click', renderAddGigFormHandler);
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

    const gigElipsisView = document.querySelector(
      `.g${gig.index}-elipsis-view`
    );

    const gigElipsisDelete = document.querySelector(
      `.g${gig.index}-elipsis-delete`
    );

    const showGigOptionsEventHandler = () => {
      gigOptionsView.classList.toggle('u-no-display');
    };

    const gigElipsisViewHandler = () => {
      // Remove active class from view btns as the selected gig to view will be rendered alone
      this.asideMenuViewBtns.forEach(btn =>
        btn.classList.remove('u-active-btn')
      );

      document.querySelector('.header-main-title__text').textContent = '';

      ResultsView.mainTitle.textContent = "today's gigs";

      ResultsView.ClearResults();

      ResultsView.RenderGig(gig, month);
    };

    const gigElipsisDeleteHandler = () => {
      month.gigs_arr.forEach(gig => {
        this.RemoveGigFromAside(gig.index);

        const targetGigIndex = month.gigs_arr.indexOf(gig);
        month.gigs_arr.splice(targetGigIndex, 1);

        HelperController.RenderResultsBasedOnSelectedView();

        LocalStorageController.UpdateLocalStorage();
      });
    };

    gigElipsis.addEventListener('click', showGigOptionsEventHandler);
    gigElipsisView.addEventListener('click', gigElipsisViewHandler);
    gigElipsisDelete.addEventListener('click', gigElipsisDeleteHandler);
  }

  RemoveGigFromAside(gigIndex) {
    // Assign all the current gigs in the aside menu
    this.gigsAside = document.querySelectorAll(
      '.aside-menu__dates-content-items'
    );

    // Loop through gigs and find the one that has the same index as the gig, and apply changes to that one.
    this.gigsAside.forEach(gigAside => {
      if (+gigAside.firstElementChild.dataset.index === gigIndex) {
        gigAside.remove();
      }
    });
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
    } aside-menu__dates-content-items ${gig.fromStorage ? 'u-no-display' : ''}">
      <span class="aside-menu__dates-content-item" data-index='${gig.index}'>${
      gig.venue
    }</span>
     <div class='g${gig.index}-elipsis gig-icon-elipsis-wrap'>
        <ion-icon class='icon gig-icon-elipsis' name="ellipsis-vertical-outline"></ion-icon>
        <div class='g${
          gig.index
        }-options-view gig-icon-elipsis__pop-up u-no-display'>
          <div class='g${
            gig.index
          }-elipsis-view gig-icon-elipsis__pop-up-view'>view</div>
          <div class='g${
            gig.index
          }-elipsis-delete  gig-icon-elipsis__pop-up-delete'>delete</div>
        </div>
     </div>
    </li> 
  `;
  }
}

export default new MonthView();
