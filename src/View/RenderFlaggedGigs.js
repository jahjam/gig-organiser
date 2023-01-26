// controller
import RenderGigsController from '../Controller/RenderGigsController';

// view
import ViewView from './ViewView';

class RenderFlaggedGigs {
  RenderFlaggedGigsHandler() {
    window.addEventListener(
      'click',
      this.RenderFlaggedGigsInResults.bind(this)
    );
  }

  RenderFlaggedGigsInResults(e) {
    if (!e.target.closest('.flagged-btn')) return;

    ViewView.AddRemoveBtnActive('.flagged-btn', e);

    RenderGigsController.RenderGigsFlagged(e);
  }
}

export default new RenderFlaggedGigs();
