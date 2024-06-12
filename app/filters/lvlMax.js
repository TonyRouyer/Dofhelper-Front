// FiltreLevelMax.js
import React from 'react';

const FiltreLevelMax = ({ value, onChange }) => {
  return (
    <div>
      Level Max :
      <input type="number" className="text-black" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FiltreLevelMax;
