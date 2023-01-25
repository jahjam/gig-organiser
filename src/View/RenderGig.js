// controller
import CreateGigController from '../Controller/CreateGigController';

// view
import RenderAddGigForm from './RenderAddGigForm';

class RenderGig {
  constructor() {
    this.formElement = document.querySelector('.edit-window__form');
    this.inputs = document.querySelectorAll('.edit-window__input');
  }

  RenderGigHandler() {
    this.formElement.addEventListener('submit', this.ReadFormData.bind(this));
  }

  ReadFormData(e) {
    e.preventDefault();

    // call controller to handle data to create gig
    CreateGigController.CreateGig(this.inputs);

    // remove the form to display the main view again
    RenderAddGigForm.RejectForm();

    // reset the form to clear the form fields
    this.formElement.reset();
  }
}

export default new RenderGig();
