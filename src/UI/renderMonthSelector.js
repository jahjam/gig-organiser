class RenderMonthSelector {
  constructor() {
    this.form = document.querySelector('.aside-menu__months-form-section');
    this.closeForm = document.querySelector('.form-label-icon');
  }

  handlerMonthsEvents() {
    window.addEventListener('click', this.renderSelector.bind(this));
    this.closeForm.addEventListener('click', this.closeSelector.bind(this));
  }

  renderSelector(e) {
    if (!e.target.closest('.aside-menu__btn-dates')) return;
    this.form.classList.remove('u-no-display');
  }

  closeSelector() {
    this.form.classList.add('u-no-display');
  }
}

export default new RenderMonthSelector();
