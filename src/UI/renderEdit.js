import createMonth from '../modules/createMonth.js';
import createGig from '../modules/createGig.js';
import UIHelpers from './UIHelpers.js';
import renderFlagged from './renderFlagged.js';
import renderTodaysGigs from './renderTodaysGigs.js';
import renderWeeksGigs from './renderWeeksGigs.js';
import renderMonthsGigs from './renderMonthsGigs.js';
import renderFlaggedGigs from './renderFlaggedGigs.js';
import localStorage from '../modules/localStorage.js';
import { format } from 'date-fns';

class RenderEdit extends UIHelpers {
  editForm = document.querySelector('.edit-section__edit');
  formEl = document.querySelector('.edit-window__form-edit');
  cancelBtn = document.querySelector('.edit-window__form-edit-cancel-btn');
  inputs = document.querySelectorAll('.edit-window__input-edit');

  targetGig = [];
  editIcon;
  gigElement;

  handlerRenderEdit() {
    window.addEventListener('click', this.renderEditForm.bind(this));
    this.formEl.addEventListener('submit', this.commitEdit.bind(this));
    this.cancelBtn.addEventListener('click', this.closeForm.bind(this));
  }

  renderEditForm(e) {
    if (!e.target.closest('.edit-icon')) return;

    this.editIcon = e.target.closest('.edit-icon');
    this.gigElement = this.editIcon.parentElement.parentElement;

    this.editForm.classList.remove('u-no-display');

    this.getGigInfo(e);
  }

  getGigInfo(e) {
    this.targetGig.push(...this.getGig(e));

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

    this.gigsInAside = document.querySelectorAll(
      '.aside-menu__dates-content-item'
    );

    const editValues = [];
    // let edittedGig;
    // let gigFlagged = false;
    // let currentGigIndex;

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gigItem => {
        // // Delete the current index for the gig
        // edittedGig = gigItem;
        // this.currentGigIndex = gigItem.index;
        // delete edittedGig.index;

        // // Check if gig has ever been flagged and set gigFlagged appropriately
        // if (edittedGig.hasOwnProperty('flagged')) {
        //   if (edittedGig.flagged) {
        //     gigFlagged = true;
        //     delete edittedGig.flagged;
        //   } else {
        //     delete edittedGig.flagged;
        //   }
        // }

        // Extract relevent info from the gig to compere
        const gigExtract = [
          gigItem.venue,
          gigItem.date,
          gigItem.notes,
          gigItem.num,
          gigItem.str,
          gigItem.city,
          gigItem.postcode,
          gigItem.soundCheck,
          gigItem.stageTime,
        ];

        if (this.arrayEquals(gigExtract, this.targetGig)) {
          // Remove the corect gig from the aside
          this.renameGigFromAside(gigItem.index);

          // Remove unwanted gig
          const index = month.gig.indexOf(gigItem);
          month.gig.splice(index, 1);

          // // Add flagged back to gig if it was true before edit
          // if (gigFlagged) {
          //   editValues.push(true);
          //   gigFlagged = false;
          // } else {
          //   // Keep flagged gig as false
          //   editValues.push(false);
          // }
          // Add flagged back
          editValues.push(gigItem.flagged);

          // Render the new editted gig
          createGig.month = month;
          this.inputs.forEach(input => {
            editValues.push(input.value);
          });

          localStorage.updateLocalStorage();
          console.log(createMonth.gigsByMonth);
          return;
        }
      });
      return;
    });

    this.closeFormWhenSubmitted();

    // Create new gig based on new inputs
    createGig.editGig(...editValues);

    // Remove previous gig from flagged gig elements array
    if (renderFlagged.flaggedGigsEl.includes(this.gigElement)) {
      const index = renderFlagged.flaggedGigsEl.indexOf(this.gigElement);
      renderFlagged.flaggedGigsEl.splice(index, 1);
    }

    // Recreate HTML element for new gig
    this.rebuildHTML();

    // // need to create DOM reference
    renderFlagged.flaggedGigsEl.push(this.gigElement);

    // Rerender gigs based on current tab open in view
    if (this.readViewBtns() === 'renderTodaysGigs')
      renderTodaysGigs.renderGigsDueToday();
    if (this.readViewBtns() === 'renderWeeksGigs')
      renderWeeksGigs.renderGigsDueWeek(e);
    if (this.readViewBtns() === 'renderMonthsGigs')
      renderMonthsGigs.renderGigsDueMonth(e);
    if (this.readViewBtns() === 'renderFlaggedGigs')
      renderFlaggedGigs.renderGigsFlagged(e);
  }

  renameGigFromAside(gigIndex) {
    // Assign all the current gigs in the aside menu
    this.gigsAside = document.querySelectorAll(
      '.aside-menu__dates-content-item'
    );

    // Loop through gigs and find the one that has the same index as the gig, and apply changes to that one.
    this.gigsAside.forEach(gigAside => {
      if (+gigAside.dataset.index === gigIndex) {
        this.targetGig.forEach(gigValue => {
          if (gigValue === gigAside.textContent) {
            const i = this.targetGig.indexOf(gigValue);
            gigAside.textContent = this.inputs[i].value;
            gigAside.dataset.index = gigIndex + 2;
          }
        });
      }
    });
  }

  rebuildHTML() {
    let i = 0;

    this.gigElement.children.forEach(child => {
      if (this.inputs[i].id === 'date') {
        child.children[1].textContent = format(
          new Date(this.inputs[i].value.replaceAll('-', '/')),
          'dd/MM/yyyy'
        );
        i++;
      } else if (child.classList.contains('result-card__address')) {
        console.log(child.children[1].children);
        child.children[1].children.textContent = this.inputs[i].value;
        i++;
      } else {
        child.children[1].textContent = this.inputs[i].value;
        i++;
      }
    });
  }

  closeFormWhenSubmitted() {
    this.editForm.classList.add('u-no-display');

    this.targetGig = [];
  }

  closeForm(e) {
    if (!e.target.closest('.edit-window__form-edit-cancel-btn')) return;

    this.editForm.classList.add('u-no-display');

    this.targetGig = [];
  }
}

export default new RenderEdit();
