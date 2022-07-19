import createGig from '../modules/createGig';

class RenderGig {
  form = document.querySelector('.edit-section__add');
  formElement = document.querySelector('.edit-window__form');
  inputs = document.querySelectorAll('.edit-window__input');

  handlerAddGigBtns() {
    window.addEventListener('click', this.renderForm.bind(this));
    this.formElement.addEventListener('submit', this.readFormData.bind(this));
  }

  renderForm(e) {
    if (!e.target.closest('.aside-menu__dates-content-item--btn')) return;

    this.form.classList.remove('u-no-display');

    createGig.selectMonthFromArray(e);
  }

  readFormData(e) {
    e.preventDefault();

    this.inputs.forEach(input => {
      createGig.values.push(input.value);
    });

    this.form.classList.add('u-no-display');

    createGig.addFormData();
  }

  formReset() {
    this.formElement.reset();
  }
}

export default new RenderGig();
