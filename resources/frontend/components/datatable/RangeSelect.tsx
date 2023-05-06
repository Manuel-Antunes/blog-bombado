import clsx from 'clsx'
import React, { HTMLProps } from 'react'

export interface RangeSelectProps extends HTMLProps<HTMLSelectElement> {}

const RangeSelect: React.FC<RangeSelectProps> = ({ className, ...props }) => {
  return (
    <div id="range" className="w-full md:w-min">
      <label htmlFor="range" className="sr-only">
        Selecione o numero por página
      </label>
      <div className="relative mt-1 w-full">
        <select
          id="range"
          className={clsx(
            'bg-gray-50 border w-full md:w-36 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            className
          )}
          {...props}
        >
          <option value={10}>Quantidade: 10</option>
          <option value={25}>Quantidade: 25</option>
          <option value={50}>Quantidade: 50</option>
          <option value={100}>Quantidade: 100</option>
        </select>
      </div>
    </div>
  )
}

export default RangeSelect
