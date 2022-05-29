import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";

function About(){
  const[data,setDatas] = useState([])

  const fetchData = async()=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/About`)
      const results = await response.json();
      if(Array.isArray(data)){
        setDatas(results)
      }
    } catch (e) {
      console.log(e.message)
      
    }
    
  }
  const navigate = useNavigate(); 
  useEffect(()=>{
    fetchData();
  },[])

  
    return(
      //JSX
      <>
      <div className="d-flex justify-content-between">
      <h3>Exhibition List</h3>
      <Link to="/addExhibition"><button className="btn btn-dark">Add Exhibition</button></Link>
      
      </div>
  
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>ExhibitionId</th>
      <th>ExhibitionName</th>
      <th>ExhibitionStartDate</th>
      <th>ExhibitionEndDate</th>
      <th>Location</th>
      <th>Longitude</th>
      <th>Latitude</th>
      <th>Edit or Delete</th>
    </tr>
  </thead>
  <tbody>
  {data.length > 0 && data.map((exhibition,i)=>{
    const {exhibitionID,exhibitionName,exhibitionStartDate,exhibitionEndDate,Location,Longitude,Latitude} = exhibition; 
      return(
          <tr  key={i}>
            <td>{exhibitionID}</td>
            <td>{exhibitionName}</td>
            <td>{exhibitionStartDate}</td>
            <td>{exhibitionEndDate}</td>
            <td>{Location}</td>
            <td>{Longitude}</td>
            <td>{Latitude}</td>
            <td>
            <button className="btn btn-danger me-3" onClick={(e)=>{
              e.preventDefault()

              if(window.confirm(`確定要刪除${exhibitionName}的展覽嗎`)){

              fetchDeleteData()
              async function fetchDeleteData(){
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/About/${exhibitionID}`,{method:"Delete"})
                    const results = await response.json()
                    console.log(results)
                    if(results.ok === true){
                      alert('刪除成功')
                      fetchData()
                      navigate('/about')
                    }else{
                      alert("刪除失敗")
                    }
                  } catch (e) {
                    console.log(e.message)

               }
              }
              }
            }}>Delete</button>
            <Link to={`/editExhibition/${exhibitionID}`}><button className="btn btn-secondary">Edit</button></Link>
            </td>
          </tr>
      )
   })}   
  </tbody>
</Table></>
    )
}
export default About;