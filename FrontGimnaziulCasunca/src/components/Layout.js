// Layout.js
import React from 'react';
import Navigation from './components/Navigation';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
