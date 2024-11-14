import foobarIpsum from 'foobar-ipsum';
import nanoid from '../lib/nanoid/nanoid';

const lorem = new foobarIpsum({
  size: {
    sentence: 5, paragraph: 6
  }
})

const to_image = () => {
  // TODO
  return { UUID: nanoid() };
}

const to_source_channel = (image, data_type, index) => {
  return {
    UUID: nanoid(),
    Properties: {
      SourceIndex: index,
      Name: lorem.sentence(1),
      Distribution: [...new Array(100)].reduce((d,v) => {
        const delta = 200 - Math.round(Math.random()*400);
        return [...d, Math.max(0, d.slice(-1)[0] + delta)];
      }, [500])
    },
    Associations: {
      SourceDataType: {
        ID: data_type.ID,
      },
      SourceImage: {
        UUID: image.UUID,
      },
    }
  }
}

const to_group_channel = (
  group, channel, color, expanded
) => {
  return {
    UUID: nanoid(),
    State: {
      Expanded: expanded
    },
    Properties: {
      LowerRange: 0, UpperRange: 65535
    },
    Associations: {
      Group: {
        UUID: group.UUID,
      },
      SourceChannel: {
        UUID: channel.UUID
      },
      Color: {
        ID: color.ID
      }
    }
  }
}

const to_group = (expanded) => {
  return {
    UUID: nanoid(),
    Properties: {
      Name: lorem.sentence(1)
    },
    State: {
      Expanded: expanded
    }
  }
}

const to_story = (expanded, length=1) => {
  return {
    UUID: nanoid(),
    Properties: {
      Name: lorem.sentence(3),
      Content: [...new Array(length)].map(() => {
        return lorem.paragraph()
      }).join('\n\n')
    },
    Associations: {
      Hyperlinks: []
    },
    State: {
      Expanded: expanded
    }
  }
}

const list_colors = (space="sRGB") => {
  if ( space !== "sRGB" ) {
    return [];
  }
  return [
    [13, 171, 255], [195, 255, 0],
    [255, 139, 0], [255, 0, 199],
  ].map(([r, g, b]) => ({
    ID: space + '#' + (
      (1 << 24) + (r << 16) + (g << 8) + b
    ).toString(16).slice(1),
    Properties: {
      R: r,
      G: g,
      B: b,
      Space: space,
      LowerRange: 0,
      UpperRange: 255 
    }
  }));
}

const to_item_registry = () => {
  const image = to_image();
  const n_channels = 24;

  const data_type = {
    ID: 'uint16',
    Properties: {
      LowerRange: 0,
      UpperRange: 65535
    }
  }
  const source_channels = [
    ...new Array(n_channels).keys()
  ].map((_, i) => {
    return to_source_channel(image, data_type, i)
  });
  const groups = [
    to_group(true),
    to_group(true),
    to_group(false),
    to_group(false)
  ]
  const colors = list_colors("sRGB");
  const group_channels = source_channels.map((channel,i) => {
    const size = Math.floor(
      source_channels.length / groups.length
    );
    const group = groups[Math.floor(i/size)]
    return to_group_channel(
      group, channel, colors[i%colors.length], true
    );
  });
  return {
    "Name": "Example Story",
    "Stories": [
      to_story(true, 1),
      to_story(true, 2),
      to_story(true, 3),
      to_story(false, 4)
    ],
    "SourceChannels": source_channels,
    "GroupChannels": group_channels,
    "Groups": groups,
    "Images": [ image ],
    "DataTypes": [ data_type ],
    "Colors": colors,
    "Hyperlinks": []
  };
}

const item_registry = to_item_registry();

export { item_registry, list_colors }
