import { Link } from '@inertiajs/react'
import React from 'react'

const Welcome: React.FC = () => {
  return (
    <main>
      <div className="flex flex-col">
        <h1 className="title"> It Works! </h1>
        <p className="subtitle">Congratulations, you have just created your first AdonisJS app.</p>

        <ul>
          <li>
            The route for this page is defined inside <code>start/routes.ts</code> file
          </li>

          <li>
            You can update this page by editing <code>resources/views/welcome.edge</code> file
          </li>

          <li>
            If you run into problems, you can reach us on{' '}
            <a href="https://discord.gg/vDcEjq6?">Discord</a> or the{' '}
            <a href="https://forum.adonisjs.com/">Forum</a>.
          </li>
        </ul>
        <Link
          href="/logout"
          className="text-center px-10 mt-5 mx-auto py-3 rounded-lg hover:bg-blue-600 w-full max-w-2xl bg-blue-700 transition-colors text-white"
        >
          Logout
        </Link>
      </div>
    </main>
  )
}

export default Welcome
