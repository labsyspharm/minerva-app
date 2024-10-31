import { sourceStoryItems } from '../../../../items/source-story-items';
import { PanelItemStory } from './panel-item-story';
import { ItemSideMenu } from './item-side-menu';

class ItemSideMenuStory extends (
  sourceStoryItems(ItemSideMenu)
) {

  static name = 'item-side-menu-story'
  static itemElement = PanelItemStory

  static itemStateMap = new Map([
    ['Expanded', 'expanded']
  ])
}

export { ItemSideMenuStory };
