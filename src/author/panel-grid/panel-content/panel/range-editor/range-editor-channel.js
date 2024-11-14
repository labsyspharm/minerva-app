import { toElement } from '../../../../../lib/elements';
import { sourceGroupChannels } from '../../../../../items/source-group-channels'
import { useItemIdentifier } from '../../../../../filters/use-item-identifier';
import rangeEditorChannelCSS from './range-editor-channel.css' assert { type: 'css' };
import { RangeSlider } from './range-slider.js';

class RangeEditorChannel extends sourceGroupChannels(
  useItemIdentifier(HTMLElement)
) {
  static name = 'range-editor-channel'

  static get _styleSheet() {
    return rangeEditorChannelCSS;
  }

  get itemIdentifiers() {
    return {
      GroupUUID: this.elementState.GroupUUID
    }
  }

  get dataType() {
    const { item_registry } = this.elementState;
    const source_channel = this.getSourceChannel(
      this.itemSource
    );
    const { Associations } = source_channel;
    const { SourceDataType } = Associations || {};
    const data_type = item_registry.DataTypes.find(data_type => {
      return data_type.ID == SourceDataType?.ID
    });
    return data_type?.Properties || {
      LowerRange: 0, UpperRange: 65535
    };
  }

  get elementTemplate() {
    const rangeInputElement = this.defineElement(
      RangeSlider, { }
    )
    const dataType = this.dataType;
    const defaultValues = this.itemSource.Properties;
    const pow2 = (value) => {
      return Math.max(
        dataType.LowerRange, Math.min(
          dataType.UpperRange, Math.floor(2**value)
        )
      );
    }
    const log2 = (value) => {
      return Math.ceil(Math.log2(Math.max(1/2, value)));
    }
    const rangeInput = toElement(rangeInputElement)``({
      min: String(log2(dataType.LowerRange)),
      max: String(log2(dataType.UpperRange)),
      'start-value': String(log2(defaultValues.LowerRange)),
      'end-value': String(log2(defaultValues.UpperRange)),
      class: 'full grid',
      '@input': (e) => {
        const start = e.target.startValue;
        const end = e.target.endValue;
        const { itemSource } = this;
        itemSource.Properties.LowerRange = pow2(start);
        itemSource.Properties.UpperRange = pow2(end);
      }
    });
    return toElement('div')`${
      rangeInput
    }`({
      class: 'full grid'
    });
  }
}

export { RangeEditorChannel }
