import React,{useState} from "react";

function AddCategorie(){
    const [categorydata,setCategorydata] = useState({categoryName:"",description:""})

    const handleChange = (e)=>{
        const newUserData =  {...categorydata,[e.target.name]:e.target.value}

        setCategorydata(newUserData)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        sendData()
    }
    async function sendData(){
        const myForm = document.getElementById("myForm")
        const formData = new FormData(myForm)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/addcategories`,{method:'POST',body:formData})
        const results = await response.json()

        console.log(results)
        
    }
    
    return(
      //JSX
      <>
    <h3>AddCategorie Page</h3> 
    <form onSubmit={handleSubmit} id="myForm">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Category Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="categoryName"  value={categorydata.categoryName} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="name" className="form-control" id="exampleInputPassword1" name="description" value={categorydata.description} onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      </>
    
    )
}
export default AddCategorie;