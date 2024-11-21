import { sourceSourceDistributions } from "./source-source-distributions";
import { sourceDataTypes } from "./source-data-types";

const sourceSourceChannels = (element=Object) => (
  class extends element {

    get itemSources () {
      return this.elementState.item_registry?.SourceChannels;
    }

    getSourceDistribution(source_channel) {
      const distribution = source_channel.Associations.SourceDistribution;
      const source = new (sourceSourceDistributions(Object));
      source.elementState = this.elementState;
      return (source.itemSources || []).find(({ UUID }) => {
        return UUID == distribution.UUID;
      }) || null;
    }

    getSourceDataType(source_channel) {
      const data_type = source_channel.Associations.SourceDataType;
      const source = new (sourceDataTypes(Object));
      source.elementState = this.elementState;
      return (source.itemSources || []).find(({ ID }) => {
        return ID == data_type.ID;
      }) || null;
    }
  }
)

export { sourceSourceChannels }
