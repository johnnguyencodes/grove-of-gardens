import React from 'react';

export default function Footer(props) {
  return (
    <footer className="footer-container bg-white col-12 d-flex flex-column justify-content-center align-items-center">
      <img className="footer-logo" src="..\images\grove-of-gardens-logo.jpg" alt="The Grove of Gardens Logo" onClick={() => props.setView('catalog', {})} />
    </footer>
  );
}
