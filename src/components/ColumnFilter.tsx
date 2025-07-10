// eslint-disable-next-line
export const Filter = ({ column }: { column: any }) => {
  const columnFilterValue = column.getFilterValue() ?? '';

  return (
    <input
      className="mt-1 p-1 rounded bg-gray-600 text-white w-full"
      type="text"
      value={columnFilterValue}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Filter...`}
    />
  );
};
