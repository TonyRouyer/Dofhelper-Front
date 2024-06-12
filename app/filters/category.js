// FiltreCategorie.js
import React from 'react';

const FiltreCategorie = ({ value, onChange, type }) => {

  if (type == "gears") {
    return (
      <div>
        Catégorie :
        <select value={value} className="text-black" onChange={(e) => onChange(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Amulette">Amulette</option>
          <option value="Anneau">Anneau</option>
          <option value="Bottes">Bottes</option>
        </select>
      </div>
    );
  } else {
    return (
      <div>
        Catégorie :
        <select value={value} className="text-black" onChange={(e) => onChange(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Rune de forgemagie">Rune</option>
        </select>
      </div>
    );
  }




};

export default FiltreCategorie;
