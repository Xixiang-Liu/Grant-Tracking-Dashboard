import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";
import { handleQueryDB, handleInsertDB, handleUpdate, handleDelete, handleFilter, handleDeleteAll } from '../util/DataHelper'
const emptyData = {
  date: "",
  vendor: "",
  amount: "",
  category: "",
  account: "",
  program: "",
  account_group: "",
  budget:"",
  description:"",
}
const emptyFilterData = {
  account_filter: "",
  program_filter: "",
  account_group_filter: ""
}
const categories = ['-- Category --', 'EXPENSE', 'REVENUE']
export const Edit = () => {
  const [records, setRecords] = useState([]);
  const [addFormData, setAddFormData] = useState(emptyData);

  const [editFormData, setEditFormData] = useState(emptyData);

  const [editRecordId, setEditRecordId] = useState(null);

  const [filterData, setFilterData] = useState(emptyFilterData);

  const [selectedCategory, setSelectedCategory] = useState('');

  const [editCategory, setEditCategory] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);

  
  const queryData = async () => {
    try {
      const result = await handleQueryDB()
      const filteredData = result.data.filter(item => item.date)
      setRecords(filteredData)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    queryData()
  }, [])

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const newRecord = {
        id: nanoid(),
        date: addFormData.date,
        vendor: addFormData.vendor,
        amount: addFormData.amount,
        category: selectedCategory,
        account: addFormData.account,
        program: addFormData.program,
        account_group: addFormData.account_group,
        budget: addFormData.budget,
        description: addFormData.description,
      };

      const newRecords = [...records, newRecord];
      const res = await handleInsertDB(newRecord)
      if (res?.status === 200) {
        alert('Added successfully!')
      }
      setRecords(newRecords);
    } catch(e) {
      console.error(e, handleAddFormSubmit.name)
    }

  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedRecord = {
      id: editRecordId,
      date: editFormData.date,
      vendor: editFormData.vendor,
      amount: editFormData.amount,
      category: editCategory,
      account: editFormData.account,
      program: editFormData.program,
      account_group: editFormData.account_group,
      budget: editFormData.budget,
      description: editFormData.description,
    };

    const newRecords = [...records];

    const index = records.findIndex((record) => record.id === editRecordId);

    newRecords[index] = editedRecord;
    await handleUpdate(editedRecord)
    setRecords(newRecords);
    setEditRecordId(null);
  };

  const handleEditClick = (event, record) => {
    event.preventDefault();
    setEditRecordId(record.id);
    const dateObj = new Date(record.date)
    const month = (dateObj.getMonth() + 1)
    const formValues = {
      date: dateObj.getFullYear() + '-' + (month < 10 ? ('0' + month) : month) + '-' + dateObj.getDate() ,
      vendor: record.vendor,
      amount: record.amount,
      category: record.category.trim(),
      account: record.account,
      program: record.program,
      account_group: record.account_group,
      budget: record.budget,
      description: record.description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditRecordId(null);
  };

  const handleDeleteClick = async (recordId) => {
    const newRecords = [...records];

    const index = records.findIndex((record) => record.id === recordId);

    await handleDelete(recordId)
    newRecords.splice(index, 1);

    setRecords(newRecords);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFilterData = { ...filterData };
    newFilterData[fieldName] = fieldValue;
    setFilterData(newFilterData);
  }

  const handleFilterClick = async () => {
    const account = filterData.account_filter
    const program = filterData.program_filter
    const accountGroup = filterData.account_group_filter
    const res = await handleFilter(account, program, accountGroup)
    let tempAmount = 0
    res.forEach(item => {
      tempAmount += parseFloat(item.amount || '0')
    })
    setTotalAmount(tempAmount.toFixed(2))
    setRecords(res)
  }

  const handleResetClick = async () => {
    setFilterData(emptyFilterData)
    queryData()
    setTotalAmount(0)
  }

  const handleDeleteAllClick = async () => {
    if (window.confirm("Are you sure to delete all data?")) {
      await handleDeleteAll()
      setFilterData(emptyFilterData)
      await queryData()
      alert("Deleted successfully!")
    } 
  }

  return (
    <div className="app-container">

      <h2>Add a Record</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="date"
          name="date"
          required="required"
          placeholder="mm/dd/yyyy"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="vendor"
          required="required"
          placeholder="Enter an vendor..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="amount"
          required="required"
          placeholder="Enter an amount..."
          onChange={handleAddFormChange}
        />
        {/* <input
          type="text"
          name="category"
          required="required"
          placeholder="Enter a category..."
          onChange={handleAddFormChange}
        /> */}
        <select 
            name = "category"
            style={{ height: 22 }}
            onChange={(event) => setSelectedCategory(event.target.value)}
            value={selectedCategory}
        >
            {
                categories.map(program => (
                    <option value={program}>{program}</option>
                ))
            }
        </select>
        <input 
          type = "text"
          name = "account"
          required = "required"
          placeholder="Enter an account..."
          onChange={handleAddFormChange}
        />
        <input 
          type = "text"
          name = "program"
          required = "required"
          placeholder="Enter an program..."
          onChange={handleAddFormChange}
        />
        <input 
          type = "text"
          name = "account_group"
          required = "required"
          placeholder="Enter an account group..."
          onChange={handleAddFormChange}
        />
        <input 
          type = "number"
          name = "budget"
          required = "required"
          placeholder="Enter a budget..."
          onChange={handleAddFormChange}
        />
        <input 
          type = "text"
          name = "description"
          placeholder="Enter description..."
          onChange={handleAddFormChange}
        />
        <button style={{width: '100px', marginLeft: '20px'}} type="submit">Add</button>
      </form>

      <div style={{marginTop: '3rem'}}>
        <h2>Filter</h2>
        <input 
          type = "text"
          name = "account_filter"
          placeholder="Enter an account to filter"
          onChange={handleFilterChange}
          value={filterData.account_filter}
        />
        <input 
          type = "text"
          name = "program_filter"
          placeholder="Enter an program to filter"
          onChange={handleFilterChange}
          value={filterData.program_filter}
        />
        <input 
          type = "text"
          name = "account_group_filter"
          placeholder="Enter an account group to filter"
          onChange={handleFilterChange}
          value={filterData.account_group_filter}
        />
        <button style={{width: '100px', marginLeft: '20px'}} onClick={handleFilterClick}>Filter</button>
        <button style={{width: '100px', marginLeft: '10px'}} onClick={handleResetClick}>Reset</button>
        <button style={{width: '100px', marginLeft: '10px'}} onClick={handleDeleteAllClick}>Delete All</button>

      </div>

      <form style={{marginTop: '2rem'}} onSubmit={handleEditFormSubmit}>
        {totalAmount > 0 && <h2>Total Amount: {totalAmount}</h2>}
        {records?.length > 0 &&
          <table>
            <thead>
              <tr>
                <th style={{border: '1px solid #000'}}>Date</th>
                <th style={{border: '1px solid #000'}}>Vendor</th>
                <th style={{border: '1px solid #000'}}>Amount</th>
                <th style={{border: '1px solid #000'}}>Category</th>
                <th style={{border: '1px solid #000'}}>Account</th>
                <th style={{border: '1px solid #000'}}>Program</th>
                <th style={{border: '1px solid #000'}}>Account Group</th>
                <th style={{border: '1px solid #000'}}>Budget</th>
                <th style={{border: '1px solid #000'}}>Description</th>
                <th style={{border: '1px solid #000'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <Fragment>
                  {editRecordId === record.id ? (
                    <EditableRow
                      key={record.id}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      categories={categories}
                      setSelectedCategory={setEditCategory}
                      editCategory={editCategory}
                    />
                  ) : (
                    <ReadOnlyRow
                      key={'readOnly' + record.id}
                      record={record}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        }
      </form>
    </div>
  );
};

