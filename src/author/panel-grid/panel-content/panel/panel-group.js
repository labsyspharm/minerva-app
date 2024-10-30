import { Panel } from './panel';
import { ItemSideMenuGroup } from './item-side-menu-group';
import { sourceGroupItems } from '../../../../items/source-group-items'

class PanelGroup extends sourceGroupItems(Panel) {

  static name = 'panel-group'
  static menuElement = ItemSideMenuGroup

}

export { PanelGroup }
