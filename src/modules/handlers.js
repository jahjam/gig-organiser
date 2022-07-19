import createMonth from './createMonth.js';
import renderMonthSelector from '../UI/renderMonthSelector.js';
import showHideGigs from '../UI/showHideGigs.js';
import renderGig from '../UI/renderGig.js';
import renderTodaysGigs from '../UI/renderTodaysGigs.js';
import renderWeeksGigs from '../UI/renderWeeksGigs.js';
import renderMonthsGigs from '../UI/renderMonthsGigs.js';
import renderFlaggedGigs from '../UI/renderFlaggedGigs.js';
import renderFlagged from '../UI/renderFlagged.js';

export default class Handlers {
  static loadUI() {
    renderTodaysGigs.renderGigsDueToday();
    Handlers.callHandlers();
  }

  static callHandlers() {
    createMonth.handler();
    renderMonthSelector.handlerMonthsEvents();
    showHideGigs.handlershowHideGigs();
    renderGig.handlerAddGigBtns();
    renderTodaysGigs.handlerTodayViewBtn();
    renderWeeksGigs.handlerWeeksViewBtn();
    renderMonthsGigs.handlerMonthsViewBtn();
    renderFlaggedGigs.handlerFlaggedViewBtn();
    renderFlagged.handlerFlaggedGig();
  }
}
