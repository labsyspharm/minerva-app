import { sourceStoryItems } from '../../../../items/source-story-items';
import { ItemSideMenu } from './item-side-menu';

class ItemSideMenuStory extends (
  sourceStoryItems(ItemSideMenu)
) {

  static name = 'item-side-menu-story'

}

export { ItemSideMenuStory };
