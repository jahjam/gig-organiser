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
  resultsSection = document.querySelector('.results-section');
  editForm = document.querySelector('.edit-section__edit');
  formEl = document.querySelector('.edit-window__form-edit');
  cancelBtn = document.querySelector('.edit-window__form-edit-cancel-btn');
  inputs = document.querySelectorAll('.edit-window__input-edit');
  dateInput = document.querySelector('.edit-window__input-date-edit');

  targetGig = [];
  editIcon;
  gigElement;

  handlerRenderEdit() {
    window.addEventListener('click', this.renderEditForm.bind(this));
    window.addEventListener('click', this.lockDate.bind(this));
    this.formEl.addEventListener('submit', this.commitEdit.bind(this));
    this.cancelBtn.addEventListener('click', this.closeForm.bind(this));
  }

  renderEditForm(e) {
    if (!e.target.closest('.edit-icon')) return;

    this.editIcon = e.target.closest('.edit-icon');
    this.gigElement = this.editIcon.parentElement.parentElement;

    document.querySelector('.header-main-title__text').textContent = '';

    this.resultsSection.classList.add('u-no-display');
    this.editForm.classList.remove('u-no-display');

    this.getGigInfo(e);
  }

  lockDate(e) {
    if (!e.target.closest('.edit-icon')) return;

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        if (
          this.targetGig.includes(gig.venue) &&
          this.targetGig.includes(gig.date) &&
          this.targetGig.includes(gig.stageTime)
        ) {
          this.lockDateToSelectedMonth(this.dateInput, month.month);
        }
      });
    });
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

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gigItem => {
        // Extract relevent info from the gig to compare
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

          if (gigItem.flagged) {
            this.removeFlaggedGigRef(this.gigElement);

            // Recreate HTML element for new gig
            this.rebuildHTML();

            // Create DOM reference
            createMonth.flaggedGigsEl.push(this.gigElement);
          }

          // Add flagged back
          editValues.push(gigItem.flagged);

          // Render the new editted gig
          createGig.month = month;
          this.inputs.forEach(input => {
            editValues.push(input.value);
          });

          localStorage.updateLocalStorage();
        }
      });
    });

    this.closeFormWhenSubmitted();

    // Create new gig based on new inputs
    createGig.editGig(...editValues);

    // Rerender gigs based on current tab open in view
    if (this.readViewBtns() === 'renderTodaysGigs') {
      renderTodaysGigs.renderGigsDueToday();
    } else if (this.readViewBtns() === 'renderWeeksGigs') {
      renderWeeksGigs.renderGigsDueWeek();
    } else if (this.readViewBtns() === 'renderMonthsGigs') {
      renderMonthsGigs.renderGigsDueMonth();
    } else if (this.readViewBtns() === 'renderFlaggedGigs') {
      renderFlaggedGigs.renderGigsFlagged();
    }
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
            gigAside.dataset.index = gigIndex + this.gigsAside.length;
          }
        });
      }
    });
  }

  rebuildHTML() {
    let i = 0;

    this.gigElement.children.forEach(child => {
      if (this.inputs[i]?.id === 'date') {
        child.children[1].textContent = format(
          new Date(this.inputs[i].value.replaceAll('-', '/')),
          'dd/MM/yyyy'
        );
        i++;
      } else if (child.classList.contains('result-card__address')) {
        child.children[1].children.forEach(child => {
          child.textContent = this.inputs[i].value;
          i++;
        });
      } else {
        child.children[1].textContent = this.inputs[i]?.value;
        i++;
      }
    });
  }

  closeFormWhenSubmitted() {
    this.resultsSection.classList.remove('u-no-display');
    this.editForm.classList.add('u-no-display');

    this.targetGig = [];
  }

  closeForm(e) {
    if (!e.target.closest('.edit-window__form-edit-cancel-btn')) return;

    this.resultsSection.classList.remove('u-no-display');
    this.editForm.classList.add('u-no-display');

    this.targetGig = [];

    // Rerender gigs based on current tab open in view
    if (this.readViewBtns() === 'renderTodaysGigs') {
      renderTodaysGigs.renderGigsDueToday();
    } else if (this.readViewBtns() === 'renderWeeksGigs') {
      renderWeeksGigs.renderGigsDueWeek(e);
    } else if (this.readViewBtns() === 'renderMonthsGigs') {
      renderMonthsGigs.renderGigsDueMonth(e);
    } else if (this.readViewBtns() === 'renderFlaggedGigs') {
      renderFlaggedGigs.renderGigsFlagged(e);
    }
  }
}

export default new RenderEdit();
