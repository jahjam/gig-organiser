class RenderMonthAndGigs {
  monthsParentEl = document.querySelector('.aside-menu__content-months');

  renderNewMonth(month) {
    const html = `
      <ul class="aside-menu__dates-content">
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
  }

  renderGig(venue, month, index, fromStorage) {
    const html = `
    <li class="aside-menu__dates-content-items ${
      fromStorage ? 'u-no-display' : ''
    }">
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

    this.monthParentEl.forEach(monthDisplayed => {
      if (
        month.toLowerCase() ===
        monthDisplayed.firstElementChild.firstElementChild.textContent.toLowerCase()
      )
        monthDisplayed.insertAdjacentHTML('beforeend', html);
    });
  }
}

export default new RenderMonthAndGigs();
