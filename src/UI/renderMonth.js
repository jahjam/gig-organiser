import createMonthModule from '../modules/createMonth';

class RenderMonth {
  addDateBtn = document.querySelector('.aside-menu__months-form-submit');

  handlerRenderMonth() {
    this.addDateBtn.addEventListener(
      'click',
      createMonthModule.createMonth.bind(createMonthModule)
    );
  }
}

export default new RenderMonth();
