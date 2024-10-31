import { sourceGroupItems } from '../../../../../items/source-group-items'
import { Collapse } from './collapse';

class CollapseGroup extends sourceGroupItems(Collapse) {

  static name = 'collapse-group'

  static itemStateMap = new Map([
    ['Expanded', 'expanded']
  ])
}

export { CollapseGroup }
