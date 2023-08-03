import React, { useEffect, useState } from "react";
import axios from "axios";
import "../home.scss";

const Category = () => {
  const API_BASE_URL = "http://localhost:8000/category/";

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
    <div id="root-container">
      <div className="row">
        <div className="top-bar">
          <ul className="categories">
            {data.map((item) => (
              <li
                onMouseEnter={() => {
                  setRootId(item.root_id);
                }}
                key={item.root_id}
              >
                <a href="#">{item.name}</a>
                <ul className="subcategories">
                  {mainData.map((mainItem) =>
                    rootid && mainItem.root === rootid ? (
                      <li
                        onMouseEnter={() => {
                          setMainId(mainItem.main_id);
                        }}
                        key={mainItem.main_id}
                      >
                        <a href="#">{mainItem.name}</a>
                        <ul className="sub-subcategories">
                          {subData.map((subItem) =>
                            mainId && subItem.main === mainId ? (
                              <li key={subItem.sub_id}>
                                <a href="#">{subItem.name}</a>
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
