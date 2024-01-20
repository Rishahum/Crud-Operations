import React, { useState, useEffect } from 'react';

import './Add.css'
import { useNavigate } from 'react-router-dom';

const Add = () => {
//   const API_URL = 'http://localhost:2000';


  const [country, setCountry] = useState('');
  const navigate=useNavigate()
  const [capital, setCapital] = useState('');
  const back = async()=>{
    navigate('/second')
  }
  const addItem = async () => {
    let result= await fetch("http://localhost:2000",{
        method: 'post',
        body:JSON.stringify({country, capital}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    result = await result.json()
    navigate('/second')
  };

  return (
    <div>
    <div className='add-upper'>
      <div>
        <label>Country's Name</label>
        <input type="text" name="country" value={country} onChange={(e)=>{setCountry(e.target.value)}} />
      </div>
      <div>
        <label>Capital's Name</label>
        <input type="text" name="capital" value={capital} onChange={(e)=>{setCapital(e.target.value)}} />
      </div>
    </div>

      <div className='add-lower'>
        <button className='button-update' onClick={addItem}>Add</button>
        <button className='button-cancel' onClick={back}>Cancel</button>
      </div>
    </div>
  );
};

export default Add;
