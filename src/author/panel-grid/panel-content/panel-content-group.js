import { PanelContent } from './panel-content';
import { PanelGroup } from './panel/panel-group';

class PanelContentGroup extends PanelContent {

  static name = 'panel-content-group'
  static panelElement = PanelGroup

}

export { PanelContentGroup };
