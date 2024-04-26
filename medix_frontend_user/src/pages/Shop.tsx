import { useState } from "react";
import axios from "../api/axios";

const Shop = () => {
  
  const [userImage, setUserImage] = useState<File>();
  const [postMessage, setPostMessage] = useState("")

  const imageHandler = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{

    e.preventDefault();

    const formdata = new FormData();
    if(userImage !== undefined){

      formdata.append("MyImage", userImage)
      formdata.append("postMessage", postMessage)
    }
    try {
      const response = await axios.post('/product/imageUpload',formdata, 
      {
        headers:{
          'Content-Type':'multipart/form-data'
        }
      } )

        console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
      <form encType="multipart/form-data">
        <input type="text"  name="postMessage" onChange={e =>{setPostMessage(e.target.value)}} />
        <input type="file" name="MyImage"
        onChange={e =>{
          const files = e.target.files;
          if(files && files.length>0){
            setUserImage(files[0])
          }
        }}
        />
        <button onClick={e =>{imageHandler(e)}}>Submit</button>
      </form>
    </div>
  )
}

export default Shop