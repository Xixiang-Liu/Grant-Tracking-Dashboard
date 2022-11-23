import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  categories,
  setSelectedCategory,
  editCategory
}) => {
  return (
    <tr>
      <td>
        <input
          type="date"
          name="date"
          required="required"
          placeholder="mm/dd/yyyy"
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="vendor"
          required="required"
          placeholder="Enter an vendor..."
          value={editFormData.vendor}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          name="amount"
          required="required"
          placeholder="Enter an amount..."
          value={editFormData.amount}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <select 
            name = "category"
            style={{ height: 22 }}
            onChange={(event) => setSelectedCategory(event.target.value)}
            value={editCategory || editFormData.category}
        >
            {
                categories.map(program => (
                    <option value={program}>{program}</option>
                ))
            }
        </select>
      </td>
      <td>
        <input
          type = "text"
          name = "account"
          required = "required"
          placeholder="Enter an account..."
          value={editFormData.account}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type = "text"
          name = "program"
          required = "required"
          placeholder="Enter an program..."
          value={editFormData.program}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type = "text"
          name = "account_group"
          required = "required"
          placeholder="Enter an account group..."
          value={editFormData.account_group}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type = "number"
          name = "budget"
          required = "required"
          placeholder="Enter a budget..."
          value={editFormData.budget}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type = "text"
          name = "description"
          placeholder="Enter description..."
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;