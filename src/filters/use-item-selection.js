import { updateElementState } from '../lib/element-state';

const useItemSelection = (origin, element=Object) => (
  class extends element {

    get selectionSources() {
      const { selections } = this.elementState;
      return selections.filter(v => {
        return v.origin == origin && 'UUID' in v;
      });
    }

    get selectionSource() {
      return this.selectionSources[0] || {};
    }

    get itemSource() {
      const { UUID } = this.selectionSource;
      return this.itemSources.find(x => {
        return x.UUID == UUID; 
      }) || null;
    }

    getSelectionProperty(item_key) {
      const { Properties = {} } = this.itemSource;
      return Properties[item_key];
    }

    setSelectionProperty(item_key, value) {
      const { originElementState } = this.selectionSource;
      const { Properties = {} } = this.itemSource;
      Properties[item_key] = value;
      const bindings = this.constructor.itemStateMap;
      const key = (bindings || new Map()).get(item_key);
      updateElementState(originElementState, key, value);
    }
  }
)

export { useItemSelection }
