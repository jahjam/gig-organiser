import RenderMonthSelector from '../View/RenderMonthSelector';
import RenderMonth from '../View/RenderMonth';

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
  }
}
