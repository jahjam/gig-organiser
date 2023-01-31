class RenderMobileNav {
  constructor() {
    this.mobileNavIcon = document.querySelector('.header__mobile-nav-icon');
    this.asideMenu = document.querySelector('.aside-menu');
  }

  RenderMobileNavHandler() {
    this.mobileNavIcon.addEventListener(
      'click',
      this.HandleMobileNavIcon.bind(this)
    );
    window.addEventListener('click', this.CloseMobileNavDynamic.bind(this));
  }

  HandleMobileNavIcon() {
    this.asideMenu.style.transform = 'translateX(0)';
  }

  CloseMobileNavDynamic(e) {
    if (
      (!e.target.closest('.aside-menu') &&
        !e.target.closest('.header__mobile-nav-icon')) ||
      e.target.closest('.aside-menu__btn') ||
      e.target.closest('.aside-menu__dates-content-item--btn')
    )
      if (window.matchMedia('(max-width: 856px)').matches) {
        this.asideMenu.style.transform = '';
      }
  }
}

export default new RenderMobileNav();
