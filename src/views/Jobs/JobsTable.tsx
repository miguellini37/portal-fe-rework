import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { ColumnFilter } from '@tanstack/react-table';
import { IJobPayload } from '../../api/job';
import { Link } from 'react-router-dom';
import { Filter } from '../../components/Table/ColumnFilter';
import '../../components/Table/Table.css';

interface JobsTableProps {
  jobs: IJobPayload[];
  onView: (job: IJobPayload) => void;
  fullTable?: boolean;
}

export const JobsTable: React.FC<JobsTableProps> = ({ jobs, onView, fullTable = false }) => {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    companyName: !!fullTable,
    industry: !!fullTable,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const columns: ColumnDef<IJobPayload>[] = [
    {
      header: 'Company',
      accessorFn: (row) => row.company?.companyName ?? 'N/A',
      id: 'companyName',
      cell: (info) => {
        const company = info.row.original.company;
        return company ? (
          <Link to={`/company/${company.id}`} className="link">
            {company.companyName}
          </Link>
        ) : (
          'N/A'
        );
      },
    },
    {
      header: 'Industry',
      accessorFn: (row) => row.company?.industry ?? 'N/A',
      id: 'industry',
      cell: (info) => {
        return info.row.original.company?.industry ?? 'N/A';
      },
    },
    {
      header: 'Position',
      accessorKey: 'position',
      cell: (info) => info.getValue() || 'N/A',
    },
    {
      header: 'Location',
      accessorKey: 'location',
      cell: (info) => info.getValue() || 'N/A',
    },
    {
      header: 'Salary',
      accessorKey: 'salary',
      cell: (info) => info.getValue() || 'N/A',
    },
    {
      header: '',
      id: 'actions',
      cell: ({ row }) => (
        <button className="btn" onClick={() => onView(row.original)}>
          View
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: jobs,
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
      {jobs.length === 0 && <p className="table-empty">No jobs posted for this company yet.</p>}
    </div>
  );
};
