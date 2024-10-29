import { Panel } from './panel';
import { PanelItemGroup } from './panel-item-group';
import { ItemSideMenuGroup } from './item-side-menu-group';
import { sourceGroupItems } from '../../../../items/source-group-items'

class PanelGroup extends sourceGroupItems(Panel) {

  static name = 'panel-group'
  static itemElement = PanelItemGroup
  static menuElement = ItemSideMenuGroup

}

export { PanelGroup }
