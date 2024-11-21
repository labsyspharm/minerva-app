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

  get distribution() {
    const distribution = this.getSourceDistribution(
      this.itemSource
    );
    return distribution?.Properties || {
      XScale: 'log', YScale: 'linear', YValues: [],
      LowerRange: 1, UpperRange: 16
    };
  }

  get dataType() {
    const data_type = this.getSourceDataType(
      this.itemSource
    );
    return data_type?.Properties || {
      LowerRange: 0, UpperRange: 65535
    };
  }

  get elementTemplate() {
    const rangeInputElement = this.defineElement(
      RangeSlider, { }
    )
    const dataType = this.dataType;
    const distribution = this.distribution;
    const chart_x_steps = Math.max(
      2, distribution.YValues.length
    );
    const chart_x_max = distribution.UpperRange;
    const chart_x_origin = distribution.LowerRange;
    const chart_x_range = chart_x_max - chart_x_origin;
    const chart_x_scale = chart_x_steps / chart_x_range;
    const from_input = (value) => {
      value = (
        chart_x_origin + (value / chart_x_scale)
      );
      if (distribution.XScale === "log") {
        value = 2 ** value;
      }
      return Math.max(
        dataType.LowerRange, Math.min(
          dataType.UpperRange, value
        )
      );
    }
    const to_input = (value) => {
      if (distribution.XScale === "log") {
        value = Math.log2(Math.max(1, value));
      }
      return Math.round(chart_x_scale * Math.max(
        0, Math.min(chart_x_range, value - chart_x_origin)
      ));
    }
    const defaultValues = this.itemSource.Properties;
    const rangeInput = toElement(rangeInputElement)``({
      min: "0", max: String(chart_x_steps),
      'start-value': String(to_input(defaultValues.LowerRange)),
      'end-value': String(to_input(defaultValues.UpperRange)),
      class: 'full grid',
      '@input': (e) => {
        const start = e.target.startValue;
        const end = e.target.endValue;
        const { itemSource } = this;
        itemSource.Properties.LowerRange = from_input(start);
        itemSource.Properties.UpperRange = from_input(end);
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
