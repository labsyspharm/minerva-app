import { toElement } from '../../../../lib/elements';
import panelCSS from './panel.css' assert { type: 'css' };
import { ItemSideMenu } from './item-side-menu';
import { PanelItem } from './panel-item';

class Panel extends HTMLElement {

  static name = 'panel'
  static itemElement = PanelItem 
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
      const item_element = this.constructor.itemElement; 
      const menu_element = this.constructor.menuElement; 
      const menu = this.defineElement(menu_element, {
        defaults: { expanded: true, UUID: '' },
        attributes: [ "expanded" ]
      });
      const panel_item = this.defineElement(item_element, {
        defaults: { UUID: '', name: '' }
      });
      const item_el = toElement(panel_item)``({
        UUID: item.UUID, class: 'contents',
        slot: 'item'
      });
      return toElement(menu)`
        ${item_el}
      `({
        UUID: item.UUID
      }).key(item.UUID);
    }
    const sources = () => {
      return this.elementState.items.map(item => {
        return content(item);
      });
    }
    return toElement('div')`${sources}`({
      class: ''
    })
  }

}

export { Panel }
