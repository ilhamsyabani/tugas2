import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function List({ transactions, categories }) {
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
                {/* Filter Section */}
                <div className="mb-4 flex justify-end gap-4">
                        <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">
                            Reset Filter
                        </button>
                        <input
                            type="date"
                            className="border p-2 rounded-md "
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border p-2 rounded-md"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />

                        <select
                            className="border p-2 rounded-md w-[160px]"
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
                            className="border p-2 rounded-md w-[160px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                {/* Tabel Transaksi */}
                <div class="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full text-sm bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        <thead className="bg-gray-200 dark:bg-gray-700 text-xs uppercase font-medium p-4">
                            <tr>
                                <th className="px-6 py-3 text-left tracking-wider">No</th>
                                <th className="px-6 py-3 text-left tracking-wider">Deskripsi</th>
                                <th className="px-6 py-3 text-left tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left tracking-wider">Rate Euro</th>
                                <th className="px-6 py-3 text-left tracking-wider">Kategori</th>
                                <th className="px-6 py-3 text-left tracking-wider">Nama Transaksi</th>
                                <th className="px-6 py-3 text-left tracking-wider">Nominal(IRD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTransactions.length > 0 ? (
                                paginatedTransactions.map((transaction, index) => (
                                    <tr key={transaction.id}>
                                        <td className="px-6 py-4">{firstIndex + index + 1}</td>
                                        <td className="px-6 py-4">{transaction.header.description}</td>
                                        <td className="px-6 py-4">{transaction.header.code}</td>
                                        <td className="px-6 py-4">{transaction.header.rate_euro}</td>
                                        <td className="px-6 py-4">{transaction.category.name}</td>
                                        <td className="px-6 py-4">{transaction.name}</td>
                                        <td className="px-6 py-4">{transaction.value_idr}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">Tidak ada transaksi ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 ">
                    <div>
                        <span className='dark:text-gray-200 '>Jumlah per halaman: </span>
                        <select value={perPage} onChange={(e) => setPerPage(parseInt(e.target.value))} className="border p-2 w-16 rounded-md">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border font-semibold rounded-md  bg-gray-200 text-gray-800 dark:text-gray-200 dark:bg-gray-800">
                            Previous
                        </button>
                        <span className="px-4 dark:text-gray-200">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border  font-semibold rounded-md bg-gray-200  text-gray-800 dark:text-gray-200 dark:bg-gray-800">
                            Next
                        </button>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
