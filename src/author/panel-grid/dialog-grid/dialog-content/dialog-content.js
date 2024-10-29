import dialogContentCSS from './dialog-content.css' assert { type: 'css' };
import { toElement } from '../../../../lib/elements';
import { Dialog } from './dialog/dialog';

class DialogContent extends HTMLElement {
  static name = 'dialog-content'
  static dialogElement = Dialog

  static get _styleSheet() {
    return dialogContentCSS;
  }

  get elementTemplate() {
    const content = () => {
      const el = this.defineElement(
        this.constructor.dialogElement
      );
      return toElement(el)``({});
    }
    return toElement('div')`
      ${content}
    `({});
  }
}

export { DialogContent }
