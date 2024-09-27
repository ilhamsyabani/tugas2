import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const currentRoute = route().current();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4">
                    <Link href="/" className="flex items-center mb-6">
                        <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                    <nav className="space-y-2">
                        <Link href={route('dashboard')} className={`block px-4 py-2 rounded ${currentRoute === 'dashboard' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                            Dashboard
                        </Link>
                        <Link href={route('list')} className={`block px-4 py-2 rounded ${currentRoute === 'list' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                            Data Transaksi
                        </Link>
                        <Link href={route('transaction.create')} className={`block px-4 py-2 rounded ${currentRoute === 'transaction.create' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                           Tambah Data Transaksi
                        </Link>
                        <Link href={route('transaction.index')} className={`block px-4 py-2 rounded ${currentRoute === 'transaction.index' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                            List Data Transaksi
                        </Link>
                        <Link href={route('rekap')} className={`block px-4 py-2 rounded ${currentRoute === 'rekap' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                            Rekap Transaksi
                        </Link>
                        <Link href={route('categori.index')} className={`block px-4 py-2 rounded ${currentRoute === 'categori.index' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                            Kategori
                        </Link>
                        <Link href={route('task')} className={`block px-4 py-2 rounded ${currentRoute === 'task' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                            Fibonacci
                        </Link>
                        <Link href={route('logout')} method="post" as="button" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            Log Out
                        </Link>
                    </nav>
                </div>
            </aside>
            <div className="flex-1">
                <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-end">
                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' sm:hidden'
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow dark:bg-gray-800">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
