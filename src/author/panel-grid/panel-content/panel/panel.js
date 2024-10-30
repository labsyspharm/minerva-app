import { toElement } from '../../../../lib/elements';
import panelCSS from './panel.css' assert { type: 'css' };
import { ItemSideMenu } from './item-side-menu';

class Panel extends HTMLElement {

  static name = 'panel'
  static menuElement = ItemSideMenu

  static get _styleSheet() {
    return panelCSS;
  }

  connectedCallback() {
    this.elementState.items = [
      ...this.itemSources
    ];
  }

  get elementTemplate() {
    const content = (item) => {
      const menu_element = this.constructor.menuElement; 
      const menu = this.defineElement(menu_element, {
        defaults: { expanded: false, UUID: item.UUID },
        attributes: [ "expanded" ]
      });
      return toElement(menu)``({
        UUID: item.UUID
      }).key(item.UUID);
    }
    const sources = () => {
      return this.elementState.items.map(item => {
        return content(item);
      });
    }
    return toElement('div')`${sources}`({
      class: 'grid'
    })
  }

}

export { Panel }
