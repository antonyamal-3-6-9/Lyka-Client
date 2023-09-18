import React from 'react'


const ProfileSideBar = ({options, setOptions}) => {
    return (
        <>
            <div className='card p-3 rounded-0 d-flex'>
               <a onClick={() => setOptions("orders")} href='#'><p className='h6 m-2 text-center'>My Orders</p></a>
                <a onClick={() => setOptions("profile")} href="#"><p className='h6 m-3 text-center'>Personal Information</p></a>
                <a onClick={() => setOptions("address")} href='#'><p className='h6 m-3 text-center'>Manage Addressess</p></a>
            </div>
        </>
    )
}

export default ProfileSideBar