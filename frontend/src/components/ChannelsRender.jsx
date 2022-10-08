import React from 'react';
import cn from 'classnames';
import {
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAllChannels, getCurrentChannelId } from '../slices/selectors.js';
import { actions as channelsActions } from '../slices/channels.js';
import { actions as modalsActions } from '../slices/modals.js';

const ChannelsNav = () => {
  const channels = useSelector(getAllChannels);
  const channelId = useSelector(getCurrentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = (id) => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  return (
    <Nav fill variant="pills" className="d-flex flex-column px-2" as="ul">
      {channels.map((channel) => (
        <Nav.Item as="li" key={channel.id} className="w-100">
          {channel.removable ? (
            <Dropdown as={ButtonGroup} className="w-100">
              <button
                type="button"
                onClick={() => handleClick(channel.id)}
                className={cn('w-100', 'rounded-1', 'text-start', 'text-truncate', 'btn', {
                  'btn-secondary': channel.id === channelId,
                })}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>

              <Dropdown.Toggle
                split
                variant={channel.id === channelId ? 'info' : 'secondary'}
                className="flex-grow-0 text-end"
              >
                <span className="visually-hidden">{t('channels.manage')}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch(modalsActions.showModal({ modalType: 'removing', itemId: channel.id }))}
                >
                  {t('channels.remove')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch(modalsActions.showModal({ modalType: 'renaming', itemId: channel.id }))}
                >
                  {t('channels.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
            : (
              <button
                type="button"
                onClick={() => handleClick(channel.id)}
                className={cn('w-100', 'rounded', 'text-start', 'text-truncate', 'btn', {
                  'btn-info': channel.id === channelId,
                })}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            )}
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ChannelsNav;
