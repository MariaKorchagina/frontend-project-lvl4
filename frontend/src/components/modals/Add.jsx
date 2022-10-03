import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useChat } from '../../hooks/index.js';
import { getAllChannels } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modals.js';

const Add = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useChat();
  const { t } = useTranslation();

  useEffect(() => { inputEl.current.focus(); }, []);

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modal.channelConstraints'))
      .max(20, t('modal.channelConstraints'))
      .notOneOf(useSelector(getAllChannels).map((channel) => channel.name), t('modal.unique'))
      .required(t('modal.required')),
  });

  const formik = useFormik({
    initialValues: { name: '', },
    schema,
    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      chat.addNewChannel({ name: cleanedName });
      toast(t('modal.add'));
      dispatch(modalsActions.hideModal());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
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
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2 btn-secondary" onClick={() => dispatch(modalsActions.hideModal())}>
              {t('modal.cancel')}
            </Button>
            <Button type="submit" className="btn-info">{t('modal.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
