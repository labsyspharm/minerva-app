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

    getSelectionProperty(property) {
      const { Properties = {} } = this.itemSource;
      return Properties[property];
    }

    setSelectionProperty(property, value) {
      const { originElementState } = this.selectionSource;
      const { Properties = {} } = this.itemSource;
      Properties[property] = value;
      const key = this.constructor.mutableProperties[property];
      updateElementState(originElementState, key, value);
    }
  }
)

export { useItemSelection }
