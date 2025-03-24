import { useSelector, useDispatch } from 'react-redux';
import { getCurrentChannelId } from '../store/selectors/index.js';
import { uiActions } from '../store/actions/index.js';

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(getCurrentChannelId);
  const active = currentChannelId === channel.id;

  const handleSwitchChannel = (id) => {
    dispatch(uiActions.setCurrentChannel({ id }));
  };

  if (channel.removable) {
    return (
      <div role="group" className="d-flex show dropdown btn-group">
        <button
          type="button"
          className="w-100 rounded-0 text-start text-truncate btn btn-secondary"
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        <button
          type="button"
          id="react-aria6614243407-:r0:"
          aria-expanded="true"
          className="flex-grow-0 dropdown-toggle dropdown-toggle-split show btn btn-secondary"
        >
          <span className="visually-hidden">Управление каналом</span>
        </button>
        <div
          x-placement="bottom-end"
          aria-labelledby="react-aria6614243407-:r0:"
          className="dropdown-menu show"
          data-popper-reference-hidden="false"
          data-popper-escaped="false"
          data-popper-placement="bottom-end"
          style={{
            position: 'absolute',
            inset: '0px 0px auto auto',
            transform: 'translate3d(0px, 40px, 0px)',
          }}
        >
          <a
            data-rr-ui-dropdown-item=""
            className="dropdown-item"
            role="button"
            tabIndex="0"
            href="#"
          >
            Удалить
          </a>
          <a
            data-rr-ui-dropdown-item=""
            className="dropdown-item"
            role="button"
            tabIndex="0"
            href="#"
          >
            Переименовать
          </a>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`w-100 rounded-0 text-start btn ${active && 'btn-secondary'}`}
      onClick={() => handleSwitchChannel(channel.id)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
};

export default ChannelItem;
