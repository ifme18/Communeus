import React from "react";

function community(){
    <div>
        <form onsubmit={handleonsubmit}>
            <input type="text"
            value={communityName}
            onChange={(e) => setcommunityName(e.target.value)} 
            placeholder="Community Name"
            required
             />
             <input type="text"
             value={location}
             onChange={(e)=>setLocationName(e.target.value)} />
        </form>
        <ul>Community list</ul>
    </div>

}
export default community;