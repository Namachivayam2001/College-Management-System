import React from 'react';

const DataTable = ({ data, columns, actions = [], emptyMessage = 'No data found' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="data-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="table-header">
                {column.label}
              </th>
            ))}
            {actions.length > 0 && <th className="table-header">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="table-row">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="table-cell">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="table-cell actions-cell">
                  <div className="action-buttons">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className="action-btn"
                        onClick={() => action.action(row)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
