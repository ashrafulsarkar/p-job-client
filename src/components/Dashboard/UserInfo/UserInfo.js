import React from 'react';
import useAuth from '../../../hooks/useAuth';
import './UserInfo.css';

const UserInfo = () => {
    const {user, userData} = useAuth();
    return (
        <div className="userinfo">
            {
                userData[0]?.profilePic && <div className='profile-pic'>
                <img src={`data:image/png;base64,${userData[0]?.profilePic}`} alt="" />
            </div>
            }
            <h2>User Information</h2>
            <div>
                <label htmlFor="name">Name</label>
                <input readOnly id="name" value={user.displayName} />
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input readOnly id="email" value={user.email} />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input readOnly id="phone" value={userData[0]?.phone} />
            </div>
            <div>
                <label htmlFor="area">Area</label>
                <input readOnly id="area" value={userData[0]?.area} />
            </div>
        </div>
    );
};

export default UserInfo;