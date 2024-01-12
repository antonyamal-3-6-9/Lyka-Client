import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Notification = () => {
  const notifications = useSelector(
    (state) => state.customerAuth.customerNotifications
  );

  console.log(notifications)

  return (
    <>
      <div
        className="card"
        style={{
          height: "400px",
          width: "370px",
          position: "fixed",
          top: "80px",
          right: "3%",
          zIndex: "999",
          overflow: "scroll"
        }}
      >
        {notifications.length <= 0 ? (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <h6 className="h5 text-center text-dark">You do not have any notifications</h6>
            </div>
        ) : (
          <div className="row d-flex justify-content-center align-items-center ps-4">
              
<<<<<<< HEAD
              {notifications.map((not) =>  (<><hr></hr><p className="text-dark">{not.message} {not.time}</p><hr></hr></>))}

=======
              {notifications.map((not) =>  (<><hr></hr><p className="text-dark">{not.message}</p><hr></hr></>))}
              
>>>>>>> 7fea3a9b293183ba2a88d13f51cf2ae7cad7b6ac
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
