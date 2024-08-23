import React from 'react';
import Avatar from 'react-avatar';

function Client({ username }) {

  return (
    <div style={{ fontWeight: 900 }} className="d-flex align-items-center mb-3">
      <Avatar name={username.toString()} size={40} round="50%" />
      <span className='mx-2'>{username.toString().toUpperCase()}</span>
    </div>
  );
}

export default Client;
