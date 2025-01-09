import { PanelItem } from './panel-item';
import { toElement } from '../../../../lib/elements';
import { IconButton } from '../../icon-button';
import { useItemIdentifier } from '../../../../filters/use-item-identifier';
import itemSideMenuCSS from './item-side-menu.css' assert { type: 'css' };

class ItemSideMenu extends useItemIdentifier(HTMLElement) {

  static name = 'item-side-menu'
  static itemElement = PanelItem 
  static itemStateMap = new Map([
    ['Expanded', 'expanded'],
    ['Active', 'active']
  ])

  static get _styleSheet() {
    return itemSideMenuCSS;
  }

  get elementTemplate() {
    const button = this.defineElement(IconButton);
    const item_element = this.constructor.itemElement; 
    const icon = toElement(button)``({
      class: () => {
        if (this.elementState.open_menu) {
          return 'open icon';
        }
        return 'icon';
      },
      icon: 'icons:more-horiz',
      '@click': (event) => {
        this.elementState.open_menu = !(
          this.elementState.open_menu
        );
        if (this.elementState.open_menu) {
          this.setItemState('Expanded', true);
        }
      }
    });
    const icon_up = toElement(button)``({
      class: 'icon',
      icon: 'icons:arrow-drop-up',
      '@click': (event) => {
        this.elementState.open_menu = !(
          this.elementState.open_menu
        );
      }
    });
    const icon_down = toElement(button)``({
      class: 'icon',
      icon: 'icons:arrow-drop-down',
      '@click': (event) => {
        this.elementState.open_menu = !(
          this.elementState.open_menu
        );
      }
    });
    const icon_delete = toElement(button)``({
      class: 'icon', delete: 'true',
      icon: 'icons:delete-forever',
      '@click': (event) => {
        this.deleteItemSource();
        this.elementState.open_menu = !(
          this.elementState.open_menu
        );
      }
    });
    const icons = () => (
      [icon, icon_delete, icon_up, icon_down].filter((icon,i) => {
        if (i == 0) return true;
        const { open_menu, expanded } = this.elementState;
        return open_menu && expanded; 
      })
    )
    const action_menu = toElement('div')`${icons}`({
      draggable: "true"
    });
    const item_el = () => {
      const panel_item = this.defineElement(item_element, {
        defaults: { name: '' },
        attributes: [ "expanded", "active" ]
      });
      return toElement(panel_item)``({
        class: 'contents',
        active: () => {
          return this.elementState.active;
        },
        expanded: () => {
          return this.elementState.expanded;
        }
      });
    }
    return toElement('div')`
      ${action_menu}<div>${item_el}</div>
    `();
  }
}

export { ItemSideMenu };
