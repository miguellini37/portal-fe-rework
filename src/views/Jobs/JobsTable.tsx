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
import { capitalize } from 'lodash';
import { Link } from 'react-router-dom';
import { Filter } from '../../components/ColumnFilter';

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
      header: 'Type',
      accessorKey: 'type',
      cell: (info) => capitalize(info.getValue() as string) || 'N/A',
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => onView(row.original)}
        >
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
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-gray-800 text-white rounded-lg">
        <thead className="bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left">
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
            <tr key={row.id} className="border-t border-gray-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.length === 0 && (
        <p className="text-gray-300 text-center mt-4">No jobs posted for this company yet.</p>
      )}
    </div>
  );
};
