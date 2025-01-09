import panelContentCSS from './panel-content.css' assert { type: 'css' };
import { toElement } from '../../../lib/elements';
import { Panel } from './panel/panel';

class PanelContent extends HTMLElement {

  static name = 'panel-content'
  static panelElement = Panel

  static get _styleSheet() {
    return panelContentCSS;
  }

  get elementDescription() {
    const { nav_config, tab } = this.elementState;
    return nav_config[tab].description;
  }

  get elementTemplate() {
    const panel_element = this.defineElement(
      this.constructor.panelElement 
    );
    const description = () => {
      return this.elementDescription;
    }
    const content = () => {
      return toElement(panel_element)``();
    }
    return toElement('div')`
      <h2 class="indent">${description}</h2>
      ${content}
    `({
      'class': 'start grid wrapper'
    });
  }
}

export { PanelContent };
