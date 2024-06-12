// FiltreSell.js
import React from 'react';

const FiltreSell = ({ checked, onChange }) => {
  return (
    <label>
      Vendable :
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
};

export default FiltreSell;
