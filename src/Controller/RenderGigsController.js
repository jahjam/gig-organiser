//model
import MonthStorageModel from '../Model/MonthStorageModel';

// controller
import GigsController from './GigsController';

// view
import ResultsView from '../View/ResultsView';

class RenderGigsController {
  RenderGigsDueToday() {
    GigsController.mainTitle.textContent = "today's gigs";

    ResultsView.ClearResults();

    // TODO sort data

    if (MonthStorageModel.months_arr.length === 0) {
      ResultsView.resultsEl.innerHTML = `
      <h2 class="notice">No gigs today</h2>
      `;
    }

    MonthStorageModel.months_arr.forEach(month =>
      month.gigs_arr.forEach(gig => {
        if (MonthStorageModel.todaysDate === gig.date) {
          GigsController.RenderGig(gig);
        }
      })
    );

    ResultsView.IsContainerEmpty('<h2 class="notice">No gigs today</h2>');
  }
}

export default new RenderGigsController();
