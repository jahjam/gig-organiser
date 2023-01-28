// model
import MonthStorageModel from '../Model/MonthStorageModel';

// controller
import CreateGigController from '../Controller/CreateGigController';
import HelperController from '../Controller/HelperController';

// view
import RenderAddGigForm from './RenderAddGigForm';

class RenderGig {
  constructor() {
    this.formElement = document.querySelector('.edit-window__form');
    this.inputs = document.querySelectorAll('.edit-window__input');
    this.cancelBtn = document.querySelector(
      '.edit-window__form-add-cancel-btn'
    );
  }

  RenderGigHandler() {
    this.formElement.addEventListener('submit', this.ReadFormData.bind(this));
    this.cancelBtn.addEventListener('click', this.CancelAddGig.bind(this));
  }

  ReadFormData(e) {
    e.preventDefault();

    // call controller to handle data to create gig
    CreateGigController.CreateGig(this.inputs);

    // remove the form to display the main view again
    RenderAddGigForm.RejectForm();

    //Rerender gigs based on current tab open in view
    HelperController.RenderResultsBasedOnSelectedView();

    // reset the form to clear the form fields
    this.formElement.reset();
  }

  CancelAddGig() {
    RenderAddGigForm.RejectForm();

    MonthStorageModel.monthToAmend.CancelPrepMonth();
  }
}

export default new RenderGig();
