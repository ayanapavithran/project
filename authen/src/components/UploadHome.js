import React, { useEffect, useState } from 'react';
import UploadImage from './UploadImage';
import LoadImages from './LoadImages';

const Home = (props) => {

    const [uploadImages, setUploadImages] = useState(false);
    const [userDetails, setUserDetails] = useState(undefined);
    const [reload, setReload] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const reloadPage = () => {
        setReload(false);
        const timeout = setTimeout(()=> {
            setReload(true);
            clearTimeout(timeout);
        }, 1000);
    }
    useEffect(() => {
        const storage = localStorage.getItem("userDetails");
        if(storage) {
            setUserDetails(JSON.parse(storage));
        }else setRedirect(true);
    }, [])

    if(redirect)
        props.history.push("/login");
    
    let name = "";
    let id = "";
    if(userDetails) {
        console.log("user details",userDetails);
        name = userDetails && userDetails.fname;
        if(userDetails.lname)
            name += (" " +userDetails.lname)
        id = userDetails.id;
    }

    const onLogout = () => {
        localStorage.clear();
        setRedirect(true);
    }

    return (<>
        <div className="W3-Container">
            <div>
                <span>Hello <b>{name}</b>, Welcome Home</span>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <button className="" onClick={() => setUploadImages(!uploadImages)}>Upload Image</button>
                <button className="" onClick={onLogout}>Logout</button>
            </div>
            {uploadImages && <UploadImage userId={id}  reloadPage={reloadPage} />}
            {reload &&<LoadImages userId={id} />}
        </div>
    </>);
};

export default Home;