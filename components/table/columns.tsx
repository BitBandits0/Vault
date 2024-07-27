"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownCircle } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "@/constants";
import Link from "next/link";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type;
      return (
        <div className="w-10 m-5">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "File Name",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target={"_blank"}
          className={"text-blue-400 hover:text-blue-600"}
        >
          <ArrowDownCircle />
        </a>
      );
    },
  },
];
