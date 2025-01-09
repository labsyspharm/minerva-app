import collapseCSS from './collapse.css' assert { type: 'css' };
import { useItemIdentifier } from '../../../../../filters/use-item-identifier';
import { A11yCollapse } from '@haxtheweb/a11y-collapse';

class Collapse extends useItemIdentifier(A11yCollapse) {

  static name = 'collapse'

  static get _styleSheet() {
    return collapseCSS;
  }

  connectedCallback () {
    super.connectedCallback();
    this.expanded = this.expanded;
    this.addEventListener("a11y-collapse-attached", () => {
      const icon = this.shadowRoot.querySelector("#expand"); 
      icon.removeAttribute("aria-hidden");
      icon.setAttribute("tabindex", "1");
    })
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
      const activatable = (
        "Active" in item.State
      );
      if (v === true && activatable) {
        const event_name = [
          this.constructor.name, "activate"
        ].join(':');
        this.dispatchCustomEvent(event_name, {
          "UUID": item.UUID
        });
      }
    }
    const prefix = "icons:radio-button-";
    this.icon = prefix + [
      "unchecked", "checked"
    ][+v];
    return true;
  }
}

export { Collapse }
