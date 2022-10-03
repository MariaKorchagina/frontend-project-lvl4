import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';

const HeaderPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-secondary rounded">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {auth.user ? <Button className=" bg-info" onClick={auth.logOut}>{t('logout')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default HeaderPage;
