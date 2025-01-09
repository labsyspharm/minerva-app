import { toElement } from '../../../../lib/elements';
import panelCSS from './panel.css' assert { type: 'css' };
import { ItemSideMenu } from './item-side-menu';

class Panel extends HTMLElement {

  static name = 'panel'
  static menuElement = ItemSideMenu

  static get _styleSheet() {
    return panelCSS;
  }

  disconnectedCallback() {
    this.removeEventListener(
      "collapse-group:activate", this.activate_group 
    );
    this.removeEventListener(
      "collapse-story:activate", this.activate_story 
    );
  }

  connectedCallback() {
    this.elementState.items = [
      ...this.itemSources
    ];
    const activate = (watch) => {
      return ({detail}) => {
        [
          ...this.shadowRoot.firstChild.children
        ].map(
          child => {
            const uuid = child.getAttribute("uuid");
            if (child.setItemState && uuid) {
              child.setItemState(
                "Active", uuid === detail.UUID
              );
            }
          }
        )
      }
    }
    this.activate_group = activate(false);
    this.activate_story = activate(true);
    this.addEventListener(
      "collapse-group:activate", this.activate_group 
    );
    this.addEventListener(
      "collapse-story:activate", this.activate_story
    );
  }

  get elementTemplate() {
    const content = (item) => {
      const menu_element = this.constructor.menuElement; 
      const menu = this.defineElement(menu_element, {
        defaults: {
          expanded: false,
          active: false,
          open_menu: false,
          UUID: item.UUID
        }
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
