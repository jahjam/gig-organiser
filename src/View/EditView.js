// model
import GigEntityModel from '../Model/GigEntityModel';
import MonthStorageModel from '../Model/MonthStorageModel';

// controller
import CreateGigController from '../Controller/CreateGigController';

// view
import MonthView from './MonthView';

class EditView {
  static targetGig = undefined;

  constructor() {
    this.inputs = document.querySelectorAll('.edit-window__input-edit');
    this.editForm = document.querySelector('.edit-section__edit');
    this.formEl = document.querySelector('.edit-window__form-edit');
    this.resultsSection = document.querySelector('.results-section');

    this.formEl.addEventListener('submit', this.CommitEdit.bind(this));
  }

  RenderEditGigForm(month) {
    document.querySelector('.header-main-title__text').textContent = '';

    this.resultsSection.classList.add('u-no-display');
    this.editForm.classList.remove('u-no-display');

    month.PrepMonth();
  }

  RenderGigInForm(gig) {
    let formattedDate;

    EditView.targetGig = Object.values(gig);

    EditView.targetGig.forEach(value => {
      if (value.toString().includes('/')) {
        formattedDate = value.split('/').reverse().join('-');
      }
    });

    for (let i = 0; i < EditView.targetGig.length - 2; i++) {
      if (this.inputs[i].id === 'date') {
        this.inputs[i].value = formattedDate;
      } else {
        this.inputs[i].value = EditView.targetGig[i];
      }
    }
  }

  CommitEdit(e) {
    e.preventDefault();

    const arrayEquals = (a, b) => {
      return a.every((val, index) => val === b[index]);
    };

    MonthStorageModel.monthToAmend.gigs_arr.forEach(gig => {
      if (arrayEquals(Object.values(gig), EditView.targetGig)) {
        const flagged = gig.flagged;
        MonthView.RemoveGigFromAside(gig.index);

        const gigIndex = MonthStorageModel.monthToAmend.gigs_arr.indexOf(gig);
        MonthStorageModel.monthToAmend.gigs_arr.splice(gigIndex, 1);

        CreateGigController.CreateGig(this.inputs, flagged);
      }
    });

    this.CloseFormWhenSubmitted();
  }

  CloseFormWhenSubmitted() {
    this.resultsSection.classList.remove('u-no-display');
    this.editForm.classList.add('u-no-display');

    EditView.targetGig = undefined;
  }
}

export default new EditView();
