import { PanelContent } from './panel-content';
import { PanelStory } from './panel/panel-story';

class PanelContentStory extends PanelContent {

  static name = 'panel-content-story'
  static panelElement = PanelStory

  get elementDescription() {
    const { item_registry } = this.elementState;
    return item_registry.Name;
  }
}

export { PanelContentStory };
