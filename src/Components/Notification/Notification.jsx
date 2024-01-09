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
          width: "350px",
          position: "absolute",
          top: "80px",
          right: "3%",
          zIndex: "999",
        }}
      >
        {notifications.length <= 0 ? (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <h6 className="h5 text-center text-dark">You do not have any notifications</h6>
            </div>
        ) : (
          <div className="row d-flex justify-content-center align-items-center ps-4">
            <ul>
              <hr></hr>
              {notifications.map((not) =>  (<li className="text-dark">{not.message}</li>))}
              <hr></hr>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
