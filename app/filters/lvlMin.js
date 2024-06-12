// FiltreLevelMin.js
import React from 'react';

const FiltreLevelMin = ({ value, onChange }) => {
  return (
    <div>
      Level Min :
      <input type="number" className="text-black" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FiltreLevelMin;
