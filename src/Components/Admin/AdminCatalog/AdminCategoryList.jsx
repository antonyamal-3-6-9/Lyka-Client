import React, { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Button, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import AddMainCategory from "./AdminAddCategory/AddMainCategory";
import AddRootCategory from "./AdminAddCategory/AddRootCategory";
import AddSubCategory from "./AdminAddCategory/AddSubCategory";
import AdminEditMain from "./AdminEditCategory/AdminEditMain";
import AdminEditRoot from "./AdminEditCategory/AdminEditRoot";
import AdminEditSub from "./AdminEditCategory/AdminEditSub";
import axios from "axios";

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

  const [editRoot, setEditRoot] = useState(false);
  const [editMain, setEditMain] = useState(false);
  const [editSub, setEditSub] = useState(false);

  const [editData, setEditData] = useState({
    root: {
      rootId: "",
      name: "",
    },
    main: {
      name: "",
      mainId: "",
      rootId: "",
    },
    sub: {
      name: "",
      mainId: "",
      subId: "",
    },
  });

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

  const handleOpenEdit = (
    name = "",
    id = "",
    parent_id = "",
    type = "root"
  ) => {
    if (type === "main") {
      setEditData({
        ...editData,
        main: { ...editData.main, name: name, mainId: id, rootId: parent_id },
      });
      setEditMain(true);
    } else if (type === "root") {
      setEditData({
        ...editData,
        root: { ...editData.root, name: name, rootId: id },
      });
      setEditRoot(true);
    } else if (type === "sub") {
      setEditData({
        ...editData,
        sub: { ...editData.sub, subId: id, mainId: parent_id, name: name },
      });
      setEditSub(true);
    } else {
      return;
    }
  };

  const handleDelete = async (option, id) => {
    if (option === "root") {
      const token = localStorage.getItem('token')
      try {
        setLoading(true);
        const rootDeleteResponse = await axios.delete(
          `${BASE_URL}lyka-admin/root/delete/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        let tempRoot = [...category.root];
        tempRoot = tempRoot.filter((root) => root.root_id !== id);
        setCategory({ ...category, root: [...tempRoot] });
      } catch (error) {
        setLoading(false);
        alert(error.response.data.message);
      }
    } else if (option === "main") {
      const token = localStorage.getItem('token')
      try {
        setLoading(true)
        const mainDeleteResponse = await axios.delete(
          `${BASE_URL}lyka-admin/main/delete/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false)
        let tempMain = [...category.main];
        tempMain = tempMain.filter((main) => main.main_id !== id);
        setCategory({ ...category, main: [...tempMain] });
      } catch (error) {
        setLoading(false)
        alert(error.response.data.message);
      }
    } else if (option === "sub") {
      const token = localStorage.getItem('token')
      try {
        setLoading(true)
        const rootDeleteResponse = await axios.delete(
          `${BASE_URL}lyka-admin/sub/delete/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false)
        let tempSub = [...category.sub];
        tempSub = tempSub.filter((sub) => sub.sub_id !== id);
        setCategory({ ...category, sub: [...tempSub] });
      } catch (error) {
        setLoading(false)
        alert(error.response.data.message);
      }
    } else {
      alert("Invalid Option");
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
      {openRoot && (
        <AddRootCategory
          openRoot={openRoot}
          setOpenRoot={setOpenRoot}
          category={category}
          setCategory={setCategory}
          BASE_URL={BASE_URL}
          setLoading={setLoading}
        />
      )}
      {openMain && (
        <AddMainCategory
          category={category}
          setCategory={setCategory}
          openMain={openMain}
          setOpenMain={setOpenMain}
          BASE_URL={BASE_URL}
          setLoading={setLoading}
        />
      )}
      {openSub && (
        <AddSubCategory
          openSub={openSub}
          setOpenSub={setOpenSub}
          category={category}
          setCategory={setCategory}
          BASE_URL={BASE_URL}
          setLoading={setLoading}
        />
      )}
      {editRoot && (
        <AdminEditRoot
          openRoot={editRoot}
          setOpenRoot={setEditRoot}
          category={category}
          setCategory={setCategory}
          BASE_URL={BASE_URL}
          setLoading={setLoading}
          root={editData.root.name}
          rootId={editData.root.rootId}
        />
      )}
      {editMain && (
        <AdminEditMain
          openMain={editMain}
          setOpenMain={setEditMain}
          category={category}
          setCategory={setCategory}
          BASE_URL={BASE_URL}
          setLoading={setLoading}
          main={editData.main}
        />
      )}
      {editSub && (
        <AdminEditSub
          openSub={editSub}
          setOpenSub={setEditSub}
          category={category}
          setCategory={setCategory}
          BASE_URL={BASE_URL}
          setLoading={setLoading}
          sub={editData.sub}
        />
      )}
      <h5 className="h5 text-center text-dark mb-3">Categories</h5>
      <div className="row">
        <div className="col-lg-4">
          {category.root.length !== 0 ? (
            <>
              <div>
                <h6 className=" text-dark text-center mb-3">
                  Root Categories
                </h6>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    style={{ color: "#294B29" }}
                    onClick={() => {
                      setOpenRoot(true);
                    }}
                    startIcon={<AddIcon />}
                  >
                    Add New
                  </Button>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {category.root.map((r) => (
                    <div
                      style={{ border: "1px solid #789461", borderRadius: "15px", }}
                      className="p-2 mb-2 shadow"
                    >
                      <IconButton
                        onClick={() => {
                          handleDelete("root", r.root_id);
                        }}
                      >
                        <DeleteForeverIcon
                          style={{
                            fontSize: "1rem",
                            margin: "0",
                            padding: "0",
                            color: "#789461",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleOpenEdit(r.name, r.root_id);
                        }}
                      >
                        <EditIcon
                          style={{
                            fontSize: "1rem",
                            margin: "0",
                            padding: "0",
                            color: "#789461",
                          }}
                        />
                      </IconButton>
                      <Divider/>
                      <p key={r.root_id} className="h6 text-dark text-center m-0 p-0">
                        {r.name}
                      </p>
                    </div>
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
        </div>
        <div className="col-lg-4">
          {category.main.length !== 0 ? (
            <>
              <div>
                <h6 className="text-dark text-center mb-3">
                  Main Categories
                </h6>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    style={{ color: "#294B29" }}
                    onClick={() => setOpenMain(true)}
                    startIcon={<AddIcon />}
                  >
                    Add New
                  </Button>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {category.main.map((m) => (
                    <div
                      style={{ border: "1px solid #789461", borderRadius: "15px" }}
                      className="p-2 mb-2 shadow"
                    >
                      <IconButton
                        onClick={() => {
                          handleDelete("main", m.main_id);
                        }}
                      >
                        <DeleteForeverIcon
                          style={{
                            fontSize: "1rem",
                            margin: "0",
                            padding: "0",
                            color: "#789461",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleOpenEdit(m.name, m.main_id, m.root, "main");
                        }}
                      >
                        <EditIcon
                          style={{
                            fontSize: "1rem",
                            margin: "0",
                            padding: "0",
                            color: "#789461",
                          }}
                        />
                      </IconButton>
                      <p key={m.main_id} className=" h6 text-dark m-0 p-0">
                        {m.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center p-5">
                <h6 className="h6 text-center text-dark">
                  No Main Category Found
                </h6>
              </div>
            </>
          )}
        </div>
        <div className="col-lg-4">
          {category.sub.length !== 0 ? (
            <>
              <div>
                <h6 className="text-dark text-center mb-3">
                  Sub Categories
                </h6>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    style={{ color: "#294B29" }}
                    startIcon={<AddIcon />}
                    onClick={() => setOpenSub(true)}
                  >
                    Add New
                  </Button>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly">
                  {category.sub.map((s) => (
                    <div
                      style={{ border: "1px solid #789461", borderRadius: "15px" }}
                      className="p-2 mb-2 shadow"
                    >
                      <IconButton
                        onClick={() => {
                          handleDelete("sub", s.sub_id);
                        }}
                      >
                        <DeleteForeverIcon
                          style={{
                            fontSize: "1rem",
                            margin: "0",
                            padding: "0",
                            color: "#789461",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleOpenEdit(s.name, s.sub_id, s.main, "sub");
                        }}
                      >
                        <EditIcon
                          style={{
                            fontSize: "1rem",
                            margin: "0",
                            padding: "0",
                            color: "#789461",
                          }}
                        />
                      </IconButton>
                      <p key={s.sub_id} className="h6 text-dark m-0 p-0">
                        {s.name}
                      </p>
                    </div>
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
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
