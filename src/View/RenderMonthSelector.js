class RenderMonthSelector {
  constructor() {
    this.addDatesForm = document.querySelector(
      '.aside-menu__months-form-section'
    );
    this.closeAddDatesForm = document.querySelector('.form-label-icon');
  }

  RenderMonthsSelectorHandler() {
    window.addEventListener('click', this.Render.bind(this));
    this.closeAddDatesForm.addEventListener('click', this.Reject.bind(this));
  }

  Render(e) {
    if (!e.target.closest('.aside-menu__btn-dates')) return;
    this.addDatesForm.classList.remove('u-no-display');
  }

  Reject(e) {
    this.addDatesForm.classList.add('u-no-display');
  }
}

export default new RenderMonthSelector();
