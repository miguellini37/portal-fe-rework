import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { ColumnFilter } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Filter } from '../../components/Table/ColumnFilter';
import { getCompanies, ICompanyPaylod } from '../../api/company';
import '../../components/Table/Table.css';

export const CompanySearch: React.FC<any> = () => {
  const [companies, setCompanies] = useState<ICompanyPaylod[]>([]);

  useEffect(() => {
    getCompanies().then((data) => setCompanies(data));
  }, []);

  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const columns: ColumnDef<ICompanyPaylod>[] = [
    {
      header: 'Company',
      accessorFn: (row) => row.companyName,
      id: 'companyName',
      cell: (info) => {
        const company = info.row.original;
        return company ? (
          <Link to={`/company/${company.id}`} className="text-blue-600 hover:underline">
            {company.companyName}
          </Link>
        ) : (
          'N/A'
        );
      },
    },
    {
      header: 'Industry',
      accessorFn: (row) => row.industry ?? 'N/A',
      id: 'industry',
      cell: (info) => {
        return info.row.original.industry ?? 'N/A';
      },
    },
    {
      header: 'Jobs',
      accessorFn: (row) => row?.jobs?.filter((j) => j.type == 'job').length ?? '0',
      id: 'jobs',
      // cell: (info) => {
      //   return info.row.original.jobCount ?? 'N/A';
      // },
    },
    {
      header: 'Internships',
      accessorFn: (row) => row?.jobs?.filter((j) => j.type == 'internship').length ?? '0',
      id: 'internships',
    },
    {
      header: 'NIL Oppurtunities',
      accessorFn: (row) => row?.jobs?.filter((j) => j.type == 'nil').length ?? '0',
      id: 'nil',
    },
  ];

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnVisibility, columnFilters },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="th">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="tr">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="td">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {companies.length === 0 && (
          <p className="text-gray-300 text-center mt-4">No companies available for search.</p>
        )}
      </div>
    </div>
  );
};
