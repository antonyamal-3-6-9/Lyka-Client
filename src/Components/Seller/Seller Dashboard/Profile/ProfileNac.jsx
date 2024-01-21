import React from "react";
import { Button } from "@mui/material";

const ProfileNav = (props) => {
  return (
    <>
      <div className="container-fluid d-flex">
        <Button onClick={() => props.setIsUpdatePassword(true)} style={{ color: "#3E3232"}}>
          Update Password
        </Button>

        <Button style={{ color: "#3E3232"}}>{props.isVerified ? "Verified" : "Not Verified"}</Button>
      </div>
    </>
  );
};

export default ProfileNav;
