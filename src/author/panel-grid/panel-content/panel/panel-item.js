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
    const { collapseElement } = this.constructor; 
    const collapse = this.defineElement(collapseElement, {
      defaults: { UUID: '' }
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
    const expanded = this.getItemState("Expanded");
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
      expanded: () => expanded,
      UUID: (
        this.elementState.UUID
      )
    });
  }

  get itemHeading() {
    const name = () => {
      this.elementState.dialog;
      const item = this.itemSource;
      return item?.Properties.Name;
    }
    return toElement('div')`${name}`({});
  }
}

export { PanelItem }
