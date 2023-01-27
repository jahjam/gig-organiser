// model
import GigEntityModel from '../Model/GigEntityModel';

// controller
import CreateGigController from '../Controller/CreateGigController';
import HelperController from '../Controller/HelperController';

class EditView {
  constructor() {
    this.inputs = document.querySelectorAll('.edit-window__input-edit');
    this.editForm = document.querySelector('.edit-section__edit');
    this.formEl = document.querySelector('.edit-window__form-edit');
    this.resultsSection = document.querySelector('.results-section');
    this.dateInput = document.querySelector('.edit-window__input-date-edit');

    this.formEl.addEventListener('submit', this.CommitEdit.bind(this));
  }

  RenderEditGigForm(month) {
    document.querySelector('.header-main-title__text').textContent = '';

    HelperController.LockDateToSelectedMonth(this.dateInput, month);

    this.resultsSection.classList.add('u-no-display');
    this.editForm.classList.remove('u-no-display');

    month.PrepMonth();
  }

  RenderGigInForm(gig) {
    let formattedDate;

    GigEntityModel.targetGig = Object.values(gig);

    GigEntityModel.targetGig.forEach(value => {
      if (value.toString().includes('/')) {
        formattedDate = value.split('/').reverse().join('-');
      }
    });

    for (let i = 0; i < GigEntityModel.targetGig.length - 2; i++) {
      if (this.inputs[i].id === 'date') {
        this.inputs[i].value = formattedDate;
      } else {
        this.inputs[i].value = GigEntityModel.targetGig[i];
      }
    }
  }

  CommitEdit(e) {
    e.preventDefault();

    CreateGigController.ReplaceGig(this.inputs);

    this.CloseFormWhenSubmitted();
  }

  CloseFormWhenSubmitted() {
    this.resultsSection.classList.remove('u-no-display');
    this.editForm.classList.add('u-no-display');
  }
}

export default new EditView();
