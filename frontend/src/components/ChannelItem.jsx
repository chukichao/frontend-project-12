import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import { useTranslation } from 'react-i18next';

import { uiActions } from '../store/actions';

import useCurrentUserInfo from '../hooks/useCurrentUserInfo.js';

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentChannel } = useCurrentUserInfo();
  const currentChannelId = currentChannel?.id;
  const active = currentChannelId === channel.id;

  const handleRemove = (id) => {
    dispatch(uiActions.setExtra({ id }));
    dispatch(uiActions.openModal({ type: 'removeChannel' }));
  };

  const handleRename = (id) => {
    dispatch(uiActions.setExtra({ id }));
    dispatch(uiActions.openModal({ type: 'renameChannel' }));
  };

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
          <Dropdown.Item onClick={() => handleRemove(channel.id)}>
            {t('channels.remove')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleRename(channel.id)}>
            {t('channels.rename')}
          </Dropdown.Item>
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
