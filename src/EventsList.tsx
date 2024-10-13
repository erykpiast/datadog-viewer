import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";

import { ActionEventOverview } from "./ActionEventOverview";
import { LongTaskEventOverview } from "./LongTaskEventOverview";
import { ResourceEventOverview } from "./ResourceEventOverview";
import { UnknownEventOverview } from "./UnknownEventOverview";
import { ViewEventOverview } from "./ViewEventOverview";
import { VitalEventOverview } from "./VitalEventOverview";

import * as texts from "./text-copy.json" assert { type: "json" };

import "./EventsList.css";
import { getEventName } from "./event";

type Event = {
  date: number;
  application: { id: string };
  service: string;
  session: { id: string };
} & (
  | {
      type: "view";
      view: {
        is_active: boolean;
        loading_type: string;
        name: string;
        url: string;
      };
    }
  | {
      type: "action";
      action: { id: string; target: { name: string }; type: string };
    }
  | {
      type: "resource";
      resource: {
        id: string;
        name: string;
        render_blocking_status: string;
        type:
          | "binary"
          | "css"
          | "fetch"
          | "font"
          | "document"
          | "image"
          | "js"
          | "other"
          | "video"
          | "xhr";
        url: string;
      };
    }
  | {
      type: "vital";
      vital: {
        name: string;
        description: string;
        duration: number;
        type: string;
      };
    }
  | {
      type: "long_task";
      long_task: { id: string; duration: number };
    }
);

export function EventsList({
  events,
  onSelect,
  selectedEvent,
}: {
  events: Array<Event>;
  onSelect: (event: Event) => void;
  selectedEvent: Event | null;
}): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        id: "overview",
        header: texts.eventsList.columns.overview.header,
        accessorFn: (row: Event) => {
          const name = getEventName(row);
          switch (row.type) {
            case "vital":
              return <VitalEventOverview event={row} name={name} />;
            case "action":
              return <ActionEventOverview event={row} name={name} />;
            case "long_task":
              return <LongTaskEventOverview event={row} name={name} />;
            case "view":
              return <ViewEventOverview event={row} name={name} />;
            case "resource":
              return <ResourceEventOverview event={row} name={name} />;
            default:
              return <UnknownEventOverview event={row} name={name} />;
          }
        },
        cell: (info) => info.getValue() as React.ReactNode,
        enableSorting: true,
      },
      {
        id: "relativeTime",
        header: texts.eventsList.columns.relativeTime.header,
        accessorKey: "relativeTime",
        cell: ({ getValue }) => `${(getValue() as number).toFixed(0)} ms`,
      },
      {
        id: "service",
        header: texts.eventsList.columns.service.header,
        accessorKey: "service",
      },
      {
        id: "session",
        header: texts.eventsList.columns.sessionId.header,
        accessorKey: "session.id",
      },
    ],
    [events]
  );

  const table = useReactTable({
    data: events,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="events-list">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                <div
                  {...{
                    onClick: header.column.getToggleSortingHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "desc" ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )
                  ) : (
                    ""
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            className={row.original === selectedEvent ? "selected" : ""}
            key={row.id}
            onFocus={() => onSelect(row.original)}
            tabIndex={1}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        <tr key="last">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
