import React, { useState, useEffect } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, Button } from "@mui/material";
import AddMainCategory from "./AdminAddCategory/AddMainCategory";
import AddRootCategory from "./AdminAddCategory/AddRootCategory";
import AddSubCategory from "./AdminAddCategory/AddSubCategory";

const AdminCategory = () => {
  const BASE_URL = "http://127.0.0.1:8000/category/";
  const [category, setCategory] = useState({
    root: [],
    main: [],
    sub: [],
  });
  const [loading, setLoading] = useState(false);
  const [openRoot, setOpenRoot] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [openSub, setOpenSub] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryResponse = await axios.get(
        `${BASE_URL}lyka-admin/list/all/`
      );
      if (categoryResponse.status === 200) {
        setCategory({
          ...category,
          root: categoryResponse.data.root,
          main: categoryResponse.data.main,
          sub: categoryResponse.data.sub,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <AddRootCategory
        openRoot={openRoot}
        setOpenRoot={setOpenRoot}
        category={category}
        setCategory={setCategory}
        BASE_URL={BASE_URL}
        setLoading={setLoading}
      />{" "}
      <AddMainCategory
        category={category}
        setCategory={setCategory}
        openMain={openMain}
        setOpenMain={setOpenMain}
        BASE_URL={BASE_URL}
        setLoading={setLoading}
      />
      <AddSubCategory
        openSub={openSub}
        setOpenSub={setOpenSub}
        category={category}
        setCategory={setCategory}
        BASE_URL={BASE_URL}
        setLoading={setLoading}
      />
      <h5 className="h5 text-center text-dark mb-3">Categories</h5>
      <div className="row">
        <div className="col-lg-4">
          {category.root.length !== 0 ? (
            <>
              <div>
                <h6 className="h6 text-dark text-center mb-3">
                  Root Categories
                </h6>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {category.root.map((r) => (
                    <p
                      className="text-dark text-center m-0 p-0"
                      key={r.root_id}
                    >
                      {r.name}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center p-5">
                <h6 className="text-center h6 text-dark">
                  No Root Category Found
                </h6>
              </div>
            </>
          )}
          <div className="d-flex justify-content-center mt-3">
            <Button
              style={{ color: "#294B29" }}
              onClick={() => {
                setOpenRoot(true);
              }}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="col-lg-4">
          {category.main.length !== 0 ? (
            <>
              <div>
                <h6 className="h6 text-dark text-center mb-3">
                  Main Categories
                </h6>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {category.main.map((m) => (
                    <p
                      className="text-dark text-center m-0 p-0"
                      key={m.main_id}
                    >
                      {m.name}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center p-5">
                <h6 className="text-center h6 text-dark">
                  No Main Category Found
                </h6>
              </div>
            </>
          )}
          <div className="d-flex justify-content-center mt-3">
            <Button
              style={{ color: "#294B29" }}
              onClick={() => setOpenMain(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="col-lg-4">
          {category.sub.length !== 0 ? (
            <>
              <div>
                <h6 className="h6 text-dark text-center mb-3">
                  Sub Categories
                </h6>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {category.sub.map((s) => (
                    <p className="text-dark text-center m-0 p-0" key={s.sub_id}>
                      {s.name}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center p-5">
                <h6 className="text-center h6 text-dark text-center m-0 p-0">
                  No Sub Category Found
                </h6>
              </div>
            </>
          )}
          <div className="d-flex justify-content-center mt-3">
            <Button style={{ color: "#294B29" }}>Add New</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
