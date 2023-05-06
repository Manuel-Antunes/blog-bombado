import React, { useMemo } from 'react'
import { AdonisTable } from 'resources/frontend/hooks/useAdonisTable'

interface PaginationProps<T = any> {
  table: AdonisTable<T>
}

const offset = 3

const Pagination: React.FC<PaginationProps> = ({ table }) => {
  const tableState = useMemo(() => table.getState(), [table.getState()])

  const pagesToShow = useMemo(() => {
    const lastPage = table.getPageCount()
    const pages: number[] = []
    let from = tableState.pagination.pageIndex + 1 - Math.ceil(offset / 2)
    if (from < 1) {
      from = 1
    }
    let to = from + offset - 1
    if (to > lastPage) {
      to = lastPage
    }
    while (from <= to) {
      pages.push(from)
      from++
    }
    return pages
  }, [tableState])

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-8">
      <span className="text-white dark:text-gray-400 items-center text-lg">
        Exibindo do{' '}
        <span className="font-semibold text-gray-500 dark:text-white">
          {1 + tableState.pagination.pageIndex * tableState.pagination.pageSize}
        </span>{' '}
        ao{' '}
        <span className="font-semibold text-gray-500 dark:text-white">
          {tableState.pagination.pageSize * (tableState.pagination.pageIndex + 1) > table.totalRows
            ? table.totalRows
            : tableState.pagination.pageSize * (tableState.pagination.pageIndex + 1)}
        </span>{' '}
        de <span className="font-semibold text-gray-500 dark:text-white">{table.totalRows}</span>{' '}
        Elementos
      </span>
      <nav aria-label="Page navigation example" className="flex justify-end mt-8 md:mt-0">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              type="button"
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              type="button"
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </button>
          </li>
          {pagesToShow?.map((page) => (
            <li key={page}>
              <button
                className={
                  page === tableState.pagination.pageIndex + 1
                    ? 'py-2 px-3 leading-tight border border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Próximo
            </button>
          </li>
          <li>
            <button
              type="button"
              className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              Fim
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
