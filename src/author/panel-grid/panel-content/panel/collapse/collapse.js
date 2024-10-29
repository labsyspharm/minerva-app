import collapseCSS from './collapse.css' assert { type: 'css' };
import { useItemIdentifier } from '../../../../../filters/use-item-identifier';
import { A11yCollapse } from '@haxtheweb/a11y-collapse';

class Collapse extends useItemIdentifier(A11yCollapse) {

  static name = 'collapse'

  static get _styleSheet() {
    return collapseCSS;
  }

  constructor () {
    super();
    this.icon = "icons:radio-button-checked";
  }

  get expanded () {
    const item = this.itemSource;
    return (
      item?.State?.Expanded || false
    );
  }

  set expanded (v) {
    const item = this.itemSource;
    this.elementState.expanded = v;
    if (item) {
      const prefix = "icons:radio-button-";
      this.icon = prefix + [
        "unchecked", "checked"
      ][+v];
      item.State.Expanded = v;
      this.requestUpdate();
    }
    return true;
  }
}

export { Collapse }
