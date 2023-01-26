import RenderGigsController from '../Controller/RenderGigsController';

// view
import ViewView from './ViewView';

class RenderTodaysGigs {
  RenderTodaysGigsHandler() {
    window.addEventListener('click', this.RenderTodaysGigsInResults.bind(this));
  }

  RenderTodaysGigsInResults(e) {
    if (!e.target.closest('.today-btn')) return;

    ViewView.AddRemoveBtnActive('.today-btn', e);

    RenderGigsController.RenderGigsDueToday(e);
  }
}

export default new RenderTodaysGigs();
