// controller
import RenderGigsController from './RenderGigsController';
import LocalStorageController from './LocalStorageController';

// view
import RenderMonthSelector from '../View/RenderMonthSelector';
import RenderMonth from '../View/RenderMonth';
import RenderGig from '../View/RenderGig';
import RenderTodaysGigs from '../View/RenderTodaysGigs';
import RenderWeeksGigs from '../View/RenderWeeksGigs';
import RenderMonthsGigs from '../View/RenderMonthsGigs';
import RenderFlaggedGigs from '../View/RenderFlaggedGigs';
import RenderDeleteAside from '../View/RenderDeleteAside';
import RenderMobileNav from '../View/RenderMobileNav';

export default class Init {
  static loadUI() {
    LocalStorageController.LocalStorageInitialise();

    RenderGigsController.RenderGigsDueToday();

    Init.initHandlers();
  }

  static initHandlers() {
    RenderMonthSelector.RenderMonthsSelectorHandler();
    RenderMonth.RenderMonthHandler();
    RenderGig.RenderGigHandler();
    RenderTodaysGigs.RenderTodaysGigsHandler();
    RenderWeeksGigs.RenderWeeksGigsHandler();
    RenderMonthsGigs.RenderMonthsGigsHandler();
    RenderFlaggedGigs.RenderFlaggedGigsHandler();
    RenderDeleteAside.RenderAsideDeleteHandler();
    RenderMobileNav.RenderMobileNavHandler();
  }
}
