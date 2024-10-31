const sourceStoryItems = (element=Object) => (
  class extends element {

    static itemStateMap = new Map([
      ['Name', 'name']
    ])

    get itemSources () {
      return this.elementState.item_registry?.Stories;
    }
  }
)

export { sourceStoryItems }
