'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Important for Chart.js 3 and later

const FiltreNom = dynamic(() => import('../filters/FiltreNom'));
const FiltrePrixMin = dynamic(() => import('../filters/prixMin'));
const FiltreLevelMin = dynamic(() => import('../filters/lvlMin'));
const FiltreLevelMax = dynamic(() => import('../filters/lvlMax'));
const FiltreCategorie = dynamic(() => import('../filters/category'));
const FiltreSell = dynamic(() => import('../filters/sell'));
const FiltreCraft = dynamic(() => import('../filters/craft'));
const FiltreLimite = dynamic(() => import('../filters/limit'));
const FiltreRatio = dynamic(() => import('../filters/ratio'));

export default function Page() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [prixMin, setPrixMin] = useState('');
  const [levelMin, setLevelMin] = useState('');
  const [levelMax, setLevelMax] = useState('');
  const [categorie, setCategorie] = useState('');
  const [sell, setSell] = useState(false);
  const [craft, setCraft] = useState(false);
  const [recipeOnly, setRecipeOnly] = useState(false);
  const [ratio, setRatio] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/stuff/gears?limit=${filter}`;
        if (searchTerm) url += `&search=${searchTerm}`;
        if (prixMin) url += `&prixMin=${prixMin}`;
        if (levelMin) url += `&lvlMin=${levelMin}`;
        if (levelMax) url += `&lvlMax=${levelMax}`;
        if (categorie) url += `&categ=${categorie}`;
        if (sell) url += `&sell=${sell}`;
        if (craft) url += `&craft=${craft}`;
        if (recipeOnly) url += `&recipeOnly=${recipeOnly}`;
        if (ratio) url += `&ratioMin=${ratio}`;

        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [filter, searchTerm, prixMin, levelMin, levelMax, categorie, sell, craft, recipeOnly, ratio]);

  const fetchPriceHistory = async (id_item) => {
    try {
      const response = await axios.get(`http://localhost:3001/stuff/gearHisto/${id_item}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching price history:', error.message);
      return [];
    }
  };

  const handleMouseEnter = async (item) => {
    const history = await fetchPriceHistory(item.id_item);
    setHoveredItem({ ...item, history });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // update le champs nbWanted des item
  const handleNbSoldChange = (id, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id_item === id ? { ...item, nb_sold: value } : item
      )
    );
  };

  // update le champ en craft de litem et lance une requete pour ajouter shopping
  const handleCraftChange = (id, newCraft) => {
    const updatedItem = data.find((item) => item.id_item === id);
    updateGear(id, updatedItem.nb_sold, newCraft);
    setData((prevData) =>
      prevData.map((item) =>
        item.id_item === id ? { ...item, craft: newCraft } : item
      )
    );
  };

  async function updateGear(id, newNbSold, newCraft) {
    try {
      const response = await axios.put(`http://localhost:3001/stuff/updateGear/${id}`, {
        nbSold: newNbSold,
        craft: newCraft,
      });
    } catch (error) {
      console.error('Error updating gear:', error.message);
    }
    console.log(newNbSold + ' / ' + newCraft + '/ ' + id);
  }

  const imageStyle = {
    height: '120px',
    width: '120px',
    margin: 'auto 10px auto 0',
  }

  return (
    <div>
      <h1>Gears Page</h1>

      <FiltreLimite value={filter} onChange={setFilter} />
      <FiltreNom value={searchTerm} onChange={setSearchTerm} />
      <FiltrePrixMin value={prixMin} onChange={setPrixMin} />
      <FiltreLevelMin value={levelMin} onChange={setLevelMin} />
      <FiltreLevelMax value={levelMax} onChange={setLevelMax} />
      <FiltreCategorie value={categorie} onChange={setCategorie} type="gears" />
      <FiltreRatio value={ratio} onChange={setRatio} />
      <FiltreCraft checked={craft} onChange={setCraft} />

      {data.map((item) => (
        <div
          key={item._id}
          className="flex p-10 relative" // Add relative positioning for overlay
          style={{ border: '1px solid #ccc' }}
        >
          <Image
            src={item.img_url ? `/images/${item.img_url}` : `/images/example.jpg`}
            alt="image dofus"
            width="64"
            height="64"
            style={imageStyle}
          />
          <div>
            <p
            >
              <span className="mr-5">{item.name}</span>
              <span className="mr-5">Level: {item.level}</span>
              <span className="mr-5">Type: {item.type}</span>
            </p>
            {item.recipe && item.recipe.length > 0 && (
              <div>
                <h3>Recipe</h3>
                <ul className="flex">
                  {item.recipe.map((ingredient, index) => (
                    <li key={index} className="flex">
                      {ingredient.qty}x
                      <Image
                        src={ingredient.id ? `/images/${ingredient.id}.png` : `/images/example.jpg`}
                        alt="image dofus"
                        width="64"
                        height="64"
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>Market Price: {item.market_price.toLocaleString()} Kamas</p>
            <p>prix craft: {item.prixCraft.toLocaleString()} Kamas</p>
            <p>
              Gain: {item.gain.toLocaleString()} Kamas / {item.ratioMarge.toFixed(2)} %
            </p>

            <label htmlFor={`nbWanted-${item.id_item}`}>Nb a craft :</label>
            <input
              type="number"
              id={`nbWanted-${item.id_item}`}
              className="text-black"
              value={item.nb_sold}
              onChange={(e) => handleNbSoldChange(item.id_item, e.target.value)}
            />

            <label htmlFor={`aCraft-${item.id_item}`}>A craft :</label>
            <input
              type="checkbox"
              id={`aCraft-${item.id_item}`}
              className="text-black"
              checked={item.craft}
              onChange={(e) => handleCraftChange(item.id_item, e.target.checked)}
            />
          </div>
          {hoveredItem && hoveredItem.id_item === item.id_item && (
            <div className="absolute bg-white p-5 border" style={{ zIndex: 10 }}>
              <h3>Historique des Prix</h3>
              <Line
                data={{
                  labels: hoveredItem.history.map(h => new Date(h.date).toLocaleDateString()),
                  datasets: [
                    {
                      label: 'Prix (k)',
                      data: hoveredItem.history.map(h => h.price),
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    }
                  ]
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  },
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
