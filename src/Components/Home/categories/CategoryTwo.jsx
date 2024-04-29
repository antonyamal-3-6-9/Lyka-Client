import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled, Paper, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import "../home.css";

const Container = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(),
  color: theme.palette.text.secondary,
}));

export default function Cat({}) {
  const [categories, setCategories] = useState({
    root: [],
    main: [],
    sub: [],
  });

  const [notExist, setNotExist] = useState(null);

  const BASE_URL = "http://localhost:8000/category/lyka-admin/list/all/";

  const fetchCat = async () => {
    try {
      const catResponse = await axios.get(BASE_URL);
      setCategories(catResponse.data);
    } catch (error) {
      alert("error");
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const handleRootHover = () => {
    document.getElementById("target").style.transform = "scale(1)";
    document.getElementById("trigger").style.transform = "scale(0.1)";
    document.getElementById("trigger").style.transition =
      "all 0.3s ease-in-out";
    document.getElementById("target").style.transition = "all 0.3s ease-in-out";
    setTimeout(() => {
      document.getElementById("target").style.display = "flex";
    }, 300);
  };

  const handleRootLeave = () => {
    const targetElement = document.getElementById("target");
    targetElement.style.transform = "scale(0.1)";
    targetElement.style.transition = "all .3s ease-in-out";
    document.getElementById("trigger").style.transform = "scale(1)";
    document.getElementById("trigger").style.transition =
      "all 0.3s ease-in-out";
    setTimeout(() => {
      targetElement.style.display = "none";
    }, 300);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12" id="trigger-container">
            <div
              className="d-flex justify-content-center"
              style={{ backgroundColor: "#07A0F4" }}
            >
              <Link onMouseEnter={handleRootHover} id="trigger">
                <CategoryIcon style={{ color: "#234456" }} />
              </Link>
            </div>

            <div id="target" onMouseLeave={handleRootLeave}>
              <Container>
                <div className="row p-3">
                  <Link className="text-dark h6 text-center" to="/product/all">
                    List All
                  </Link>
                  {categories.root.map((r, index) => (
                    <div
                      className="col-lg-4 p-3"
                      // style={{
                      //   borderLeft: index !== 0 ? "1px dotted #07A0F4" : "none",
                      // }}
                      key={r.root_id}
                    >
                      <div className="d-flex justify-content-center">
                        <Link
                          className="text-dark h6"
                          onClick={() => {
                            localStorage.setItem("cat_id", r.root_id);
                          }}
                          to={`/product/root/${r.name}`}
                        >
                          {r.name}
                        </Link>
                      </div>
                      <Divider />
                      <div className="row mt-3">
                        {categories.main
                          .filter((m) => m.root === r.root_id)
                          .map((m) => (
                            <div className="col-lg-4" key={m.main_id}>
                              <div className="d-flex justify-content-start">
                                <Link
                                  className="text-dark"
                                  style={{ fontWeight: "bold" }}
                                  to={`/product/main/${m.name}`}
                                  onClick={() => {
                                    localStorage.setItem("cat_id", m.main_id);
                                  }}
                                >
                                  {m.name}
                                </Link>
                              </div>
                              <Divider />
                              <div className="row mt-3">
                                {categories.sub
                                  .filter((s) => s.main === m.main_id)
                                  .map((s) => (
                                    <div className="col-lg-12" key={s.sub_id}>
                                      <div className="d-flex justify-content-start">
                                        <Link
                                          className="text-dark"
                                          to={`/product/main/${s.name}`}
                                          onClick={() => {
                                            localStorage.setItem(
                                              "cat_id",
                                              s.sub_id
                                            );
                                          }}
                                        >
                                          {s.name}
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
