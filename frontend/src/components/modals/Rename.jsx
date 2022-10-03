// import React, { useEffect, useRef } from 'react';
// import leoProfanity from 'leo-profanity';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
// import { Modal, Form, Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useChat } from '../../hooks/index.js';
// import { getItemId, getAllChannels } from '../../slices/selectors.js';
// import { actions as modalsActions } from '../../slices/modals';

// const Rename = () => {
//   const dispatch = useDispatch();
//   const inputEl = useRef();
//   const chat = useChat();
//   const { t } = useTranslation();
//   const itemId = useSelector(getItemId);
//   const renamedChannel = useSelector(getAllChannels).find((channel) => channel.id === itemId);

//   const schema = yup.object().shape({
//     name: yup
//       .string()
//       .trim()
//       .min(3, t('modal.channelConstraints'))
//       .max(20, t('modal.channelConstraints'))
//       .notOneOf(useSelector(getAllChannels).map((channel) => channel.name), t('modal.unique'))
//       .required(t('modal.required')),
//   });

//   const formik = useFormik({
//     initialValues: { name: renamedChannel.name },
//     schema,
//     onSubmit: (values) => {
//       const cleanedName = leoProfanity.clean(values.name);
//       chat.renameChannel({ id: itemId, name: cleanedName });
//       toast.success(t('modal.rename'));
//       dispatch(modalsActions.hideModal());
//     },
//   });

//   useEffect(() => { inputEl.current.select() }, []);

//   return (
//     <Modal show centered>
//       <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
//         <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form onSubmit={formik.handleSubmit}>
//           <Form.Control
//             className="mb-2"
//             onChange={formik.handleChange}
//             ref={inputEl}
//             id="name"
//             name="name"
//             value={formik.values.name}
//             isInvalid={formik.errors.name && formik.touched.name}
//           />
//           <Form.Label htmlFor="name" className="visually-hidden">{t('modal.name')}</Form.Label>
//           <Form.Control.Feedback type="invalid">
//             {formik.errors.name}
//           </Form.Control.Feedback>
//           <div className="d-flex justify-content-end">
//             <Button
//               className="me-2"
//               variant="secondary"
//               onClick={() => dispatch(modalsActions.hideModal())}
//             >
//               {t('modal.cancel')}
//             </Button>
//             <Button type="submit" variant="primary">{t('modal.send')}</Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default Rename;


import React, { useEffect, useRef } from 'react';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useChat } from '../../hooks/index.js';

import { getItemId, getAllChannels } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modals.js';

const Rename = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useChat();
  const { t } = useTranslation();

  const itemId = useSelector(getItemId);
  const channels = useSelector(getAllChannels);
  const renamedChannel = channels.find((channel) => channel.id === itemId);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modalRename.channelConstraints'))
      .max(20, t('modalRename.channelConstraints'))
      .notOneOf(channels.map((channel) => channel.name), t('modalRename.unique'))
      .required(t('modalRename.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: renamedChannel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      chat.renameChannel({ id: itemId, name: cleanedName });
      toast.success(t('modalRename.success'));
      dispatch(modalsActions.hideModal());
    },
  });

  useEffect(() => {
    inputEl.current.select();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modalRename.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            ref={inputEl}
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
          />
          <Form.Label htmlFor="name" className="visually-hidden">{t('modalRename.name')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(modalsActions.hideModal())}
            >
              {t('modalRename.cancel')}
            </Button>
            <Button type="submit" variant="primary">{t('modalRename.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;