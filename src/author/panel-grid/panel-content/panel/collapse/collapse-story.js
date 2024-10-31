import { sourceStoryItems } from '../../../../../items/source-story-items'
import { Collapse } from './collapse.js';

class CollapseStory extends sourceStoryItems(Collapse) {

  static name = 'collapse-story'

  static itemStateMap = new Map([
    ['Expanded', 'expanded']
  ])

}

export { CollapseStory }
