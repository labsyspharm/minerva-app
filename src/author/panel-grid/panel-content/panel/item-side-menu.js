import { toElement } from '../../../../lib/elements';
import { IconButton } from '../../icon-button';
import { useItemIdentifier } from '../../../../filters/use-item-identifier';
import itemSideMenuCSS from './item-side-menu.css' assert { type: 'css' };

class ItemSideMenu extends useItemIdentifier(HTMLElement) {

  static name = 'item-side-menu'

  static get _styleSheet() {
    return itemSideMenuCSS;
  }

  static getPropertyOptions(k) {
    if (k === 'expanded') {
      return { reflect: true }
    }
    return {}
  }

  static elementProperties = new Map([
    ['expanded', { type: Boolean }],
  ])

  get elementTemplate() {
    const button = this.defineElement(IconButton);
    const icon = toElement(button)``({
      class: 'icon',
      icon: 'icons:more-horiz',
      '@click': (event) => {
        this.elementState.expanded = !(
          this.elementState.expanded
        );
      }
    });
    const icon_up = toElement(button)``({
      class: 'icon',
      icon: 'icons:arrow-drop-up',
      '@click': (event) => {
        this.elementState.expanded = !(
          this.elementState.expanded
        );
      }
    });
    const icon_down = toElement(button)``({
      class: 'icon',
      icon: 'icons:arrow-drop-down',
      '@click': (event) => {
        this.elementState.expanded = !(
          this.elementState.expanded
        );
      }
    });
    const icon_delete = toElement(button)``({
      class: 'icon', delete: 'true',
      icon: 'icons:delete-forever',
      '@click': (event) => {
        this.deleteItemSource();
        this.elementState.expanded = !(
          this.elementState.expanded
        );
      }
    });
    const icons = () => (
      [icon, icon_delete, icon_up, icon_down].filter((icon,i) => {
        if (i == 0) return true;
        return this.elementState.expanded; 
      })
    )
    const action_menu = toElement('div')`${icons}`({
      draggable: "true"
    });
    return toElement('div')`
      ${action_menu}<div><slot name="item"></slot></div>
    `({});
  }

}

export { ItemSideMenu };
