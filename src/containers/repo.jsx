import React, { Component } from "react";

import ImageView from "./imageview";
import ChannelControls from "./channelcontrols";
import ImportList from "../components/importlist";
import Import from "../components/import";
import Banner from "../components/Banner";
import Modal from "../components/modal";
import api from "../api";

import '../style/repo';

class Repo extends Component {

  constructor() {
    super();
    this.state = {
      session: null,
			imps: new Map([
				['uuid1', { uuid: 'uuid1', name: 'import1', imgs: ['uuid3', 'uuid4'] }],
				['uuid2', { uuid: 'uuid2', name: 'import2', imgs: ['uuid5'] }]
			]),
			imgs: new Map([
				['uuid3', {
					uuid: 'uuid3', name: 'image1',
					url: 'https://minerva-test-images.s3.amazonaws.com/png_tiles'
				}],
				['uuid4', {
					uuid: 'uuid4', name: 'image2',
					url: 'https://minerva-test-images.s3.amazonaws.com/png_tiles'
				}],
				['uuid5', {
					uuid: 'uuid5', name: 'image3',
					url: 'https://minerva-test-images.s3.amazonaws.com/png_tiles'
				}]
			]),
			'active': {
				uuid: 'uuid4',
				channels: new Map([
					[0, { id: 0, color: [255, 0, 0], range: { min: 0, max: 10000 }, minRange: 0, maxRange: 65535 }],
					[1, { id: 1, color: [0, 0, 255], range: { min: 10000, max: 65535 }, minRange: 0, maxRange:65535 }]
				]),
        credentialsHolder: {
          credentials: null
        }
			},
      'modal': {
        onClose: this.toggleModal.bind(this, false),
        action: 'Close',
        title: 'Message',
        fields: [],
        show: false,
        body: ''
      }
    };

    // Bind
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

	/**
	 * This function is for testing without a real backend
	 */
	dummyAjax(img) {

		const channels = new Map();

		// Get a random integer, color, range
		const randInt = n => Math.floor(Math.random() * n);
		const randColor = () => {
			return [
			[0,0,255],[0,127,255],[0,255,0],[0,255,127],[0,255,255],
			[127,0,255],[127,127,127],[127,127,255],[127,255,0],[127,255,127],
			[255,0,0],[255,0,127],[255,0,255],[255,127,0],[255,127,127],[255,255,0]
			][randInt(16)]
		}
		const randRange = () => {
			return [
        { min: 0, max: 0.1}, { min: 0, max: 0.3 }, { min: 0, max: 0.5 },
        { min: 0.1, max: 0.3 }, { min: 0.1, max: 0.5 }
			][randInt(5)]
		}

		for (let id of Array(randInt(4)+1).keys()) {
      const rawRange = randRange();
      const range = {
        min: Math.floor(rawRange['min'] * 65535),
        max: Math.floor(rawRange['max'] * 65535)
      };
      const minRange = 0;
      const maxRange = 65535;
      const color = randColor();
      const channel = {
				id,
        color,
        range,
        minRange,
        maxRange
			};
  		channels.set(id, channel);
		}

		this.setState({
			'active': {
				uuid: img.uuid,
				channels: channels
			}
		});
	}

  handleChange(id, color, range) {
    const { active } = this.state;
    const { channels } = active;
    const channel = channels.get(id);

    const newChannel = { ...channel };
    if (color) {
      newChannel['color'] = color;
    }
    if (range) {
      newChannel['range'] = range;
    }
    const newChannels = new Map([...channels,
                                 ...(new Map([[id, newChannel]]))]);
    const newActive = { ...this.state['active'], channels: newChannels };

    this.setState({
      active: newActive
    });
  }

  toggleModal(show) {
    this.setState({
      modal: {
        ...this.state.modal,
      show
      }
    });
  }

  handleLoginError(error) {
    const {modal} = this.state;
    const {name, message, retry} = error;
    var onClose = this.toggleModal.bind(this, false);
    var action = "Close";
    var fields = [];
    var body = '';

    // Close the modal then retry
    if (retry) {
      onClose = (userInput) => {
        this.toggleModal(false);

        // Sucessfully set the session
        retry(userInput).then(session => {
          this.setState({
            modal: {...modal},
            session,
          })
        }).catch(e => {
          this.handleLoginError(e);
        });
      }
    }

    switch(name) {
      case "PasswordResetException":
        fields = error.required || [];
        action = "Reset";
        break;
      case "PasswordResetRequiredException":
        body = "Enter code or leave blank to resend:"
        fields = error.required || [];
        action = "Verify";
        break;
      default:
    }

    this.setState({
      modal: {
        show: true,
        body: body,
        title: message,
        fields: fields,
        onClose: onClose,
        action: action
      }
    });

  }

  handleLogin(userInput) {
    const {email, password} = userInput;
    api.login(email, password)
      .then(session => this.setState({
        session
      }))
      .catch(e => {
        this.handleLoginError(e);
      });
  }

  render() {
    const { session, imps, imgs, active } = this.state;
    const { modal } = this.state;

    const img = imgs.get(active.uuid);
		const { channels, credentialsHolder } = active;

    return (
      <React.Fragment>
        <Modal show={modal.show} title={modal.title}
          action={modal.action} fields={modal.fields}
          onClose={modal.onClose.bind(this)}>
        {modal.body}
        </Modal>
        <ImageView className="ImageView"
          img={ img }
          channels={ channels }
          credentialsHolder={ credentialsHolder }
        />
        <Banner session={ session }
                addImages={ ()=> {
                  alert('hi');
                }}
                handleLogin={ ()=> {
                  this.setState({
                    modal: {
                      show: true,
                      title: "Login to Minerva",
                      fields: [
                        "email",
                        "password"
                      ],
                      onClose: (userInput) => {
                        this.toggleModal(false);
                        this.handleLogin(userInput);
                      },
                      action: "Login"
                    }
                  });
                }}
                handleLogout={ () => console.log('logout') } />
        <div className="container-fluid Repo">

          <div className="row justify-content-between">
            <ImportList className="ImportList col-md-2">
              {Array.from(imps.entries()).map(entry => {
                const [uuid, imp] = entry;
                return (
                  <Import key={uuid}
                  click={this.dummyAjax.bind(this)}
                  imgs={imgs} imp={imp}/>
                );
              })}
            </ImportList>

            <ChannelControls className="ChannelControls col-md-3"
              channels={ channels }
              handleChange={ this.handleChange }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Repo;
