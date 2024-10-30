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

    getItemState(state_key) {
      const { State = {} } = this.itemSource;
      return State[state_key];
    }

    setItemState(state_key, value) {
      const { State = {} } = this.itemSource;
      State[state_key] = value;
      const key = this.constructor.mutableState[state_key];
      updateElementState(this.elementState, key, value);
    }
  }
)

export { useItemIdentifier }
