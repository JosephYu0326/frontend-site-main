import React,{useState,useEffect,useRef} from "react";
import Geocode from 'react-geocode'
import DatePicker from "react-datepicker";
import { useNavigate,useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function EditExhibition(){
    const params = useParams()
    console.log(params.exhibitionID)
    const[data,setDatas]=useState([])
    const[exhibitionDatValue,setExhibitionDatValue] = useState('')

    const exhibitionNameRef = useRef()
    const LocationRef = useRef()
    const LongitudeRef = useRef()
    const LatitudeRef = useRef()
    const exhibitionStartDateRef = useRef()
    const exhibitionEndDateRef = useRef()


    const fetchData = async()=>{
      try {
        const response = await fetch (`${process.env.REACT_APP_API_URL}/editExhibition/${params.exhibitionID}`)
        const results = await response.json();
        if(Array.isArray(data)){
          setDatas(results)
          console.log(results)
          const {exhibitionName,exhibitionStartDate,exhibitionEndDate,Location,Longitude,Latitude} = results[0]
          console.log(exhibitionName)
          exhibitionNameRef.current.value = exhibitionName
          setExhibitionDatValue(`${exhibitionStartDate} - ${exhibitionEndDate}`)
          exhibitionStartDateRef.current.value=exhibitionStartDate
          exhibitionEndDateRef.current.value = exhibitionEndDate
          LocationRef.current.value = Location
          LongitudeRef.current.value = Longitude
          LatitudeRef.current.value = Latitude
    

        }
      } catch (e) {
        console.log(e.message)
        
      }
    }
    useEffect(()=>{
      fetchData();
    },[])
 
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
                const addExhibitionForm = document.getElementById('editExhibitionForm')
                const formData = new FormData(addExhibitionForm)
                const response = await fetch(`${process.env.REACT_APP_API_URL}/editExhibition/${params.exhibitionID}`,{method:"PUT",body:formData})
                const results = await response.json()
                console.log(results)
                if (results.ok === true){
                    alert('修改成功')
                    navigate('/about')
                }else{
                    alert('修改失敗')
                }
              

            } catch (e) {
                console.log(e)
                
            }
        }


     



    return(
        //JSX
        <>
      <h3>EditExhibition Page</h3> 
      <form  id="editExhibitionForm" onSubmit={handleSubmit} >

     
    <div className="mb-3">
      <label htmlFor="exhibitionName" className="form-label">Exhibition Name</label>
      <input type="text" className="form-control" id="exhibitionName" name="exhibitionName"  onChange={handleChange} ref={exhibitionNameRef}/>
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
            onChange={(update,e) => {
              setDateRange(update);
              e.target.value = update
              setExhibitionDatValue(e.target.value)
              console.log(e.target.value)
            }}
            isClearable={true}
            className="form-control"
            value={exhibitionDatValue}
          />
          <input type="hidden" id="startDate" name="exhibitionStartDate" onChange={handleChange} ref={exhibitionStartDateRef}/>
          <input type="hidden"  id="endDate" name="exhibitionEndDate" onChange={handleChange} ref={exhibitionEndDateRef}/>

    </div>
    </div>
    <div className="mb-3 ">
      <label htmlFor="exhibitionLocation" className="form-label">Location</label>
      <input type="text" className="form-control" id="exhibitionLocation" name="exhibitionLocation" onChange={handleChange} ref={LocationRef}/>
      <button  className="btn btn-primary mt-3" onClick={LocationSearch} >搜尋</button>
    </div>
    <div className="d-flex ">
        
    <div className="me-3">
    <label htmlFor="exhibitionLongitude" className="form-label">Longitude</label>
      <input type="text" className="form-control" id="exhibitionLongitude" name="exhibitionLongitude"   onChange={handleChange} ref={LongitudeRef} />
    </div>
    <div className=" mb-3">
    <label htmlFor="exhibitionLatitude" className="form-label">Latitude</label>
      <input type="text" className="form-control" id="exhibitionLatitude" aria-describedby="emailHelp" name="exhibitionLatitude"   onChange={handleChange} ref={LatitudeRef}  />
    </div>
    
    </div>
    <button type="submit" className="btn btn-primary" onClick={()=>{
      document.getElementById('startDate').value = formDate(startDate)
          document.getElementById('endDate').value = formDate(endDate)
    }}>Edit</button>
  </form>
        </>
      
      )
}
export default EditExhibition;