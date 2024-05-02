import React from 'react'

export const Table = ({ columns, data, onRowClick, title }) => {
  const getColumnValue = (row, key) => {
    if (!key.includes('.')) {
      return row[key]; // if there are no dots in the key, return the value directly
    }
    const keys = key.split('.'); // divide the key into parts
    let value = row;

    for (let k of keys) {
      value = value[k]; // access each nested property
    }
    return value; // display the final value
  };
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <table className="w-full border-collapse rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-800 text-sm">
            {columns && columns.map((column) => (
              <th className="py-2 px-4 border border-gray-300">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick(row)}
              className={row.status === 'inactive' ? 'bg-gray-100' : ''}
            >
              {columns && columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="py-2 px-4 border border-gray-300 cursor-pointer"
                >
                  {getColumnValue(row, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

