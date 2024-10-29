import { toElement } from '../../../lib/elements';
import { StyledDialog } from './styled-dialog/styled-dialog';
import { DialogContent } from './dialog-content/dialog-content';

class DialogGrid extends HTMLElement {
  static name = 'dialog-grid'

  get elementTemplate() {
    const dialog_title = () => {
      const { nav_config, dialog } = this.elementState;
      return nav_config[dialog].title || dialog;
    }
    const choose_content = (dialog) => {
      return {
      }[dialog] || DialogContent;
    }
    const content = () => {
      const dialog_element = this.defineElement(
        choose_content(this.elementState.dialog), {
          defaults: { items: [] }
        }
      )
      return toElement(dialog_element)``();
    }
    return toElement(this.defineElement(StyledDialog))`
      <h3>${dialog_title}</h3>${content}
    `({
      open: () => {
        return this.elementState.dialog != '';
      },
      class: 'dialog',
      '@close': () => {
        const { dialog } = this.elementState;
        this.elementState.dialog = '';
      }
    })
  }
}

export { DialogGrid }
