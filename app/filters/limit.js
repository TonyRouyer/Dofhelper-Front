// FiltreLimite.js
import React from 'react';

const FiltreLimite = ({ value, onChange }) => {
  return (
    <div>
      Limite :
      <select value={value} className='text-black' onChange={(e) => onChange(e.target.value)}>
        <option value={15}>15</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={'all'}>Tous</option>
      </select>
    </div>
  );
};

export default FiltreLimite;
