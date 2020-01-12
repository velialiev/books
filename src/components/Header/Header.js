import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <AppBar position="static">
        <Tabs value={TABS[location.pathname]}>
          <Tab label="Authors" component={Link} to="/authors"/>
          <Tab label="Books" component={Link} to="/books"/>
        </Tabs>
      </AppBar>
    </header>
  );
};

export default Header;

const TABS = {
  '/authors': 0,
  '/books': 1,
};
