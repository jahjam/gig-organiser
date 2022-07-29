import localStorage from './localStorage.js';
import renderMonthSelector from '../UI/renderMonthSelector.js';
import renderMonth from '../UI/renderMonth.js';
import showHideGigs from '../UI/showHideGigs.js';
import renderGig from '../UI/renderGig.js';
import renderTodaysGigs from '../UI/renderTodaysGigs.js';
import renderWeeksGigs from '../UI/renderWeeksGigs.js';
import renderMonthsGigs from '../UI/renderMonthsGigs.js';
import renderFlaggedGigs from '../UI/renderFlaggedGigs.js';
import renderFlagged from '../UI/renderFlagged.js';
import renderEdit from '../UI/renderEdit.js';
import renderDelete from '../UI/renderDelete.js';
import renderAsideMenu from '../UI/renderAsideMenu.js';
import renderMobileNav from '../UI/renderMobileNav.js';

export default class Load {
  static loadUI() {
    localStorage.localStorageInitialise();
    renderTodaysGigs.renderGigsDueToday();
    Load.callHandlers();
  }

  static callHandlers() {
    renderMonth.handlerRenderMonth();
    renderMonthSelector.handlerMonthsEvents();
    showHideGigs.handlershowHideGigs();
    renderGig.handlerAddGigBtns();
    renderTodaysGigs.handlerTodayViewBtn();
    renderWeeksGigs.handlerWeeksViewBtn();
    renderMonthsGigs.handlerMonthsViewBtn();
    renderFlaggedGigs.handlerFlaggedViewBtn();
    renderFlagged.handlerFlaggedGig();
    renderEdit.handlerRenderEdit();
    renderDelete.handlerDeleteBtn();
    renderAsideMenu.handlerRenderAsideDelete();
    renderMobileNav.handlerRenderMobileNav();
    document
      .querySelector('.container')
      .addEventListener('touchstart', () => {});
    document.querySelector('.container').addEventListener('touchend', () => {});
    document
      .querySelector('.container')
      .addEventListener('touchcancel', () => {});
    document
      .querySelector('.container')
      .addEventListener('touchmove', () => {});
  }
}
