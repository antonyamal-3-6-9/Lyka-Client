import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const EditProductNav = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/admin/catalog");
  };

  return (
    <>
      <div className="d-flex">
        <Button onClick={handleCancel}>Go Back</Button>
      </div>
    </>
  );
};

export default EditProductNav;
