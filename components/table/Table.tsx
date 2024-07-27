"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { FileType } from "@/typings";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/store";
import { DeleteModal } from "../DeleteModal";
import { RenameModal } from "../RenameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setIsDeleteModalOpen, setFileId, setFilename, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.setIsDeleteModalOpen,
      state.setFileId,
      state.setFilename,
      state.setIsRenameModalOpen,
    ]);

  //* When clicking the delete modal, we are going to store the id of the file we are going to delete
  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  //* When clicking the rename modal, we are going to store the id of the file we are going to rename
  const openRenameModal = (fileId: string, filename: string) => {
    setFileId(fileId);
    setFilename(filename);
    setIsRenameModalOpen(true);
  };

  return (
    <div className="rounded-md m-5 border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal />
                <RenameModal />

                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {
                      //* The entire block of code from here to the finishing tag is all about correcting the edge cases
                      //* Here it filters the "timestamp" data obtained from firebase to neat and readable format
                      cell.column.id === "timestamp" ? (
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {(cell.getValue() as Date).toLocaleDateString()}
                          </div>

                          <div className="text-xs text-gray-500">
                            {(cell.getValue() as Date).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : cell.column.id === "filename" ? (
                        <p
                          onClick={() =>
                            //  console.log("Hello2")
                            openRenameModal(
                              (row.original as FileType).id,
                              (row.original as FileType).filename
                            )
                          }
                          className="flex items-center text-blue-800 dark:text-blue-300 hover:cursor-pointer"
                        >
                          {cell.getValue() as string}{" "}
                          <PencilIcon size={15} className="ml-2" />
                        </p>
                      ) : (
                        //* Till here
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )
                    }
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      //   console.log("Hello");
                      openDeleteModal((row.original as FileType).id);
                    }}
                  >
                    <Trash2Icon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Files to Fetch
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
