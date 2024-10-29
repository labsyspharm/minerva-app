import { TextField } from '../../../../../../text-field/text-field';
import { PanelItem } from '../../../../../panel-content/panel/panel-item'
import { sourceStoryItems } from '../../../../../../../items/source-story-items'
import { useItemSelection } from '../../../../../../../filters/use-item-selection'

class TextFieldStory extends useItemSelection(
    PanelItem.name, sourceStoryItems(TextField)
) {
  static name = 'text-field-story'

  get value() {
    return this.getSelectionProperty(this.elementState.property);
  }

  set value(v) {
    this.setSelectionProperty(this.elementState.property, v);
  }
}

export { TextFieldStory }
