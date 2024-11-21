const sourceSourceDistributions = (element=Object) => (
  class extends element {

    get itemSources () {
      return this.elementState.item_registry?.SourceDistributions;
    }

  }
)

export { sourceSourceDistributions }
