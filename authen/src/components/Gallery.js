import React, { useState } from 'react';
import LoadImages from './LoadImages';

const Gallery = props => {

    const [userId, setUserId] = useState(undefined);

    const handleChange = (value) => {
        if(!value) setUserId("");
        if(!isNaN(value)) setUserId(value);
    }

    return (<>
        <div className="w3-container w3-border-red">
            <div className= "w3-display w3-border w3-margin w3-padding">
                <div>
            <button className= "w3-button w3-right" onClick={() => props.history.push("/login")}>Goto Login</button>
                <h3>Gallery</h3>
                </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <hr/>
                <form className ="">
                    <label className ="">User Id</label>
                    <input className type="text" value={userId} name="userId" id="userId" onChange={e => handleChange(e.target.value)} placeholder="user id" />
                    <p >
                        Enter User Id to search images.
                    </p>
                </form>
            
            <LoadImages userId={userId} /></div>
            </div>
        </div>
    </>);
};

export default Gallery;