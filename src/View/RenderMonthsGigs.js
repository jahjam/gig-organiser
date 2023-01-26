// controller
import RenderGigsController from '../Controller/RenderGigsController';

// view
import ViewView from './ViewView';

class RenderMonthsGigs {
  RenderMonthsGigsHandler() {
    window.addEventListener('click', this.RenderMonthsGigsInResults.bind(this));
  }

  RenderMonthsGigsInResults(e) {
    if (!e.target.closest('.month-btn')) return;

    ViewView.AddRemoveBtnActive('.month-btn', e);

    RenderGigsController.RenderGigsDueThisMonth(e);
  }
}

export default new RenderMonthsGigs();
