import './Table.css';

// eslint-disable-next-line
export const Filter = ({ column }: { column: any }) => {
  const columnFilterValue = column.getFilterValue() ?? '';

  return (
    <input
      className="filter-input"
      type="text"
      value={columnFilterValue}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Filter..."
    />
  );
};
