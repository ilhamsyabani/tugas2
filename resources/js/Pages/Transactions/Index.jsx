import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ transactions, categories }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const resetFilters = () => {
        setSearchTerm("");
        setCategoryFilter("");
        setStartDate("");
        setEndDate("");
        setCurrentPage(1);
    };

    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        const matchSearch = transaction.header.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.header.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = categoryFilter ? transaction.category.name === categoryFilter : true;
        const datePaid = new Date(transaction.header.date_paid);
        const matchDate = (!startDate || datePaid >= new Date(startDate)) &&
            (!endDate || datePaid <= new Date(endDate));

        return matchSearch && matchCategory && matchDate;
    });

    // Pagination
    const totalItems = filteredTransactions.length;
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const paginatedTransactions = filteredTransactions.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(totalItems / perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Data Transaksi
                </h2>
            }
        >
            <Head title="Index" />

            <div className="p-8">
                <div className='flex justify-between items-center mb-6'>
                    <button onClick={resetFilters} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Tambah Transaksi
                    </button>
                    <div className="mb-4 flex justify-end gap-4">
                        <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">
                            Reset Filter
                        </button>
                        <input
                            type="date"
                            className="border p-2"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border p-2"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />

                        <select
                            className="border p-2 w-[160px]"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Cari data"
                            className="border p-2 w-[160px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tabel Transaksi */}
                <table className="min-w-full text-sm rounded-xl bg-white p-2">
                    <thead>
                        <tr>
                            <th className="border-b p-2">No</th>
                            <th className="border-b p-2">Deskripsi</th>
                            <th className="border-b p-2">Code</th>
                            <th className="border-b p-2">Rate Euro</th>
                            <th className="border-b p-2">Kategori</th>
                            <th className="border-b p-2">Nama Transaksi</th>
                            <th className="border-b p-2">Nominal(IRD)</th>
                            <th className="border-b p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td className="border-b p-2">{firstIndex + index + 1}</td>
                                    <td className="border-b p-2">{transaction.header.description}</td>
                                    <td className="border-b p-2">{transaction.header.code}</td>
                                    <td className="border-b p-2">{transaction.header.rate_euro}</td>
                                    <td className="border-b p-2">{transaction.category.name}</td>
                                    <td className="border-b p-2">{transaction.name}</td>
                                    <td className="border-b p-2">{transaction.value_idr}</td>
                                    <td className="border-b p-2 flex gap-1 justify-center">
                                        {/* Tombol Edit */}
                                        <Link
                                            href={`/transaction/${transaction.id}/edit`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </Link>

                                        {/* Tombol Delete */}
                                        <Link
                                            href={`/transaction/${transaction.id}`}
                                            method="delete"
                                            as="button"
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">Tidak ada transaksi ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 dark:text-gray-200">
                    <div>
                        <span>Jumlah per halaman: </span>
                        <select value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))} className="border p-2 w-16">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border bg-gray-200">
                            Previous
                        </button>
                        <span className="px-4">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border bg-gray-200">
                            Next
                        </button>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
