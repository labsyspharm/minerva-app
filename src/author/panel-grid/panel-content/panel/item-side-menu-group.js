import { sourceGroupItems } from '../../../../items/source-group-items';
import { ItemSideMenu } from './item-side-menu';

class ItemSideMenuGroup extends (
  sourceGroupItems(ItemSideMenu)
) {

  static name = 'item-side-menu-group'

}

export { ItemSideMenuGroup };
