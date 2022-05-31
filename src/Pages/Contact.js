import React,{useState}from "react";

function Contact(){
  const [selectedFile, setSelectedFile] = useState()
  const [fileName, setIsFileName] = useState("")
  const changeImage = (e) => {
    setSelectedFile(e.target.files[0])
    setIsFileName(e.target.files[0].name)
  }
  console.log(selectedFile)
  console.log(fileName)
  const handleSubmit=async(e)=>{
   const formData = new FormData()
   formData.append('file',selectedFile)
   formData.append('fileName',fileName)
   console.log( formData.append('File',selectedFile))
   const response = await fetch (`${process.env.REACT_APP_API_URL}/uploadImage`,{method:"POST",body:formData})
   const results = await response.json()
   console.log(results)
  }

    return(
      //JSX
      <>

      <h3>Contact Page</h3>   
         <div className="mb-3">
    <label htmlFor="formFile" className="form-label">Default file input example</label>
    <input className="form-control" type="file" id="formFile" onChange={changeImage} />
    </div>
      <button onClick={handleSubmit}>Submit</button>
   
      </>
    )
}
export default Contact;