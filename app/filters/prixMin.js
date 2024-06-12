// FiltrePrixMin.js
import React from 'react';

const FiltrePrixMin = ({ value, onChange }) => {
  return (
    <div>
      Prix Min :
      <input type="number" className="text-black" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FiltrePrixMin;