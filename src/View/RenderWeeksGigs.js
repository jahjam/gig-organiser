// controller
import RenderGigsController from '../Controller/RenderGigsController';

// view
import ViewView from './ViewView';

class RenderWeeksGigs {
  RenderWeeksGigsHandler() {
    window.addEventListener('click', this.RenderWeeksGigsInResults.bind(this));
  }

  RenderWeeksGigsInResults(e) {
    if (!e.target.closest('.next-week-btn')) return;

    ViewView.AddRemoveBtnActive('.next-week-btn', e);

    RenderGigsController.RenderGigsDueThisWeek(e);
  }
}

export default new RenderWeeksGigs();
