import CreateMonthController from '../Controller/CreateMonthController';

class RenderMonth {
  constructor() {
    this.addMonthBtn = document.querySelector(
      '.aside-menu__months-form-submit'
    );
  }

  RenderMonthHandler() {
    this.addMonthBtn.addEventListener(
      'click',
      CreateMonthController.CreateMonth
    );
  }
}

export default new RenderMonth();
