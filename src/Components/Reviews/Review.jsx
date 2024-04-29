import React, { useState } from "react";
import AddReviewModal from "./AddReview";
import ListReview from "./ListReview";
import { Button } from "@mui/material";

export default function Review({}) {
  
  const [userExists, setUserExists] = useState(false);
  const [addNew, setAddNew] = useState(false);

  return (
    <>
    <div className="m-3">

   
    
      <div className="container-fluid w-50 p-3" style={{border : "solid #E2F1F6 2px"}}>
        <div className="row m-3 me-0 ms-0">
          {userExists ? (
            <>
              <div className="col-lg-3">5 star</div>
              <div className="col-lg-9">
                Compact design, vibrant display. Impressive camera captures
                every detail. Swift performance, smooth multitasking.
                Long-lasting battery. Top-notch security features. Overall, a
                fantastic smartphone experience. Highly recommended!
              </div>
              <div className="col-lg-12">
                <Button variant="contained">Edit</Button>
              </div>
            </>
          ) : (
            <>
              <div>
                {!addNew ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setAddNew(true);
                    }}
                  >
                    Add a Review
                  </Button>
                ) : (
                  <div>
                    <AddReviewModal 
                      setAddNew={setAddNew}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="row ms-1">
          <ListReview />
        </div>
      </div>
      </div>
    </>
  );
}
