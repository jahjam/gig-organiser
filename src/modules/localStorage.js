import createMonth from './createMonth.js';
import renderFlagged from '../UI/renderFlagged.js';
import createGig from './createGig.js';
import monthGen from './month.js';

class LocalStorage {
  gigsByMonthStorage = [];

  updateLocalStorage() {
    // Set storage for gigs
    localStorage.setItem(
      'gigsByMonth',
      JSON.stringify(createMonth.gigsByMonth)
    );

    // Set storage for flagged gig elements
    localStorage.setItem(
      'flaggedGigsEl',
      JSON.stringify(this.flattenNodeEls(renderFlagged.flaggedGigsEl))
    );

    // Set storage for gig indices
    localStorage.setItem('gigIndex', JSON.stringify(createGig.index));
  }

  localStorageInitialise() {
    // Reload Gigs
    this.gigsStorage = localStorage.getItem('gigsByMonth');
    if (this.gigsStorage)
      this.gigsByMonthStorage = JSON.parse(this.gigsStorage);

    // Reload Flags
    this.gigsElStorage = localStorage.getItem('flaggedGigsEl');
    if (this.gigsElStorage)
      renderFlagged.flaggedGigsEl = this.reloadFlaggedGigs(
        JSON.parse(this.gigsElStorage)
      );

    // Reinitialise gig index
    this.gigIndex = localStorage.getItem('gigIndex');
    if (this.gigIndex) createGig.index = +JSON.parse(this.gigIndex);

    this.reloadAsideMenu();
  }

  flattenNodeEls(els) {
    let flatEl = [];

    // Push the outerHTML of the elements into local storage
    els.forEach(el => flatEl.push(el.outerHTML));

    return flatEl;
  }

  reloadFlaggedGigs(els) {
    let rebuiltEl = [];

    // Retrieves the flattened gigs from local storage and builds them back up as DOM elements to keep flagged equality system working
    els.forEach(el => {
      rebuiltEl.push(new DOMParser().parseFromString(el, 'text/html').all[3]);
    });

    return rebuiltEl;
  }

  reloadAsideMenu() {
    let i = 0;

    // Reload the months
    this.gigsByMonthStorage.forEach(monthForMonths => {
      new monthGen(monthForMonths.month);
    });

    // Reload the gigs
    this.gigsByMonthStorage.forEach(monthForGigs =>
      monthForGigs.gig.forEach(gig => {
        if (monthForGigs.gig.length === 0) return;

        // Assign the correct month to variable
        const monthToAmend = createMonth.gigsByMonth.find(
          ({ month }) => month === monthForGigs.month
        );

        // Call the correct month to move to the prepMonth variable in the month
        monthToAmend.prepMonth();

        // Creates the gig within the correct month
        monthToAmend.createGig(
          gig.venue,
          gig.date,
          gig.notes,
          gig.num,
          gig.str,
          gig.city,
          gig.postcode,
          gig.soundCheck,
          gig.stageTime,
          gig.index,
          gig.flagged,
          true
        );
      })
    );

    // When the gigs are finished loading for one month, the index increments to shift to the next month in the gigsByMonth array.
    i++;
  }
}

// localStorage.clear();

export default new LocalStorage();
