'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Page() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:3001/stuff/shopping`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function resetItem() {
    try {
      const response = await axios.put(`http://localhost:3001/stuff/shopping/reset`);
      if (response.status === 200) {
        fetchData();  // Recharge les données après la réinitialisation
      }
    } catch (error) {
      console.error('Error reset:', error.message);
    }
  }

  let total = 0;
  let nbItem = 0;
  data.forEach(item => {
    total += (item.nbWanted * item.price_1);
    nbItem += item.nbWanted;
  });

  return (
    <div>
      <h1>Shopping Page</h1>

      <p>Total: {total}</p>
      <p>NbItem: {nbItem}</p>

      <button type="button" onClick={resetItem}>Reset!</button>

      {data.map((item) => (
        <div key={item._id} className="flex p-10" style={{ border: '1px solid #ccc' }}>
          <Image
            src={item.img_url ? `/images/${item.img_url}` : `/images/example.jpg`}
            alt="image dofus"
            width="64"
            height="64"
            className="mr-10"
          />
          <div>
            <p>
              <span className="mr-5">{item.name}</span>
              <span className="mr-5">Nb wanted: {item.nbWanted}</span>
              <span className="mr-5">Prix/u: {item.price_1}k</span>
              <span className="mr-5">Prix: {item.nbWanted * item.price_1}k</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
