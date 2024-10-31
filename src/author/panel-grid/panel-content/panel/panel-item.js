import panelItemCSS from './panel-item.css' assert { type: 'css' };
import { useItemIdentifier } from '../../../../filters/use-item-identifier';
import { toElement } from '../../../../lib/elements';
import { Collapse } from './collapse/collapse';

class PanelItem extends useItemIdentifier(HTMLElement) {

  static name = 'panel-item'
  static collapseElement = Collapse

  static get _styleSheet() {
    return panelItemCSS;
  }

  get elementTemplate() {
    const { collapseElement } = this.constructor; 
    const collapse = this.defineElement(collapseElement, {
    });
    const item_contents = () => {
      return this.itemContents;
    }
    const content_action = () => {
      const { tab, nav_config } = this.elementState;
      const actions = nav_config[tab].actions || [];
      const action = actions.find(
        ({ slot }) => slot == 'content'
      );
      if (action == null) {
        return '';
      }
      const button = toElement('button')``({
        '@click': () => {
          const { tab, tab_dialogs } = this.elementState;
          const { UUID } = this.itemSource;
          const dialog = tab_dialogs[tab];
          if (dialog) {
            this.elementState.dialog = dialog;
            this.elementState.selections = [{
              origin: PanelItem.name, UUID,
              originElementState: this.elementState
            }]
          }
        },
        class: 'button',
        type: 'submit'
      })
      return toElement('div')`${button}`({
        class: 'full actions'
      });
    };
    return toElement(collapse)`
      <div class="grid" slot="heading">
        ${() => (
          this.itemHeading
        )}
      </div>
      <div slot="content">
        <div class="full text">
          ${item_contents}
        </div>
          ${content_action}
      </div>
    `({
      accordion: 'true',
      id: 'collapse'
    });
  }

  get itemHeading() {
    const name = () => {
      this.elementState.dialog;
      const item = this.itemSource;
      return item?.Properties.Name;
    }
    return toElement('div')`<div>${name}</div>`({
      class: 'grid'
    });
  }

  attributeChangedCallback(k, old_v, v) {
    if (k !== "expanded") return;
    const collapse = this.shadowRoot.getElementById("collapse");
    collapse.expanded = Boolean(v);
    if (collapse.expanded == false) {
      this.elementState.open_menu = false;
    }
  }
}

export { PanelItem }
