import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { uiActions } from '../store/actions';
import useCurrentUserInfo from '../hooks/useCurrentUserInfo.js';

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch();

  const { currentChannel } = useCurrentUserInfo();
  const currentChannelId = currentChannel?.id;
  const active = currentChannelId === channel.id;

  const handleSwitchChannel = (id) => {
    dispatch(uiActions.setCurrentChannel({ id }));
  };

  if (channel.removable) {
    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant=""
          className={`w-100 rounded-0 text-start text-truncate ${
            active ? 'btn-secondary' : ''
          }`}
          onClick={() => handleSwitchChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        <Dropdown.Toggle
          split
          variant=""
          className={`flex-grow-0 ${active ? 'btn-secondary' : ''}`}
          id="dropdown-split-basic"
        />

        <Dropdown.Menu>
          <Dropdown.Item>Удалить</Dropdown.Item>
          <Dropdown.Item>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <button
      type="button"
      className={`w-100 rounded-0 text-start btn ${
        active ? 'btn-secondary' : ''
      }`}
      onClick={() => handleSwitchChannel(channel.id)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
};

export default ChannelItem;
