import { toElement } from '../../../lib/elements';
import { NoticeContent } from './notice-content';
import { NoticeLink } from './notice-link';

class NoticeContentLink extends NoticeContent {
  static name = 'notice-content-link'
  static noticeElement = NoticeLink
}

export { NoticeContentLink }
