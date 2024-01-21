import React, { useState } from 'react';

const Button = ({ onClick, loading, children }) => (
  <button
    className={`btn-primary2 bg-linear btn1 animate__animated animate__fadeInUp ${loading ? 'disabled' : ''}`}
    onClick={onClick}
    disabled={loading}
  >
    {loading ? 'Loading...' : children}
  </button>
);

export default Button;