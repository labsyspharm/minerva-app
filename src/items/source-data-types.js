const sourceDataTypes = (element=Object) => (
  class extends element {

    get itemSources () {
      return this.elementState.item_registry?.DataTypes;
    }

  }
)

export { sourceDataTypes }
