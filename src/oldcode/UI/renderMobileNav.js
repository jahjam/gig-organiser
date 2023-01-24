class RenderMobileNav {
  mobileNavIcon = document.querySelector('.header__mobile-nav-icon');
  asideMenu = document.querySelector('.aside-menu');

  handlerRenderMobileNav() {
    this.mobileNavIcon.addEventListener(
      'click',
      this.handleMobileNavIcon.bind(this)
    );
    window.addEventListener('click', this.closeMobileNavDynamic.bind(this));
  }

  handleMobileNavIcon() {
    this.asideMenu.style.transform = 'translateX(0)';
  }

  closeMobileNavDynamic(e) {
    if (
      (!e.target.closest('.aside-menu') &&
        !e.target.closest('.header__mobile-nav-icon')) ||
      e.target.closest('.aside-menu__btn') ||
      e.target.closest('.aside-menu__dates-content-item--btn') ||
      e.target.closest('.gig-icon-elipsis__pop-up-view')
    )
      if (window.matchMedia('(max-width: 856px)').matches)
        this.asideMenu.style.transform = '';
  }
}

export default new RenderMobileNav();