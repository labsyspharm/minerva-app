import { toElement } from '../../../lib/elements';
import { Notice } from './notice';

class NoticeContent extends HTMLElement {
  static name = 'notice-content'
  static noticeElement = Notice

  get elementTemplate() {
    const notice_element = this.defineElement(
      this.constructor.noticeElement
    )
    const content = () => {
      const { notice } = this.elementState;
      return toElement(notice_element)``({ notice });
    }
    return toElement('div')`${content}`({});
  }
}

export { NoticeContent }
