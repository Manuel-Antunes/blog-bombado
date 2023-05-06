import { Head, Link, router } from '@inertiajs/react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import { DateTime } from 'luxon'
import React from 'react'
import Flatpickr from 'react-flatpickr'
import MainLayout from 'resources/frontend/layouts/MainLayout'
import { User } from '../../@types/page'
import TableComponent from '../../components/datatable/Table'
import { useAdonisTable } from '../../hooks/useAdonisTable'

export const usersDatatableColumns: ColumnDef<User>[] = [
  {
    id: 'users',
    footer(props) {
      return props.column.id
    },
    columns: [
      {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
      },
      {
        id: 'email',
        header: 'Email',
        accessorKey: 'email',
        cell(props) {
          return (
            <a
              target="__blank"
              className="text-blue-400"
              href={`mailto:${props.row.original.email}`}
            >
              {props.row.original.email}
            </a>
          )
        },
      },
      {
        id: 'created_at',
        header: 'Criado em',
        accessorKey: 'created_at',
        cell: (props) => {
          return DateTime.fromISO(props.row.original.created_at).toFormat('dd/MM/yyyy')
        },
      },
      {
        id: 'actions',
        header: 'Ações',
        cell: (props) => {
          return (
            <div className="flex gap-5">
              <Link
                href={`/users/${props.row.original.id}/edit`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Editar
              </Link>
              <button
                onClick={() => {
                  router.post('/auth/impersonate', {
                    id: props.row.original.id,
                  })
                }}
                type="submit"
                name="id"
                value={props.row.original.id}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Personificar
              </button>
            </div>
          )
        },
      },
    ],
  },
]

const List: React.FC = () => {
  const table = useAdonisTable<any>(
    '/api/users',
    {
      columns: usersDatatableColumns,
      manualPagination: true,
      manualSorting: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    },
    {
      sortField: 'created_at',
      sortDirection: 'desc',
    }
  )

  return (
    <MainLayout>
      <Head>
        <title>E-sports Bet | Gerenciar Usuários</title>
      </Head>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between py-5">
          <h2 className="text-white text-2xl md:text-4xl font-thin">
            <i className="far fa-user mr-2" />
            Gerenciar Usuários
          </h2>
          <Link href="/users/create">
            <button className="py-3 px-5 rounded-sm text-black bg-primary hover:bg-primary-dark">
              Criar Usuário
            </button>
          </Link>
        </div>
        <div className="pb-20 dark">
          <TableComponent
            extraHeaders={
              <Flatpickr
                options={{
                  mode: 'range',
                }}
                data-enable-time
                value={[
                  table.getState()?.globalFilter?.created_at?.start,
                  table.getState()?.globalFilter?.created_at?.end,
                ]}
                onChange={(data) => {
                  if (data.length === 2) {
                    table.setGlobalFilter((filter: any) => {
                      return {
                        ...filter,
                        created_at: {
                          start: data[0].toISOString(),
                          end: data[1].toISOString(),
                        },
                      }
                    })
                    table.fetch()
                  }
                }}
                render={(_, ref) => {
                  return (
                    <>
                      {/* reset button */}
                      <button
                        onClick={() => {
                          table.setGlobalFilter((filter: any) => {
                            return {
                              ...filter,
                              created_at: undefined,
                            }
                          })
                          table.fetch()
                        }}
                        className="bg-gray-50 border w-fit border-gray-300 text-gray-900 text-sm rounded-l-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <i className="fas fa-close mx-auto" />
                      </button>
                      <div
                        ref={ref}
                        className="bg-gray-50 border w-full md:w-56 border-gray-300 text-gray-900 text-sm rounded-r-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <i className="far fa-calendar-alt mr-2" />
                        {table.getState()?.globalFilter?.created_at
                          ? `${DateTime.fromISO(
                              table.getState()?.globalFilter?.created_at?.start
                            ).toFormat('dd/MM/yyyy')} - ${DateTime.fromISO(
                              table.getState()?.globalFilter?.created_at?.end
                            ).toFormat('dd/MM/yyyy')}`
                          : 'Selecione um período'}
                      </div>
                    </>
                  )
                }}
              />
            }
            table={table}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default List
