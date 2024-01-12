import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const CategoryRoot = (props) => {
  return (
    <>
      {props.data.map((item) => {
        return (
          <>
            <div className="col-lg-2 p-0 ms-5">
                <a
                onMouseEnter={() => {
                    props.setHover(true)
                    props.setRootId(item.root_id)
                }}
                >{item.name}</a>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CategoryRoot;
