import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import './Edit.css'
import './Edit.css'
const Edit = () => {
    const navigate=useNavigate()
    const params= useParams();
    const [country, setCountry] = useState('');
    const [capital, setCapital] = useState('');
    useEffect(()=>{
        information()
    },[])
    const information=async(req,res)=>{
        let result= await fetch(`http://localhost:2000/${params.id}`)
        result = await result.json()
        // console.log(result);
        setCapital(result.capital)
        setCountry(result.country)
    }
    const handleEdit=async(req,res)=>{
        let result= await fetch(`http://localhost:2000/${params.id}`,{
            method: 'PUT',
            body:JSON.stringify({country, capital}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json()
        // console.log(result)
        navigate('/second')
    }
    const handleCancel=()=>{
        navigate('/second')
    }

  return (
    <div className='edit'>
        <div className='edit-upper'>
            <div>
                <label>Country's Name</label>
                <input type="text" name="country" value={country} onChange={(e)=>{setCountry(e.target.value)}} />
            </div>
            <div>
                <label>Capital's Name</label>
                <input type="text" name="capital" value={capital} onChange={(e)=>{setCapital(e.target.value)}} />
            </div>
        </div>
         <div className='edit-lower'>
            <button className='button-edit' onClick={handleEdit}>Update</button>
            <button className='button-cancel' onClick={handleCancel}>Cancel</button>
         </div>

      
      
    </div>
  )
}

export default Edit