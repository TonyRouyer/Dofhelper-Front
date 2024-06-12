// FiltreCraft.js
import React from 'react';

const FiltreCraft = ({ checked, onChange }) => {
  return (
    <label>
      Craftable :
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
};

export default FiltreCraft;
