import RenderMonthSelector from '../View/RenderMonthSelector';
import RenderMonth from '../View/RenderMonth';
import RenderGig from '../View/RenderGig';

export default class Init {
  static loadUI() {
    // TODO Load items from local storage
    // ...

    Init.initHandlers();
  }

  static initHandlers() {
    // TODO Add all handlers to initialise
    RenderMonthSelector.RenderMonthsSelectorHandler();
    RenderMonth.RenderMonthHandler();
    RenderGig.RenderGigHandler();
  }
}
