import React,{useEffect,useState} from 'react';
import axios from 'axios';
const UploadImage = ({ userId ,reloadPage}) => {
    const [file, setFile] = useState(undefined);
    const [notifications, setNotifications] = useState({});
    const IMAGE_TYPES = ["image/jpeg", "image/png"];
    const onUploadImage = () => {
        if(!file) {
            setNotifications({
                message: "Please select an Image!"
            });
            return false;
        }

        if (!IMAGE_TYPES.includes(file.type)) {
            setNotifications({
                message: "Only Images are allowed. Please select an Image."
            });
            return false;
        }
        const formData = new FormData();

        formData.append("imageFile", file, file.name);
        axios.post(`http://localhost:50001/api/v1/images/upload/${userId}`, formData).then(resp => {
            console.log(resp);
            setNotifications({
                message: resp.data.message
            });
            // else setMessage({ message: resp?.data?.message });
            document.getElementById("exampleFile").value="";
            setFile(undefined);
            reloadPage && reloadPage();
        });
    }
    const onCancel = () => {

    }
    const handleChange = e => {
        console.log("file data",e.target.files[0]);
        const files = e.target.files[0];
        setNotifications({});
        if(files && !IMAGE_TYPES.includes(files.type)) {
            console.log('not format');
            setNotifications({
                message: "Only Images are allowed. Please select an Image."
            });
            return false;
        }
        console.log('uploading');
        setFile(files);
    }


    return <>
        <div className =" w3-container ">
        <hr />
            {
                notifications && notifications.message && <span>{notifications.message}</span>
                
            }
            <form className="form w3-container w3-card-4 w3-center w3-border"style={{width:'450px'}}>
             <h2>upload image</h2>
                 <div className ="">
                    <label className= "w3-text-blue">select image</label>
                    <input className=  "file" type="file"  name="file" id="exampleFile" onChange={handleChange} />
                    <button className ="button" onClick={onUploadImage}>Upload</button>
                    <button className= "button"onClick={onCancel}>Cancel</button>   
                    
                </div> 
                 
            </form>
            </div>
    </>
};

export default UploadImage;








