import React, { useEffect, useState } from "react";
import axios from "axios";
import "../home.scss";
import { Button, Divider, styled, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Container = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Category = () => {
  const API_BASE_URL = "http://localhost:8000/category/";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [mainData, setMain] = useState([]);
  const [subData, setSub] = useState([]);

  const [rootid, setRootId] = useState(0);
  const [mainId, setMainId] = useState(0);

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



  return (

    <div
      // id="root-container"
      className=""
      style={{ }}
    >
      <div className="row m-0 p-0">
          <ul className="categories">
            {data.map((item) => (
              <li
                onMouseEnter={() => {
                  setRootId(item.root_id);
                }}
                key={item.root_id}
              >
                <Button variant="text" >
                  <Link
                    onClick={() => {
                      localStorage.setItem("cat_id", item.root_id);
                    }}
                    style={{color: "#16213E" }}
                    to={`/product/root/${item.name}`}
                  >
                    {item.name}
                  </Link>
                </Button>
                <ul className="subcategories">
                  {mainData.map((mainItem) =>
                    rootid && mainItem.root === rootid ? (
                      <li
                        onMouseEnter={() => {
                          setMainId(mainItem.main_id);
                        }}
                        key={mainItem.main_id}
                        style={{listStyleType: "none"}}
                      >
                      <Button>
                        <Link
                          onClick={() => {
                            localStorage.setItem("cat_id", mainItem.main_id);
                          }}
                          to={`/product/main/${mainItem.name}`}
                          style={{color: "#16213E" }}
                        >
                          {mainItem.name}
                        </Link>
                        </Button>
                        <ul className="sub-subcategories">
                          {subData.map((subItem) =>
                            mainId && subItem.main === mainId ? (
                              <li key={subItem.sub_id}>
                              <Button>
                                <Link
                                  onClick={() => {
                                    localStorage.setItem(
                                      "cat_id",
                                      subItem.sub_id
                                    );
                                  }}
                                  to={`/product/sub/${subItem.name}`}
                                  style={{color: "#16213E" }}
                                >
                                  {subItem.name}
                                </Link>
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

  );
};

export default Category;
