"use client";

import type { selectCustomerSchemaType } from "@/zod-schema/customer";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  XCircle,
  MoreVertical,
} from "lucide-react";

import Filter from "@/components/react-table/Filter";
import { usePolling } from "@/hooks/usePolling";

type Props = {
  data: selectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  usePolling(3000, searchParams.get("searchText"));

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams]);

  const columnHeaderArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
    "createdAt",
  ];

  const columnHelper = createColumnHelper<selectCustomerSchemaType>();

  const ActionsCell = ({
    row,
  }: CellContext<selectCustomerSchemaType, unknown>) => {
    return (
      <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>x
              <Link
                href={`/tickets/form?customerId=${row.original.id}`}
                className="w-full"
                prefetch={false}
              >
                New Ticket
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link
                href={`/customers/form?customerId=${row.original.id}`}
                className="w-full"
                prefetch={false}
              >
                Edit Customer
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const columns = [
    ...columnHeaderArray.map((columnName) =>
      columnHelper.accessor((row) => row[columnName], {
        id: columnName,
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="pl-1 w-full flex justify-between cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {columnName[0].toUpperCase() + columnName.slice(1)}
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        ),
        cell: (info) => {
          const value = info.getValue();

          if (columnName === "active") {
            return value ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <XCircle className="text-red-500 w-5 h-5" />
            );
          }

          if (columnName === "createdAt" && value instanceof Date) {
            return value.toISOString().split("T")[0];
          }

          return String(value ?? "");
        },
      })
    ),
    columnHelper.display({
      id: "actions",
      cell: ActionsCell,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 8,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    if (pageCount <= currentPageIndex && currentPageIndex > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [table.getState().columnFilters]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGrp) => (
              <TableRow key={headerGrp.id}>
                {headerGrp.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`bg-secondary p-1 ${
                      header.id === "actions" ? "w-12" : ""
                    }`}
                  >
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter
                          column={header.column}
                          filteredRows={table
                            .getFilteredRowModel()
                            .rows.map((row) => row.getValue(header.column.id))}
                        />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-border/25 dark:bg-ring/40"
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest("[data-ignore-row-click]")) return;
                    // Add row click logic if needed
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center gap-1 flex-wrap">
        <p className="whitespace-nowrap font-bold">
          {`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}{" "}
          &nbsp;&nbsp;
          {`[${table.getFilteredRowModel().rows.length} ${
            table.getFilteredRowModel().rows.length !== 1
              ? "total results"
              : "result"
          }]`}
        </p>

        <div className="flex flex-wrap gap-1">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.refresh()}
          >
            Refresh Data
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => table.resetSorting()}
          >
            Reset Sorting
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => table.resetColumnFilters()}
          >
            Reset Filters
          </Button>

          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex - 1;
              table.setPageIndex(newIndex);
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", (newIndex + 1).toString());
              router.replace(`?${params.toString()}`, { scroll: false });
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              const newIndex = table.getState().pagination.pageIndex + 1;
              table.setPageIndex(newIndex);
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", (newIndex + 1).toString());
              router.replace(`?${params.toString()}`, { scroll: false });
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
