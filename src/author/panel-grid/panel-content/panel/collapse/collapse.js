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
    this.expanded = this.expanded;
  }

  get expanded () {
    const item = this.itemSource;
    if (item) {
      return this.getItemState("Expanded");
    }
    return false;
  }

  set expanded (v) {
    const item = this.itemSource;
    if (item) {
      this.setItemState("Expanded", v);
      this.requestUpdate();
    }
    const prefix = "icons:radio-button-";
    this.icon = prefix + [
      "unchecked", "checked"
    ][+v];
    return true;
  }
}

export { Collapse }
