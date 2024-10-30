import { Panel } from './panel';
import { ItemSideMenuStory } from './item-side-menu-story';
import { sourceStoryItems } from '../../../../items/source-story-items'

class PanelStory extends sourceStoryItems(Panel) {

  static name = 'panel-story'
  static menuElement = ItemSideMenuStory

}

export { PanelStory }
