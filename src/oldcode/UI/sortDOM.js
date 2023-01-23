import sortData from '../modules/sortData.js';

class SortDOM {
  sortAsideMenuMonths() {
    const asideMonths = document.querySelectorAll('.aside-menu__dates-content');
    const asideMenu = document.querySelector('.aside-menu__content-months');
    const elements = [...asideMonths];

    elements
      .sort(
        (a, b) =>
          sortData.months[
            a.innerText.toLowerCase().split('')[0].toUpperCase() +
              a.innerText.slice(1).toLowerCase()
          ] -
          sortData.months[
            b.innerText.toLowerCase().split('')[0].toUpperCase() +
              b.innerText.slice(1).toLowerCase()
          ]
      )
      .forEach(node => asideMenu.appendChild(node));
  }
}

export default new SortDOM();
