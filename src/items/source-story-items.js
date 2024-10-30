const sourceStoryItems = (element=Object) => (
  class extends element {

    static mutableState = {
      'Expanded': 'expanded'
    }

    static mutableProperties = {
      'Name': 'name'
    }

    get itemSources () {
      return this.elementState.item_registry?.Stories;
    }
  }
)

export { sourceStoryItems }
