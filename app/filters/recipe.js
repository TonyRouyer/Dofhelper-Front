// FiltreRecette.js
import React from 'react';

const FiltreRecette = ({ checked, onChange }) => {
  return (
    <label>
      Recette uniquement :
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
};

export default FiltreRecette;
