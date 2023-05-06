import { Table, TableOptions, TableState, useReactTable } from '@tanstack/react-table'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { MySwal } from '../services/swal'

const initialData = {
  limit: 10,
  search: '',
  sortDirection: 'asc',
  sortField: '',
  customData: {},
  page: 1,
}

type InitialDataType = typeof initialData

export interface PaginationMeta {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string
  previous_page_url: any
}

export type AdonisTable<T> = Table<T> & {
  totalRows: number
  fetch: () => Promise<void>
  deleteRow: (id: number) => void
}

export const useAdonisTable = <T,>(
  url: string,
  options: Omit<TableOptions<T>, 'data'>,
  partialDefault: Partial<InitialDataType> = initialData
): AdonisTable<T> => {
  //* constants
  const defaultData = partialDefault ? { ...initialData, ...partialDefault } : initialData

  //* states
  const [data, setData] = useState<T[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const [pageCount, setPageCount] = useState<number>(options.pageCount || 0)

  const [totalRows, setTotalRows] = useState<number>(0)

  //* lifecycle
  const table = useReactTable({
    ...options,
    data,
    pageCount,
    onStateChange: (state) => {
      setTableState(state)
    },
  }) as AdonisTable<T>

  const [tableState, setTableState] = useState<TableState>(table.initialState)

  //* effects

  useEffect(() => {
    if (table) {
      fetch()
    }
  }, [tableState.sorting, tableState.globalFilter, tableState.pagination])

  useEffect(() => {
    if (loading) {
      if (!MySwal.isVisible()) {
        MySwal.fire({
          title: 'Carregando',
          html: 'Aguarde...',
          timerProgressBar: true,
          didOpen: () => {
            MySwal.showLoading()
          },
        })
      }
    } else {
      MySwal.close()
    }
  }, [loading, MySwal])

  //* handlers
  const fetch = useCallback(async () => {
    setLoading(true)
    const params: InitialDataType = {
      ...defaultData,
    }
    if (tableState) {
      params.limit = tableState?.pagination.pageSize
      params.page = tableState?.pagination.pageIndex + 1
      if (tableState?.sorting.length) {
        params.sortField = tableState?.sorting[0].id
        params.sortDirection = tableState?.sorting[0].desc ? 'desc' : 'asc'
      }
      params.customData = {
        ...tableState?.globalFilter,
        ...tableState.columnFilters.map((filter) => ({ [filter.id]: filter.value })),
      }
    }
    const paramsData = {
      ...params,
      customData: undefined,
      ...params.customData,
    }
    try {
      const {
        data: { meta, data },
      } = await axios.get(url, {
        params: paramsData,
      })
      setData(data)
      setPageCount(meta.last_page)
      setTotalRows(meta.total)
    } finally {
      flushSync(() => {
        setLoading(false)
      })
    }
  }, [tableState, setLoading, url, setData])

  const deleteRow = useCallback(
    (id: string | number) => {
      MySwal.fire({
        title: 'Tem certeza?',
        text: 'É possível restaurar o registro depois!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${url}/${id}`)
            .then(() => {
              fetch().then(() => {
                MySwal.fire('Deletado!', 'O registro foi deletado.', 'success')
              })
            })
            .catch(() => {
              MySwal.fire('Erro!', 'Ocorreu um erro ao deletar o registro.', 'error')
            })
        }
      })
    },
    [fetch]
  )

  //* assignments
  table.deleteRow = deleteRow
  table.fetch = fetch
  table.totalRows = totalRows

  return table
}
