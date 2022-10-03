import React from "react";

const ReadOnlyRow = ({ record, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{record.date}</td>
      <td>{record.vendor}</td>
      <td>{record.amount}</td>
      <td>{record.category}</td>
      <td>{record.account}</td>
      <td>{record.program}</td>
      <td>{record.account_group}</td>
      <td>{record.budget}</td>
      <td>{record.description}</td>
      <td>
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