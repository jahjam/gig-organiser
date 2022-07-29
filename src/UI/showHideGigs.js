class ShowHideGigs {
  handlershowHideGigs() {
    window.addEventListener('click', this.openCloseMonths.bind(this));
  }

  openCloseMonths(e) {
    this.gigs = document.querySelectorAll('.aside-menu__dates-content-items');
    this.binSelector = document.querySelector('.aside-menu__btn-bin');
    this.chevron = document.querySelector('.dates-content-icon');

    if (!e.target.closest('.aside-menu__dates-content-items-title')) return;

    if (this.binSelector.classList.contains('u-active-btn-bin')) return;

    this.gigs.forEach(gig => {
      if (
        gig.parentElement.firstElementChild.firstElementChild.textContent.toLowerCase() ===
        this.chevron.previousElementSibling.textContent.toLowerCase()
      ) {
        gig.classList.toggle('u-no-display');
      }
    });

    this.switchChevron(e);
  }

  switchChevron(e) {
    this.chevron.attributes[1].nodeValue === 'chevron-down-outline'
      ? (this.chevron.attributes[1].nodeValue = 'chevron-up-outline')
      : (this.chevron.attributes[1].nodeValue = 'chevron-down-outline');
  }
}

export default new ShowHideGigs();
