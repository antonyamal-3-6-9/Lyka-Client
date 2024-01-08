import React, { useEffect, useState } from "react";
import axios from "axios";
import "../home.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Category = () => {
  
  const API_BASE_URL = "http://localhost:8000/category/";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [mainData, setMain] = useState([]);
  const [subData, setSub] = useState([]);

  const [rootid, setRootId] = useState(0);
  const [mainId, setMainId] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "root/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));

    axios
      .get(API_BASE_URL + "main/")
      .then((response) => setMain(response.data))
      .catch((error) => console.error(error));

    axios
      .get(API_BASE_URL + "sub/")
      .then((response) => setSub(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleClose = () => {
    setIsHovered(false);
  };

  return (
    <div
      id="root-container"
      className="pb-3"
      onMouseOver={handleHover}
      onMouseOut={handleClose}
      style={isHovered ? { marginTop: "68px" } : { marginTop: "30px" }}
    >
      <div className="row">
        <div className="top-bar">
          <ul
            className="categories"
            onMouseOver={handleHover}
            onMouseOut={handleClose}
          >
            {data.map((item) => (
              <li
                onMouseEnter={() => {
                  setRootId(item.root_id);
                }}
                key={item.root_id}
              >
                <Button
                  variant="text"
                  onClick={() => {
                    navigate(`/product/root/${item.name}`);
                    localStorage.setItem("cat_id", item.root_id);
                    window.location.reload();
                  }}
                >
                  {item.name}
                </Button>
                <ul className="subcategories">
                  {mainData.map((mainItem) =>
                    rootid && mainItem.root === rootid ? (
                      <li
                        onMouseEnter={() => {
                          setMainId(mainItem.main_id);
                        }}
                        key={mainItem.main_id}
                      >
                        <Button
                          variant="text"
                          onClick={() => {
                            navigate(`/product/main/${mainItem.name}`);
                            localStorage.setItem("cat_id", mainItem.main_id);
                            window.location.reload();
                          }}
                        >
                          {mainItem.name}
                        </Button>
                        <ul className="sub-subcategories">
                          {subData.map((subItem) =>
                            mainId && subItem.main === mainId ? (
                              <li key={subItem.sub_id}>
                                <Button
                                  variant="text"
                                  onClick={() => {
                                    navigate(`/product/sub/${subItem.name}`);
                                    localStorage.setItem(
                                      "cat_id",
                                      subItem.sub_id
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  {subItem.name}
                                </Button>
                              </li>
                            ) : null
                          )}
                        </ul>
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
