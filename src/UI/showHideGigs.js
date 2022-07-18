class ShowHideGigs {
  handlershowHideGigs() {
    window.addEventListener('click', this.openCloseMonths.bind(this));
  }

  openCloseMonths(e) {
    this.gigs = document.querySelectorAll('.aside-menu__dates-content-items');

    if (!e.target.closest('.dates-content-icon')) return;

    this.gigs.forEach(gig => {
      if (
        gig.parentElement.firstElementChild.firstElementChild.textContent.toLowerCase() ===
        e.target.previousElementSibling.textContent.toLowerCase()
      ) {
        gig.classList.toggle('u-no-display');
      }
    });

    this.switchChevron(e);
  }

  switchChevron(e) {
    e.target.attributes[1].nodeValue === 'chevron-down-outline'
      ? (e.target.attributes[1].nodeValue = 'chevron-up-outline')
      : (e.target.attributes[1].nodeValue = 'chevron-down-outline');
  }
}

export default new ShowHideGigs();
