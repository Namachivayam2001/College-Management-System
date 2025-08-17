import React from 'react';

const DataTable = ({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  showActions = true,
  emptyMessage = "No data available"
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.label}</th>
            ))}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id || index}>
              {columns.map(column => (
                <td key={column.key}>
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
              {showActions && (
                <td className="actions">
                  {onEdit && (
                    <button 
                      className="action-btn edit"
                      onClick={() => onEdit(item)}
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      className="action-btn delete"
                      onClick={() => onDelete(item)}
                    >
                      🗑️
                    </button>
                  )}
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
