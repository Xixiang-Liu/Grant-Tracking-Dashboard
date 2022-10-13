import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "../mock-data.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

const Edit = () => {
  const [records, setRecords] = useState(data);
  const [addFormData, setAddFormData] = useState({
    date: "",
    vendor: "",
    amount: "",
    category: "",
    account: "",
    program: "",
    account_group: "",
    budget:"",
    description:"",
  });

  const [editFormData, setEditFormData] = useState({
    date: "",
    vendor: "",
    amount: "",
    category: "",
    account: "",
    program: "",
    account_group: "",
    budget:"",
    description:"",
  });

  const [editRecordId, setEditRecordId] = useState(null);

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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newRecord = {
      id: nanoid(),
      date: addFormData.date,
      vendor: addFormData.vendor,
      amount: addFormData.amount,
      category: addFormData.category,
      account: addFormData.account,
      program: addFormData.program,
      account_group: addFormData.account_group,
      budget: addFormData.budget,
      description: addFormData.description,
    };

    const newRecords = [...records, newRecord];
    setRecords(newRecords);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedRecord = {
      id: editRecordId,
      date: editFormData.date,
      vendor: editFormData.vendor,
      amount: editFormData.amount,
      category: editFormData.category,
      account: editFormData.account,
      program: editFormData.program,
      account_group: editFormData.account_group,
      budget: editFormData.budget,
      description: editFormData.description,
    };

    const newRecords = [...records];

    const index = records.findIndex((record) => record.id === editRecordId);

    newRecords[index] = editedRecord;

    setRecords(newRecords);
    setEditRecordId(null);
  };

  const handleEditClick = (event, record) => {
    event.preventDefault();
    setEditRecordId(record.id);

    const formValues = {
      date: record.date,
      vendor: record.vendor,
      amount: record.amount,
      category: record.category,
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

  const handleDeleteClick = (recordId) => {
    const newRecords = [...records];

    const index = records.findIndex((record) => record.id === recordId);

    newRecords.splice(index, 1);

    setRecords(newRecords);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Categroy</th>
              <th>Account</th>
              <th>Program</th>
              <th>Account Group</th>
              <th>Budget</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <Fragment>
                {editRecordId === record.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    record={record}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

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
        <input
          type="text"
          name="category"
          required="required"
          placeholder="Enter a category..."
          onChange={handleAddFormChange}
        />
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Edit;