'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function Home() {

  async function syncroData() {
    try {
      const response = await axios.post(`http://localhost:3001/import/all`);
      if (response.status === 200) {
        try {
          const response = await axios.post(`http://localhost:3001/import/calcule`);
        } catch (error) {
          console.error('Error calcule:', error.message);
        }
      }
    } catch (error) {
      console.error('Error import:', error.message);
    }
  }



  return (
    <>
      <p>home Page</p>

      <button type="button" onClick={syncroData}>Syncro!</button>
    </>
  );
}
