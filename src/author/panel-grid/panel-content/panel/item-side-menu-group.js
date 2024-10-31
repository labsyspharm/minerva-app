import { sourceGroupItems } from '../../../../items/source-group-items';
import { PanelItemGroup } from './panel-item-group';
import { ItemSideMenu } from './item-side-menu';

class ItemSideMenuGroup extends (
  sourceGroupItems(ItemSideMenu)
) {

  static name = 'item-side-menu-group'
  static itemElement = PanelItemGroup

  static itemStateMap = new Map([
    ['Expanded', 'expanded']
  ])
}

export { ItemSideMenuGroup };
