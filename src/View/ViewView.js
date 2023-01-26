class ViewView {
  constructor() {
    this.asideMenuViewBtns = document.querySelectorAll('.aside-menu__btn');
  }

  AddRemoveBtnActive(elClass, event) {
    this.asideMenuViewBtns.forEach(btn => btn.classList.remove('u-active-btn'));

    if (!event.target.closest(elClass).classList.contains('u-active-btn'))
      event.target.closest(elClass).classList.add('u-active-btn');
  }
}

export default new ViewView();
