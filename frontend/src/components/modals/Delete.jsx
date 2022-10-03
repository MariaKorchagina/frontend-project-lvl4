// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Modal, Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import { useChat } from '../../hooks/index.js';
// import { getItemId } from '../../slices/selectors.js';
// import { actions as modalsActions } from '../../slices/modals'

// const Delete = () => {
//   const dispatch = useDispatch();
//   const chat = useChat();
//   const { t } = useTranslation();
//   const itemId = useSelector(getItemId);

//   const handleRemove = (channelId) => {
//     chat.removeChannel(channelId);
//     toast.error(t('modal.delete'));
//     dispatch(modalsActions.hideModal());
//   };

//   return (
//     <Modal show centered>
//       <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
//         <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p className="lead">{t('modal.confirm')}</p>
//         <div className="d-flex justify-content-end">
//           <Button
//             className="me-2"
//             variant="secondary"
//             onClick={() => dispatch(modalsActions.hideModal())}
//           >
//             {t('modal.cancel')}
//           </Button>
//           <Button
//             type="submit"
//             variant="danger"
//             onClick={() => handleRemove(itemId)}
//           >
//             {t('modal.remove')}
//           </Button>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default Delete;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChat } from '../../hooks/index.js';

import { getItemId } from '../../slices/selectors.js';

import { actions as modalsActions } from '../../slices/modals.js';

const Delete = () => {
  const dispatch = useDispatch();
  const chat = useChat();
  const { t } = useTranslation();

  const itemId = useSelector(getItemId);

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    toast.success(t('modal.delete'));
    dispatch(modalsActions.hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => dispatch(modalsActions.hideModal())}
          >
            {t('modal.cancel')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handleRemove(itemId)}
          >
            {t('modal.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Delete;