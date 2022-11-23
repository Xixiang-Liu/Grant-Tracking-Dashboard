import React from "react";

const ReadOnlyRow = ({ record, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td style={{border: '1px solid #ccc'}}>{new Date(record.date).toLocaleDateString() || record.date}</td>
      <td style={{border: '1px solid #ccc'}}>{record.vendor}</td>
      <td style={{border: '1px solid #ccc'}}>{record.amount}</td>
      <td style={{border: '1px solid #ccc'}}>{record.category}</td>
      <td style={{border: '1px solid #ccc'}}>{record.account}</td>
      <td style={{border: '1px solid #ccc'}}>{record.program}</td>
      <td style={{border: '1px solid #ccc'}}>{record.account_group}</td>
      <td style={{border: '1px solid #ccc'}}>{record.budget < 0 ? "" : record.budget}</td>
      <td style={{border: '1px solid #ccc'}}>{record.description}</td>
      <td style={{border: '1px solid #ccc'}}>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, record)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(record.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;