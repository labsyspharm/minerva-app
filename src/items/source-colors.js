const sourceColors = (element=Object) => (
  class extends element {

    get itemSources () {
      return this.elementState.item_registry?.Colors;
    }
  }
)

export { sourceColors }
