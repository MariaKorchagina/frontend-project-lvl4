// import React from 'react';
// import cn from 'classnames';
// import { Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { PlusSquare } from 'react-bootstrap-icons';
// import { getAllChannels, getCurrentChannelId } from '../slices/selectors.js';
// import { actions as channelsActions } from '../slices/channels.js';
// import { actions as modalsActions } from '../slices/modals.js';

// const Channels = () => {
//   const channels = useSelector(getAllChannels);
//   const channelId = useSelector(getCurrentChannelId);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const channelsRender = () => {
//     const handleClick = (id) => {
//       dispatch(channelsActions.setCurrentChannelId(id));
//     };

//     return (
//       <ul className="nav flex-column nav-pills nav-fill px-2">
//         {channels.map((channel) => (
//           <li className="nav-item w-100 " key={channel.id} >
//             {channel.removable ? (
//               <Dropdown as={ButtonGroup} className="w-100">
//                 <Button onClick={() => handleClick(channel.id)} variant={channel.id === channelId && 'btn-secondary'} className="w-100 rounded-0 text-start ">
//                   <span className="me-1">#</span>
//                   {channel.name}
//                 </Button>
//                 <Dropdown.Toggle
//                   variant={channel.id === channelId ? 'info' : 'secondary'}
//                   className="flex-grow-0 text-end"
//                   id="dropdown-split-basic"
//                 >
//                   <span className="visually-hidden">{t('channels.manage')}</span>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item onClick={() => dispatch(modalsActions.showModal({ modalType: 'removing', itemId: channel.id }))}>{t('channels.remove')}</Dropdown.Item>
//                   <Dropdown.Item onClick={() => dispatch(modalsActions.showModal({ modalType: 'renaming', itemId: channel.id }))}>{t('channels.rename')}</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             )
//               : (
//                 <button
//                   type="button" onClick={() => handleClick(channel.id)}
//                   className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', 'rounded', {
//                     'btn-info': channel.id === channelId,
//                   })}
//                 >
//                   <span className="me-1">#</span>
//                   {channel.name}
//                 </button>
//               )}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-secondary">
//       <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
//         <span>{t('channels.main')}</span>
//         <Button
//           onClick={() => dispatch(modalsActions.showModal({ modalType: 'adding', itemId: null }))}
//           variant="link"
//           className="p-0 text-info btn-group-vertical "
//         >
//           <PlusSquare />
//         </Button>
//       </div>
//       {channelsRender()}
//     </Col>
//   );
// };

// export default Channels;


import React from 'react';
import cn from 'classnames';
import {
  Col,
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

import { getAllChannels, getCurrentChannelId } from '../slices/selectors.js';

import { actions as channelsActions } from '../slices/channels.js';
import { actions as modalsActions } from '../slices/modals.js';

const Channels = () => {
  const channels = useSelector(getAllChannels);
  const currentChannelId = useSelector(getCurrentChannelId);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelsRender = () => {
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
                  className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
                    'btn-secondary': channel.id === currentChannelId,
                  })}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>

                <Dropdown.Toggle
                  split
                  variant={channel.id === currentChannelId ? 'secondary' : 'light'}
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
                  className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
                    'btn-secondary': channel.id === currentChannelId,
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

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.main')}</span>
        <Button
          onClick={() => dispatch(modalsActions.showModal({ modalType: 'adding', itemId: null }))}
          variant="link"
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      {channelsRender()}
    </Col>
  );
};

export default Channels;