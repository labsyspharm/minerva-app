import { toElement } from '../../lib/elements';
import { StyledNotice } from './styled-notice/styled-notice';
import { NoticeContent } from './notice-content/notice-content';
import { NoticeContentLink } from './notice-content/notice-content-link';

class NoticeGrid extends HTMLElement {
  static name = 'notice-grid'

  static allNoticeTimer = null;

  get elementTemplate() {
    const choose_content = (notice) => {
      return {
        'LINK-NOTICE': NoticeContentLink
      }[notice] || NoticeContent; 
    }
    const notice_content = () => {
      const notice_element = this.defineElement(
        choose_content(this.elementState.notice)
      );
      return toElement(notice_element)``();
    }
    return toElement(this.defineElement(StyledNotice))`${notice_content}`({
      open: () => {
        return this.elementState.notice != '';
      },
      class: 'notice',
      '@close': () => {
        this.clearAllNotices(0)
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name != 'open') return;
    if (oldValue != null) return;
    if (newValue == null) return;
    const { nav_config, notice } = this.elementState;
    const config = nav_config[notice] || {};
    if (config.timeout) {
      this.clearAllNotices(config.timeout)
    }
  }

  clearAllNotices (timeout=0) {
    clearTimeout(this.constructor.allNoticeTimer);
    this.constructor.allNoticeTimer = setTimeout(
      () => this.elementState.notice = '', timeout
    )
  }
}

export { NoticeGrid }
