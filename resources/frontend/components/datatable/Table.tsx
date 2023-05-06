import { flexRender } from '@tanstack/react-table'
import React from 'react'
import { Else, If, Then } from 'react-if'
import { AdonisTable } from 'resources/frontend/hooks/useAdonisTable'
import Pagination from './Pagination'
import RangeSelect from './RangeSelect'
import SearchBar from './SearchBar'

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ITableProps<T = any> {
  table: AdonisTable<T>
  fallbackMessage?: string
  extraHeaders?: React.ReactNode
}

const TableComponent: React.FC<ITableProps> = ({
  table,
  fallbackMessage = 'No Data',
  extraHeaders,
}) => {
  return (
    <div className="relative shadow-md sm:rounded-sm">
      <div className="py-4 flex flex-col md:flex-row justify-between">
        <RangeSelect
          value={table.getState().pagination.pageSize}
          onChange={(el) => {
            table.setPageSize(Number(el.currentTarget.value))
          }}
        />
        <div className="flex flex-col items-end lg:flex-row">
          {extraHeaders}
          <SearchBar
            onChange={(data: string) => {
              table.setGlobalFilter((old: any) => {
                return {
                  ...old,
                  search: data,
                }
              })
            }}
            value={table.getState().globalFilter?.search || ''}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-sm min-w-full max-w-[10vw]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={() => {
                      table.toggleAllRowsSelected()
                    }}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers
                  .filter((header) => header.depth !== 1)
                  .map((header) => {
                    return (
                      <th key={header.id} scope="col" className="px-6 py-3">
                        <div className="flex align-baseline">
                          <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <button
                                onClick={() => {
                                  header.column.toggleSorting()
                                }}
                                className={
                                  header.column.getIsSorted()
                                    ? 'text-blue-500 transition-colors duration-200'
                                    : 'transition-colors duration-200'
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-1 w-3 h-3"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 320 512"
                                >
                                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                                </svg>
                              </button>
                            )}
                          </span>
                        </div>
                      </th>
                    )
                  })
              )}
            </tr>
          </thead>
          <tbody>
            <If condition={table.getRowModel().rows.length}>
              <Then>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.original.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            checked={row.getIsSelected()}
                            value={(row.original as { id: string }).id}
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() => {
                              row.toggleSelected()
                            }}
                          />
                          <label htmlFor="checkbox-table-search-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id} className="px-6 py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </Then>
              <Else>
                <tr className="w-full flex p-5">
                  <td className="w-full flex">{fallbackMessage}</td>
                </tr>
              </Else>
            </If>
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </div>
  )
}

export default TableComponent
