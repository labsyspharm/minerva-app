const sourceGroupItems = (element=Object) => (
  class extends element {

    static mutableState = {
      'Expanded': 'expanded'
    }

    get itemSources () {
      return this.elementState.item_registry?.Groups;
    }
  }
)

export { sourceGroupItems }
