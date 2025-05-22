"use client";

import type { TicketSearchResultType } from "@/lib/queries/getTicketSearchResults";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CheckCircle, ChevronLeft, ChevronRight, XCircle } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  data: TicketSearchResultType;
};

type RowType = TicketSearchResultType[0];

export default function TicketTable({ data }: Props) {
  const router = useRouter();

  const columnHeaderArray: Array<keyof RowType> = [
    "title",
    "firstName",
    "lastName",
    "email",
    "ticketDate",
    "tech",
    "completed",
  ];

  const columnHelper = createColumnHelper<RowType>();

  const snColumn = columnHelper.display({
    id: "sn",
    header: "ID",
    cell: ({ row }) => {
      return `#${row.original.id}`;
    },
  });

  const columns = [
    snColumn,
    ...columnHeaderArray.map((columnName) => {
      return columnHelper.accessor(
        (row) => {
          const value = row[columnName];
          if (columnName === "ticketDate" && value instanceof Date) {
            return value.toISOString().split("T")[0];
          }

          if (columnName === "completed") {
            return value ? "COMPLETED" : "OPEN";
          }
          return value;
        },
        {
          id: columnName,
          header: columnName[0].toUpperCase() + columnName.slice(1),
          cell: ({ getValue }) => {
            const value = getValue();
            if (columnName === "completed") {
              return (
                <div className="grid place-content-center">
                  {value === "OPEN" ? (
                    <XCircle className="text-red-500 w-5 h-5" />
                  ) : (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  )}
                </div>
              );
            }
            return value;
          },
        }
      );
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="mt-6 rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGrp) => (
              <TableRow key={headerGrp.id}>
                {headerGrp?.headers.map((header) => (
                  <TableHead key={header.id} className="bg-secondary">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table?.getRowModel().rows.map((row) => (
              <TableRow
                key={row?.id}
                className="cursor-pointer hover:bg-border/25 dark:bg-ring/40"
                onClick={() =>
                  router.push(`/tickets/form?ticketId=${row?.original?.id}`)
                }
              >
                {row?.getVisibleCells().map((cell) => (
                  <TableCell key={cell?.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex basis-1/3 items-center">
          <p className="whitespace-nowrap font-bold">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} ${
              table.getFilteredRowModel().rows.length !== 1
                ? "total results"
                : "result"
            }]`}
          </p>
        </div>

        <div className="space-x-1">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
