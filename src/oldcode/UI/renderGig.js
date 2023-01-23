import createGig from '../modules/createGig.js';
import renderTodaysGigs from './renderTodaysGigs.js';
import renderWeeksGigs from './renderWeeksGigs.js';
import renderMonthsGigs from './renderMonthsGigs.js';
import renderFlaggedGigs from './renderFlaggedGigs.js';
import UIHelpers from './UIHelpers.js';

class RenderGig extends UIHelpers {
  resultsSection = document.querySelector('.results-section');
  form = document.querySelector('.edit-section__add');
  formElement = document.querySelector('.edit-window__form');
  inputs = document.querySelectorAll('.edit-window__input');
  dateInput = document.querySelector('.edit-window__input-date');
  inputArea = document.querySelector('.input-area-add');

  handlerAddGigBtns() {
    window.addEventListener('click', this.renderForm.bind(this));
    this.formElement.addEventListener('submit', this.readFormData.bind(this));
    window.addEventListener('click', this.lockDate.bind(this));
    window.addEventListener('click', this.cancelAddGig.bind(this));
  }

  renderForm(e) {
    if (!e.target.closest('.aside-menu__dates-content-item--btn')) return;

    document.querySelector('.header-main-title__text').textContent = '';

    this.resultsSection.classList.add('u-no-display');
    this.form.classList.remove('u-no-display');

    createGig.selectMonthFromArray(e);
  }

  readFormData(e) {
    e.preventDefault();

    this.inputs.forEach(input => {
      createGig.values.push(input.value);
    });

    createGig.addFormData();

    this.resultsSection.classList.remove('u-no-display');
    this.form.classList.add('u-no-display');

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

  formReset() {
    this.formElement.reset();
  }

  lockDate(e) {
    if (!e.target.closest('.aside-menu__dates-content-item--btn')) return;

    this.lockDateToSelectedMonth(
      this.dateInput,
      e.target.parentElement.previousElementSibling.textContent.trim()
    );
  }

  cancelAddGig(e) {
    if (
      (!e.target.closest('.edit-section__add') &&
        !this.form.classList.contains('u-no-display') &&
        !e.target.closest('.aside-menu__dates-content-item--btn')) ||
      e.target.closest('.edit-window__form-add-cancel-btn')
    ) {
      this.resultsSection.classList.remove('u-no-display');
      this.form.classList.add('u-no-display');
      createGig.month.cancelPrep();

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
}

export default new RenderGig();
