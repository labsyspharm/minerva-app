import React, { Component } from "react";

import ChannelControlList from "../components/channelcontrollist";
import ChannelControl from "../components/channelcontrol";

class ChannelControls extends Component {

  render() {
    const { channels, handleChange, className } = this.props;
    const { showEditInfoModal } = this.props;

    const channelControls = Array.from(channels.values()).map(channel => {
      const { id, color, label, range, maxRange, visible } = channel;
      if (Object.keys(channel).length === 0) {
        return null;
      }
      return (
        <ChannelControl key={ id } id={ id } color={ color } range={ range }
                        minRange={0} maxRange={maxRange} label={label}
                        visible={visible} handleChange={ handleChange }
                        showEditInfoModal={showEditInfoModal}/>
      );

    });

    return (
      <ChannelControlList className={ className }>
        { channelControls }
      </ChannelControlList>
    );
  }
}

export default ChannelControls;
