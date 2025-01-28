import React from "react";


function people(){
    <div>
        <h2>Community Members</h2>
        <ul>
            {filteredusers.map(user =>(
                <li key={user.id}>
                    <strong>{user.name} </strong>
                    <strong>{user.phoneno}</strong>
                    <strong>{user.occupation}</strong>
                    <strong>{user.communityname}</strong>
                </li>
            )

            )}
        </ul>
    </div>

}

export default people;