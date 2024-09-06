import { toElement } from '../../../../lib/elements';
import { PanelItem } from './panel-item';

class Panel extends HTMLElement {

  static name = 'panel'
  static itemElement = PanelItem 

  static elementProperties = new Map([
    ['ki', { type: Number }]
  ])

  get itemSources () {
    return []; // Defined in derived classes
  }

  get itemKeys () {
    return [
      ...Object.keys(this.itemSources)
    ];
  }

  get elementTemplate() {
    const item = this.constructor.itemElement; 
    const panel_item = this.defineElement(item, {
      defaults: { ki: 0 }
    });
    return this.itemKeys.map(ki => {
      return toElement(panel_item)``({
        ki, class: 'contents'
      });
    })
  }

}

export { Panel }
