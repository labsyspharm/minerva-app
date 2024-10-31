import { sourceGroupChannels } from '../../../../../items/source-group-channels'
import { useItemIdentifier } from '../../../../../filters/use-item-identifier';
import collapseChannelCSS from './collapse-channel.css' assert { type: 'css' };
import { Collapse } from './collapse';

class CollapseChannel extends sourceGroupChannels(
  useItemIdentifier(Collapse)
) {

  static name = 'collapse-channel'

  static itemStateMap = new Map([
    ['Expanded', 'expanded']
  ])

  static get _styleSheet() {
    [...Collapse._styleSheet.cssRules].forEach(
      r => collapseChannelCSS.insertRule(r.cssText)
    )
    return collapseChannelCSS;
  }

  get itemIdentifiers() {
    return {
      GroupUUID: this.elementState.GroupUUID
    }
  }
}

export { CollapseChannel }
