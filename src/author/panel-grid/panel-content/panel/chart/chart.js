import { toElement } from '../../../../../lib/elements';
import chartCSS from './chart.css' assert { type: 'css' };
import { useItemIdentifier } from '../../../../../filters/use-item-identifier';
import { sourceSourceChannels } from '../../../../../items/source-source-channels';
import { SimpleColors } from "@haxtheweb/simple-colors";

class Chart extends useItemIdentifier(
  sourceSourceChannels(HTMLElement)
) {

  static name = 'chart'

  static get _styleSheet() {
    return chartCSS;
  }

  get elementTemplate() {
    const width = 100;
    const height = 25;
    const stroke = 1.5;
    const d = () => {
      const source = this.itemSource;
      const line = [
        0, ...(source.Properties.Distribution || [ ]), 0
      ];
      const flat = line.slice(1,-1).every(v => v == line[1]);
      const max = Math.max(1, ...(flat ? [2*line[1]] : line));
      const len = Math.max(2, line.length);
      return line.reduce((d, v, index) => {
        const i = Math.min(Math.max(index, 1), len-2) - 1;
        const x = Math.min(Math.max(i/(len-3), 0), 1);
        const y = Math.min(Math.max(1 - v/max, 0), 1);
        const action = d.length ? 'L' : 'M';
        return `${d} ${action} ${width*x} ${2+(height-2)*y}`;
      }, '');
    }
    return toElement('svg')`
      <path d="${d}" stroke-linejoin="round"/>
    `({
      viewBox: `${stroke*2} 0 ${width-stroke*4} ${height}`,
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg"
    });
  }
}

export { Chart }
