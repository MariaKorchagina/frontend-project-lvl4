import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useAuth, useChat } from '../hooks/index.js';
import { getCurrentChannelId, getCurrentChannel, getAllMessages } from '../slices/selectors.js';

const Messages = () => {
  const inputEl = useRef();
  const lastMessageEl = useRef();
  const auth = useAuth();
  const chat = useChat();
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector(getCurrentChannel);
  const currentMessages = useSelector(getAllMessages)
    .filter((m) => m.channelId === currentChannelId);
  useEffect(() => { inputEl.current.focus(); });
  useEffect(() => { lastMessageEl.current.scrollIntoView({ behavior: 'smooth' }); }, [currentMessages]);

  const schema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    schema,
    onSubmit: (values) => {
      const { body } = values;
      const cleanedMessage = leoProfanity.clean(body);
      const channelId = currentChannelId;
      const { username } = auth.user;
      const data = {
        body: cleanedMessage,
        channelId,
        username,
      };
      chat.addNewMessage(data);
      formik.resetForm();
    },
  });

  const Message = (props) => {
    const { content } = props;
    return (
      <div className="text-break mb-2 text-secondary">
        <b>{content.username}</b>
        :
        {' '}
        {content.body}
      </div>
    );
  };

  const messagesRender = () => (
    currentMessages.map((m) => (
      <Message key={m.id} content={m} />
    ))
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.counter.key', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesRender()}
          <span ref={lastMessageEl} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <InputGroup>
              <Form.Control
                onChange={formik.handleChange}
                name="body"
                aria-label={t('messages.new')}
                placeholder={t('messages.input')}
                className="border-0 p-0 ps-2"
                value={formik.values.body}
                ref={inputEl}
                disabled={formik.isSubmitting}
              />
              <Button
                type="submit"
                variant="link"
                className="btn-group-vertical"
                disabled={formik.errors.body || !formik.values.body}
              >
                <ArrowRightSquare />
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
