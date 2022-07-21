import createMonth from '../modules/createMonth.js';
import createGig from '../modules/createGig.js';
import UIHelpers from './UIHelpers.js';

class RenderEdit extends UIHelpers {
  editForm = document.querySelector('.edit-section__edit');
  formEl = document.querySelector('.edit-window__form-edit');
  cancelBtn = document.querySelector('.edit-window__form-edit-cancel-btn');
  inputs = document.querySelectorAll('.edit-window__input-edit');

  targetGig = [];

  handlerRenderEdit() {
    window.addEventListener('click', this.renderEditForm.bind(this));
    this.formEl.addEventListener('submit', this.commitEdit.bind(this));
    this.cancelBtn.addEventListener('click', this.closeForm.bind(this));
  }

  renderEditForm(e) {
    if (!e.target.closest('.edit-icon')) return;

    this.editForm.classList.remove('u-no-display');

    this.getGig(e);
  }

  getGig(e) {
    e.target.parentElement.parentElement.children.forEach(child => {
      if (child.children[1].classList.contains('icon')) return;

      if (child.children[1].children.length === 0) {
        this.targetGig.push(child.children[1].textContent.trim());
      }

      if (child.children[1].children.length > 0) {
        child.children[1].children.forEach(child => {
          this.targetGig.push(child.textContent.trim());
        });
      }
    });

    this.renderGigInEditForm();
  }

  renderGigInEditForm() {
    let i = 0;
    let formattedDate;

    this.targetGig.forEach(value => {
      if (value.includes('/')) {
        formattedDate = value.split('/').reverse().join('-');
      }
    });

    this.inputs.forEach(input => {
      if (input.id === 'date') {
        input.value = formattedDate;
        i++;
      } else {
        input.value = this.targetGig[i];
        i++;
      }
    });
  }

  commitEdit(e) {
    e.preventDefault();

    const editValues = [];

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gigItem => {
        if (gigItem.hasOwnProperty('flagged')) {
          delete gigItem.flagged;
        }

        if (this.arrayEquals(Object.values(gigItem), this.targetGig)) {
          // Remove unwanted gig
          const index = month.gig.indexOf(gigItem);
          month.gig.splice(index, 1);
          console.log(month.gig);

          // Render the new editted gig
          createGig.month = month;
          this.inputs.forEach(input => {
            editValues.push(input.value);
          });
          return;
        }
      });
      return;
    });

    this.closeFormWhenSubmitted();

    createGig.editGig(...editValues);
  }

  closeFormWhenSubmitted() {
    this.editForm.classList.add('u-no-display');
  }

  closeForm(e) {
    if (!e.target.closest('.edit-window__form-edit-cancel-btn')) return;

    this.editForm.classList.add('u-no-display');
  }
}

export default new RenderEdit();
