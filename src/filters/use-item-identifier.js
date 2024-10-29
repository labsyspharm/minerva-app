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
  }
)

export { useItemIdentifier }
