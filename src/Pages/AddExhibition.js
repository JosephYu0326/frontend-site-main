import React,{useState,useRef} from "react";
import Geocode from 'react-geocode'
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function AddExhibition(){
 
    const LocationSearch = (e)=>{
        e.preventDefault()
        const Result = document.getElementById('exhibitionLocation')
        const Latitude = document.getElementById('exhibitionLatitude')
        const Longitude = document.getElementById('exhibitionLongitude')
        console.log(Result.value)
        Geocode.setApiKey(
            `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY1}`
          )
          Geocode.setLanguage('zh-TW')
          Geocode.setRegion('tw')
          Geocode.setLocationType('ROOFTOP')
          Geocode.enableDebug()
          Geocode.fromAddress(Result.value).then(
            (response) => {
              const { lat, lng } =
                response.results[0].geometry.location
              console.log(lat, lng)
              Longitude.value = lng
              Latitude.value = lat
            },
            (error) => {
              console.error(error)
              Longitude.value = "查無資料，請重新搜尋"
              Latitude.value =  "查無資料，請重新搜尋"
            }
          )
    }
        const [dateRange, setDateRange] = useState([null, null]);
        const [startDate, endDate] = dateRange;
        const formDate = (startDate)=>{
            let fromatted_date = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate()
            return fromatted_date
        }
        const [addExhibitiondata,setAddExhibitiondata] = useState({exhibitionName:"",exhibitionStartDate:"",exhibitionEndDate:"",exhibitionLocation:"",exhibitionLongitude:"",exhibitionLatitude:""})

        const handleChange = (e)=>{
            const newExhibitionData = {...addExhibitiondata,[e.target.name]:e.target.value}
            setAddExhibitiondata(newExhibitionData)
        }
        const handleSubmit = (e)=>{
            e.preventDefault()
            sendData()
        }
        const navigate = useNavigate(); 
        const sendData = async ()=>{
            try {
                const addExhibitionForm = document.getElementById('addExhibitionForm')
                const formData = new FormData(addExhibitionForm)
                const response = await fetch(`${process.env.REACT_APP_API_URL}/addExhibition`,{method:"POST",body:formData})
                const results = await response.json()
                console.log(results)
                if (results.insertId > 0){
                    alert('新增成功')
                    navigate('/about')
                }else{
                    alert('新增失敗')
                }
              

            } catch (e) {
                console.log(e)
                
            }
        }


        



    return(
        //JSX
        <>
      <h3>AddExhibition Page</h3> 
      <form  id="addExhibitionForm" onSubmit={handleSubmit} >

     
    <div className="mb-3">
      <label htmlFor="exhibitionName" className="form-label">Exhibition Name</label>
      <input type="text" className="form-control" id="exhibitionName" name="exhibitionName"  onChange={handleChange} />
    </div>
    <div className="mb-3 d-flex">
    <div className="me-3">

      <label htmlFor="exhibitionStartDate" className="form-label">Start Date ~ End Date</label>
      <DatePicker
            dateFormat="yyyy-MM-dd"
            selectsRange={true}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              
            }}
            isClearable={true}
            className="form-control"
          />
          <input type="hidden" id="startDate" name="exhibitionStartDate" onChange={handleChange}/>
          <input type="hidden"  id="endDate" name="exhibitionEndDate" onChange={handleChange}/>

    </div>
    </div>
    <div className="mb-3 ">
      <label htmlFor="exhibitionLocation" className="form-label">Location</label>
      <input type="text" className="form-control" id="exhibitionLocation" name="exhibitionLocation"  onChange={handleChange}/>
      <button  className="btn btn-primary mt-3" onClick={LocationSearch} >搜尋</button>
    </div>
    <div className="d-flex ">
        
    <div className="me-3">
    <label htmlFor="exhibitionLongitude" className="form-label">Longitude</label>
      <input type="text" className="form-control" id="exhibitionLongitude" name="exhibitionLongitude"   onChange={handleChange}  />
    </div>
    <div className=" mb-3">
    <label htmlFor="exhibitionLatitude" className="form-label">Latitude</label>
      <input type="text" className="form-control" id="exhibitionLatitude" aria-describedby="emailHelp" name="exhibitionLatitude"   onChange={handleChange}  />
    </div>
    
    </div>
    <button type="submit" className="btn btn-primary" onClick={()=>{document.getElementById('startDate').value = formDate(startDate)
          document.getElementById('endDate').value = formDate(endDate)}} >Submit</button>
  </form>
        </>
      
      )
}
export default AddExhibition;