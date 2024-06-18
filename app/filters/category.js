// FiltreCategorie.js
import React from 'react';

const FiltreCategorie = ({ value, onChange, type }) => {

  console.log(type);

  if (type == "gears") {
    return (
      <div>
        Catégorie :
        <select value={value} className="text-black" onChange={(e) => onChange(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Amulette">Amulette</option>
          <option value="Anneau">Anneau</option>
          <option value="Bottes">Bottes</option>
          <option value="Bouclier">Bouclier</option>
          <option value="Cape">Cape</option>
          <option value="Ceinture">Ceinture</option>
          <option value="Chapeau">Chapeau</option>
          <option value="Trophée">Trophée</option>
          <option value="Arc">Arc</option>
          <option value="Baguette">Baguette</option>
          <option value="Bâton">Bâton</option>
          <option value="Faux">Faux</option>
          <option value="Hache">Hache</option>
          <option value="Marteau">Marteau</option>
          <option value="Outil">Outil</option>
          <option value="Pelle">Pelle</option>
          <option value="Pioche">Pioche</option>
          <option value="Épée">Épée</option>
        </select>
      </div>
    );
  } else if (type == "consumables") {
    return (

      <div>
        Catégorie :
        <select value={value} className="text-black" onChange={(e) => onChange(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Boisson">Boisson</option>
          <option value="Pain">Pain</option>
          <option value="Potion">Potion</option>
          <option value="Objet d'élevage">Objet d'élevage</option>
          <option value="Potion de téléportation">Potion de téléportation</option>

        </select>
      </div>
    )

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
