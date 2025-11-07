import { useMemo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table"
import { useUserAccessesQuery, type UserAccess } from "@/entities/access"
import { useUIState } from "@/entities/ui-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Skeleton } from "@/shared/ui/skeleton"
import { AlertCircle, Trash2 } from "lucide-react"

export function MyAccessesPage() {
  const { t } = useTranslation()
  const { data: accesses, isLoading, isError } = useUserAccessesQuery()
  const { 
    selectedItems, 
    toggleItemSelection, 
    clearSelection, 
    isItemSelected 
  } = useUIState()

  // Clear selection when leaving the page
  useEffect(() => {
    return () => {
      clearSelection()
    }
  }, [])

  const columns = useMemo<ColumnDef<UserAccess>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={(e) => {
              const isChecked = e.target.checked
              table.toggleAllRowsSelected(isChecked)
              if (isChecked) {
                accesses?.forEach(access => toggleItemSelection(access.id))
              } else {
                clearSelection()
              }
            }}
            className="h-4 w-4 rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={isItemSelected(row.original.id)}
            onChange={() => toggleItemSelection(row.original.id)}
            className="h-4 w-4 rounded border-gray-300"
          />
        ),
      },
      {
        accessorKey: "systemName",
        header: t("myAccesses.systemName"),
        cell: (info) => (
          <div className="font-medium">{info.getValue() as string}</div>
        ),
      },
      {
        accessorKey: "role",
        header: t("myAccesses.role"),
        cell: (info) => (
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "expiresAt",
        header: t("myAccesses.expiresAt"),
        cell: (info) => {
          const date = new Date(info.getValue() as string)
          return (
            <div className="text-sm text-muted-foreground">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          )
        },
      },
    ],
    [t, accesses, isItemSelected, toggleItemSelection, clearSelection]
  )

  const table = useReactTable({
    data: accesses ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const selectedCount = selectedItems.size

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("myAccesses.title")}</h1>
          <p className="text-muted-foreground">
            {t("myAccesses.description")}
          </p>
        </div>
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("myAccesses.activeAccesses")}</CardTitle>
          <CardDescription>
            {t("myAccesses.activeDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingSkeleton />}

          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold">{t("myAccesses.loadError")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("myAccesses.tryAgain")}
              </p>
            </div>
          )}

          {!isLoading && !isError && accesses && accesses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{t("myAccesses.noAccesses")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("myAccesses.noAccessesDescription")}
              </p>
            </div>
          )}

          {!isLoading && !isError && accesses && accesses.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => {
                    const isSelected = isItemSelected(row.original.id)
                    return (
                      <TableRow 
                        key={row.id}
                        className={isSelected ? "bg-primary/5 border-l-4 border-l-primary" : ""}
                        onClick={() => toggleItemSelection(row.original.id)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
