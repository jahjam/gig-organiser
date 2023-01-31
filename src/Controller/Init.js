// controller
import RenderGigsController from './RenderGigsController';

// view
import RenderMonthSelector from '../View/RenderMonthSelector';
import RenderMonth from '../View/RenderMonth';
import RenderGig from '../View/RenderGig';
import RenderTodaysGigs from '../View/RenderTodaysGigs';
import RenderWeeksGigs from '../View/RenderWeeksGigs';
import RenderMonthsGigs from '../View/RenderMonthsGigs';
import RenderFlaggedGigs from '../View/RenderFlaggedGigs';
import RenderDeleteAside from '../View/RenderDeleteAside';

export default class Init {
  static loadUI() {
    // TODO Load items from local storage
    // ...

    RenderGigsController.RenderGigsDueToday();
    Init.initHandlers();
  }

  static initHandlers() {
    // TODO Add all handlers to initialise
    RenderMonthSelector.RenderMonthsSelectorHandler();
    RenderMonth.RenderMonthHandler();
    RenderGig.RenderGigHandler();
    RenderTodaysGigs.RenderTodaysGigsHandler();
    RenderWeeksGigs.RenderWeeksGigsHandler();
    RenderMonthsGigs.RenderMonthsGigsHandler();
    RenderFlaggedGigs.RenderFlaggedGigsHandler();
    RenderDeleteAside.RenderAsideDeleteHandler();
  }
}
