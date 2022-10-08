import React from 'react';
import {
  Col,
  Button,
} from 'react-bootstrap';
import {
  useDispatch,
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions as modalsActions } from '../slices/modals.js';
import ChannelsNav from './ChannelsRender';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-secondary">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.main')}</span>
        <Button
          onClick={() => dispatch(modalsActions.showModal({ modalType: 'adding', itemId: null }))}
          variant="link"
          className="p-0 text-info btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      {ChannelsNav()}
    </Col>
  );
};

export default Channels;
