import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import fanPageData from './fanPageData.json';
import Navbar from '../../components/navbar/Navbar';
import FanPageCard from './fanpageCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './fanpage.css';

const Fanpage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset page when search term changes
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedFaculty('');
    setSelectedDepartment('');
    setPage(1); // Reset page when category changes
  };

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    setPage(1); // Reset page when faculty changes
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setPage(1); // Reset page when department changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let filteredData = [];

  if (selectedCategory === 'All') {
    // Show all data
    filteredData = Object.values(fanPageData).flatMap(item =>
      Array.isArray(item) ? item : Object.values(item).reduce((acc, val) => acc.concat(val), [])
    );

    // Filter by search term if it exists
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.FB.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  } else if (selectedCategory === 'คณะ' && selectedFaculty) {
    // Filter by faculty
    filteredData = fanPageData[selectedCategory][selectedFaculty].filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // If department is selected, filter further
    if (selectedDepartment) {
      filteredData = filteredData.filter((item) =>
        item.department.toLowerCase().includes(selectedDepartment.toLowerCase())
      );
    }
  } else {
    // Filter by selected category
    if (Array.isArray(fanPageData[selectedCategory])) {
      filteredData = fanPageData[selectedCategory].filter((item) =>
        item.FB.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (typeof fanPageData[selectedCategory] === 'object') {
      filteredData = Object.values(fanPageData[selectedCategory]).reduce((acc, val) => acc.concat(val), []);
      filteredData = filteredData.filter((item) =>
        item.FB.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <div className='title-fanpage'>แฟนเพจของมหาวิทยาลัยและคณะต่างๆ <hr/></div>
      <div className="custom-container">
        <div className="filter-section">
          <TextField
            id="search-textfield"
            label="ค้นหา"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            className='input-filter-fanpage'
          />
          <div className='select-filter-fanpage'>
            <FormControl fullWidth variant="outlined" className='category-fanpage'>
              <InputLabel id="category-select-label">เลือกหมวดหมู่</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="เลือกหมวดหมู่"
              >
                <MenuItem key="all" value="All">All</MenuItem>
                {Object.keys(fanPageData).map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {selectedCategory === 'คณะ' && (
            <>
              <div className='select-filter-fanpage'>
                <FormControl fullWidth variant="outlined" className='category-fanpage'>
                  <InputLabel id="faculty-select-label">เลือกคณะ</InputLabel>
                  <Select
                    labelId="faculty-select-label"
                    id="faculty-select"
                    value={selectedFaculty}
                    onChange={handleFacultyChange}
                    label="เลือกคณะ"
                  >
                    {Object.keys(fanPageData[selectedCategory]).map((faculty, index) => (
                      <MenuItem key={index} value={faculty}>
                        {faculty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='select-filter-fanpage'>
                <FormControl fullWidth variant="outlined" className='category-fanpage'>
                  <InputLabel id="department-select-label">เลือกสาขา</InputLabel>
                  <Select
                    labelId="department-select-label"
                    id="department-select"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    label="เลือกสาขา"
                  >
                    {selectedFaculty && fanPageData[selectedCategory][selectedFaculty].map((department, index) => (
                      <MenuItem key={index} value={department.name}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </>
          )}
        </div>
        <div className="fanpage-grid">
          {paginatedData.map((item, index) => (
            <FanPageCard key={index} item={item} />
          ))}
        </div>
        <Stack className='Pagination-fanpage' >
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handlePageChange}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Fanpage;
