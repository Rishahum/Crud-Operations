import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import './Firstpage.css'
const Firstpage = () => {
    
    const navigate = useNavigate()
    const [data, setData]=useState([]);
    const [capital, setCapital]= useState()
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(()=>{
        const apiurl="http://localhost:2000/"
        axios.get(apiurl)
        .then((res)=>{
            setData(res.data)
            console.log(res.data.country)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    const handleCountryChange = (event) => {
        
        const selectedCapital = data.find((choice) => choice.country === event.target.value)?.capital ;
        setSelectedCountry(event.target.value);
        setCapital(selectedCapital);
      };
    const handlePage =()=>{
        navigate('/second')
    }
  return (
    <div className='firstpage'>
        <button className='button' onClick={handlePage} >Manage</button><br/>
        <select onChange={handleCountryChange} value={selectedCountry}>
            <option key="default" disabled value="">Selected country</option>
            {data.length===0?(<div>nothing</div>):
        
        (
           
            data.map((choice)=>(
            <option >{choice.country}</option>
            
        )))}</select>
        <h5>{capital}</h5>
    </div>
  )
}

export default Firstpage

