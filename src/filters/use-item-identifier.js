import { updateElementState } from '../lib/element-state';

const useItemIdentifier = (element=Object) => (
  class extends element {

    get itemSource() {
      return (this.itemSources || []).find(x => {
        return x.UUID == this.elementState.UUID; 
      }) || null;
    }

    deleteItemSource() {
      const index = (this.itemSources || []).findIndex(x => {
        return x.UUID == this.elementState.UUID; 
      });
      if (index >= 0) {
        this.itemSources.splice(index, 1);
        const items = [ ...this.itemSources ];
        updateElementState(
          this.elementState, 'items', items
        )
      }
    }

    getItemState(item_key) {
      const { State = {} } = this.itemSource;
      return State[item_key];
    }

    setItemState(item_key, value) {
      const { State = {} } = this.itemSource;
      State[item_key] = value;
      const bindings = this.constructor.itemStateMap;
      const key = (bindings || new Map()).get(item_key);
      updateElementState(this.elementState, key, value);
    }
  }
)

export { useItemIdentifier }
