// model
import CreateMonthController from '../Controller/CreateMonthController';
import HelperController from '../Controller/HelperController';
import MonthStorageModel from '../Model/MonthStorageModel';

class RenderAsideDelete {
  RenderAsideDeleteHandler() {
    window.addEventListener('click', this.RenderAsideDeleteIcons.bind(this));
  }

  RenderAsideDeleteIcons(e) {
    if (!e.target.closest('.aside-menu__btn-bin')) return;

    // Assign dynamically created elements
    this.asideMonths = document.querySelectorAll('.aside-menu__dates-content');
    this.binIcon = document.querySelector('.aside-menu__btn-bin');

    // Prevent delete button being clickable if no months
    if (MonthStorageModel.months_arr.length === 0) return;

    // Add active class to show the user they are in bin mode
    this.binIcon.classList.toggle('u-active-btn-bin');

    this.asideMonths.forEach(month => {
      // Changes the chevron icon to a bin
      month.children[0].children[1].attributes.forEach(att => {
        if (att.nodeName === 'name') att.value = 'trash-outline';
      });

      // Removes the old icon to disable chevron and impliment delete month functionality
      month.children[0].children[1].classList.remove('dates-content-icon');
      month.children[0].children[1].classList.add('dates-content-icon-bin');
      month.children[0].children[1].classList.add('u-shake');

      // Reverts to normal mode
      if (!this.binIcon.classList.contains('u-active-btn-bin')) {
        // Changes the bin icon to a chevron
        month.children[0].children[1].attributes.forEach(att => {
          if (att.nodeName === 'name') att.value = 'chevron-down-outline';
        });

        // Adds the old icon to enable chevron and remove delete month functionality
        month.children[0].children[1].classList.add('dates-content-icon');
        month.children[0].children[1].classList.remove(
          'dates-content-icon-bin'
        );
        month.children[0].children[1].classList.remove('u-shake');
      }
    });
  }

  DeleteAsideItemMonth(month) {
    CreateMonthController.DeleteMonth(month);

    // Removes the correct month from the aside menu
    this.asideMonths.forEach(monthEl => {
      if (monthEl.classList[0].includes(month.monthName.toLowerCase())) {
        monthEl.parentNode.removeChild(monthEl);
      }
    });

    // Turn off delete mode for user safety
    this.binIcon.classList.remove('u-active-btn-bin');

    // When an item is deleted it turns all the other icons back to the chevron
    this.asideMonths.forEach(month => {
      // Changes the bin icon to a chevron
      month.children[0].children[1].attributes.forEach(att => {
        if (att.nodeName === 'name') att.value = 'chevron-down-outline';
      });

      // Adds the old icon to enable chevron and remove delete month functionality
      month.children[0].children[1].classList.add('dates-content-icon');
      month.children[0].children[1].classList.remove('dates-content-icon-bin');
      month.children[0].children[1].classList.remove('u-shake');
    });

    // Rerender gigs based on current tab open in view
    HelperController.RenderResultsBasedOnSelectedView();

    // Update the local storage to log the deletion of month
    // TODO
  }
}

export default new RenderAsideDelete();
