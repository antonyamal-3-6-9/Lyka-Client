import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import DropDown from "./ListItems/Dropdown";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const ProductListMenu = ({
  filterData,
  setFilterData,
  initiateFilter,
  initiateSort,
  revert,
  searchData,
  setSearchData,
  initiateSearch,
}) => {
  const BASE_URL = "http://127.0.0.1:8000/category/";
  const [category, setCategory] = useState({
    root: [],
    main: [],
    sub: [],
  });
  const [loading, setLoading] = useState(false);

  const [selectedData, setSelectedData] = useState({
    rootId: "",
    mainId: "",
  });

  const [isApplied, setIsApplied] = useState(false);

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

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleCheck = () => {
    if (
      filterData.rootId.length <= 5 &&
      filterData.mainId.length <= 5 &&
      filterData.subId.length <= 5
    ) {
      console.log("category needed");
      return;
    }
    initiateFilter();
    setIsApplied(true);
  };

  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleConfirmSearch = () => {
    setIsApplied(true);
    initiateSearch();
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-2">
          <TextField
            label="Select Root"
            value={filterData.rootId}
            name="rootId"
            onChange={handleChange}
            fullWidth
            select
            variant="standard"
          >
            {category.root.map((root) => (
              <MenuItem value={root.root_id}>{root.name}</MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-lg-2">
          <TextField
            label="Select Main"
            value={filterData.mainId}
            name="mainId"
            onChange={handleChange}
            select
            variant="standard"
            fullWidth
          >
            {category.main.map((main) =>
              main.root === selectedData.rootId ? (
                <MenuItem key={main.main_id} value={main.main_id}>
                  {main.name}
                </MenuItem>
              ) : null
            )}
          </TextField>
        </div>
        <div className="col-lg-2">
          <TextField
            label="Select Sub"
            value={filterData.subId}
            name="subId"
            select
            onChange={handleChange}
            fullWidth
            variant="standard"
          >
            {category.sub.map((sub) => sub.main === selectedData.mainId ? (
              <MenuItem value={sub.sub_id}>{sub.name}</MenuItem>
            ) : null)}
          </TextField>
        </div>
        <div className="col-lg-1 d-flex align-items-center justify-content-center">
          <Button
            sx={{
              color: "#294B29",
            }}
            onClick={() => {
              handleCheck();
            }}
          >
            Apply
          </Button>
        </div>
        <div className="col-lg-1 d-flex align-items-center justify-content-center">
          <DropDown initiateSort={initiateSort} />
        </div>
        <div className="col-lg-3">
          <div className="d-flex">
            <TextField
              type="search"
              label="Search for Products"
              variant="standard"
              onChange={handleSearchChange}
              value={searchData}
              name="searchData"
            />
            <IconButton
              style={{ marginTop: "15px", color: "#294B29" }}
              onClick={handleConfirmSearch}
            >
              <SearchIcon />
            </IconButton>
            {isApplied && (
              <Button
                sx={{
                  color: "#294B29",
                }}
                onClick={() => {
                  revert();
                  setIsApplied(false);
                }}
              >
                Revert
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListMenu;
