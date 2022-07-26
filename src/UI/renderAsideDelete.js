import UIHelpers from './UIHelpers.js';
import createMonth from '../modules/createMonth.js';
import localStorage from '../modules/localStorage.js';
import renderTodaysGigs from './renderTodaysGigs.js';
import renderWeeksGigs from './renderWeeksGigs.js';
import renderMonthsGigs from './renderMonthsGigs.js';
import renderFlaggedGigs from './renderFlaggedGigs.js';

class RenderAsideDelete extends UIHelpers {
  asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');

  handlerRenderAsideDelete() {
    window.addEventListener('click', this.renderAsideDeleteIcons.bind(this));
    window.addEventListener('click', this.deleteAsideItemMonth.bind(this));
    window.addEventListener('click', this.renderAsideItemMenu.bind(this));
    window.addEventListener('click', this.deleteAsideItemGig.bind(this));
    window.addEventListener('click', this.viewAsideItemGig.bind(this));
  }

  renderAsideDeleteIcons(e) {
    if (!e.target.closest('.aside-menu__btn-bin')) return;

    this.asideMonths = document.querySelectorAll('.aside-menu__dates-content');
    this.binIcon = document.querySelector('.aside-menu__btn-bin');

    this.asideMonths.forEach(month => {
      // Changes the chevron icon to a bin
      month.children[0].children[1].attributes.forEach(att => {
        if (att.nodeName === 'name') att.value = 'trash-outline';
      });

      // Add active class to show the user they are in bin mode
      this.binIcon.classList.toggle('u-active-btn-bin');

      // Removes the old icon to disable chevron and impliment delete month functionality
      month.children[0].children[1].classList.remove('dates-content-icon');
      month.children[0].children[1].classList.add('dates-content-icon-bin');

      // Reverts to normal mode
      if (!this.binIcon.classList.contains('u-active-btn-bin')) {
        month.children[0].children[1].attributes.forEach(att => {
          if (att.nodeName === 'name') att.value = 'chevron-down-outline';
        });

        month.children[0].children[1].classList.add('dates-content-icon');
        month.children[0].children[1].classList.remove(
          'dates-content-icon-bin'
        );
      }
    });
  }

  deleteAsideItemMonth(e) {
    if (!e.target.closest('.dates-content-icon-bin')) return;

    createMonth.gigsByMonth.forEach(month => {
      if (month.month === e.target.parentElement.children[0].textContent) {
        // Finds index of correct month and removes it
        const index = createMonth.gigsByMonth.indexOf(month);
        createMonth.gigsByMonth.splice(index, 1);

        // Removes the correct month from the aside menu
        this.asideMonths.forEach(month => {
          if (
            month.children[0].children[0].textContent ===
            e.target.parentElement.children[0].textContent
          ) {
            month.parentNode.removeChild(month);
          }
        });

        // Turn off delete mode for user safety
        this.binIcon.classList.remove('u-active-btn-bin');

        // Update the local storage to log the deletion of month
        localStorage.updateLocalStorage();
      }
    });
  }

  renderAsideItemMenu(e) {
    // Close edit and delete view for each gig if clicked anywhere that isn't the icon to open it
    document.querySelectorAll('.gig-icon-elipsis').forEach(icon => {
      icon.nextElementSibling.classList.add('u-no-display');
    });

    if (!e.target.closest('.gig-icon-elipsis')) return;

    // Show the edit and delete view for each gig
    e.target.nextElementSibling.classList.toggle('u-no-display');
  }

  deleteAsideItemGig(e) {
    if (!e.target.closest('.gig-icon-elipsis__pop-up-delete')) return;

    this.gigsInAside = document.querySelectorAll(
      '.aside-menu__dates-content-item'
    );

    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        // Check the gig index maches the gig in the asides data attribute and removes that gig from both the aside and the array
        if (
          gig.index ===
          +e.target.parentElement.parentElement.previousElementSibling.dataset
            .index
        ) {
          const index = month.gig.indexOf(gig);
          month.gig.splice(index, 1);

          this.gigsInAside.forEach(gigAside => {
            console.log(gigAside.parentElement.parentElement);
            if (+gigAside.dataset.index === gig.index) {
              gigAside.parentElement.parentElement.removeChild(
                gigAside.parentElement
              );
            }
          });
        }
      });
    });

    // Rerender gigs based on current tab open in view
    if (this.readViewBtns() === 'renderTodaysGigs')
      renderTodaysGigs.renderGigsDueToday();
    if (this.readViewBtns() === 'renderWeeksGigs')
      renderWeeksGigs.renderGigsDueWeek(e);
    if (this.readViewBtns() === 'renderMonthsGigs')
      renderMonthsGigs.renderGigsDueMonth(e);
    if (this.readViewBtns() === 'renderFlaggedGigs')
      renderFlaggedGigs.renderGigsFlagged(e);

    // Update local storage
    localStorage.updateLocalStorage();
  }

  viewAsideItemGig(e) {
    if (!e.target.closest('.gig-icon-elipsis__pop-up-view')) return;

    //Logic to show the selected gig in the results view
    createMonth.gigsByMonth.forEach(month => {
      month.gig.forEach(gig => {
        // Check the gig index maches the gig in the asides data attribute
        if (
          gig.index ===
          +e.target.parentElement.parentElement.previousElementSibling.dataset
            .index
        ) {
          // Remove active class from view btns as the selected gig to view will be rendered alone
          this.asideMenuViewBtns.forEach(btn =>
            btn.classList.remove('u-active-btn')
          );

          // Clear the result view
          this.clearResults();

          // Render the selected gig information in the result view
          renderTodaysGigs.renderGigs(
            gig.venue,
            gig.date,
            gig.notes,
            gig.num,
            gig.str,
            gig.city,
            gig.postcode,
            gig.soundCheck,
            gig.stageTime
          );
        }
      });
    });
  }
}

export default new RenderAsideDelete();
