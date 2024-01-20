import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Secondpage.css'
const Secondpage = () => {
  
    const navigate = useNavigate()
    const [rows, setRows] = useState([]);
    const [isShowPop, setIsShowPop] = useState(new Array(rows.length).fill(false));
    useEffect(()=>{
        const apiurl= "http://localhost:2000/"
        axios.get(apiurl)
        .then((res)=>{
            setRows(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    const handleDelete=async (id, index)=>{
      let result = await fetch(`http://localhost:2000/${id}`, {
      method: 'DELETE',
    });
      result= await result.json()
      if(result){
        alert('record is deleted')
        const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);

      const updatedIsShowPop = [...isShowPop];
      updatedIsShowPop[index] = false;
      setIsShowPop(updatedIsShowPop);
      }
    }
    const handleEdit=(id)=>{
      navigate(`/edit/${id}`)
    }
    const handleAdd =()=>{
      navigate('/post')
    }
    const home=()=>{
      navigate('/')
    }
    const showDelete=(index)=>{
      const updatedIsShowPop = [...isShowPop];
      updatedIsShowPop[index] = true;
      setIsShowPop(updatedIsShowPop);
    }
    const handleClosePopUp=(index)=>{
      const updatedIsShowPop = [...isShowPop];
      updatedIsShowPop[index] = false;
      setIsShowPop(updatedIsShowPop);
    }
  return (
    <div>
        <div className="flex">
         <button className='button' onClick={handleAdd}>Add Country</button>
         <button className='button' onClick={home}>Home</button>
        </div>
        <h1>List of countries</h1>
        <table>
            <thead>
                <th>Name</th>
                <th>Capital</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
               {rows.length===0?(<div>nothing</div>):(
                
                rows.map((row, index)=>(
                  
                    <tr key={row.id}>
                    <td>{row.country}</td>
                    <td>{row.capital}</td>
                    <td className='btn-edit'>
                      {/* <button onClick={() => handleEdit(row._id)}>
                        Edit</button> */}
                    <Link to={`/edit/${row._id}`}>Edit</Link>
                    </td>
                    
                    <td className='btn-delete' >
                      <button onClick={()=>{showDelete(index)}}>Delete</button>
                      {isShowPop[index]?
                        <div className='pop-up'>
                          <h5>Are you sure, you want to delete?</h5>
                          <div className='popup-buttons'>
                          <button onClick={()=>{handleDelete(row._id, index)}}>Delete</button>
                          <button onClick={()=>{handleClosePopUp(index)}}>Cancel</button>
                          </div>

                        </div>:
                        ("")}
                      {/* <button  onClick={()=>{handleDelete(row._id)}}>Delete</button> */}
                      
                    </td>
                    
                  </tr>
                  
              
                  
                  
                 
                ))
               )}
            </tbody>
        </table>
        
    </div>
  )
}

export default Secondpage
