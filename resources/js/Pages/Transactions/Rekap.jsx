import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Rekap({ rekaps, categories }) {
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

    // Filter Rekap
    const filteredRekap = rekaps.filter(rekap => {
        const matchSearch = rekap.header.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            rekap.header.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = categoryFilter ? rekap.category.name === categoryFilter : true;
        const datePaid = new Date(rekap.header.date_paid);
        const matchDate = (!startDate || datePaid >= new Date(startDate)) && 
                          (!endDate || datePaid <= new Date(endDate));

        return matchSearch && matchCategory && matchDate;
    });

    // Pagination
    const totalItems = filteredRekap.length;
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const paginatedRekap = filteredRekap.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(totalItems / perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Rekap
                </h2>
            }
        >
            <Head title="Rekap" />

            <div className="p-8">
                {/* Filter Section */}
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

                {/* Tabel Transaksi */}
                <table className="min-w-full text-sm text-center rounded-xl bg-white p-2">
                    <thead>
                        <tr>
                            <th className="border-b p-2">No</th>
                            <th className="border-b p-2">Tanggal</th>
                            <th className="border-b p-2">Kategori</th>
                            <th className="border-b p-2">Nominal (IDR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRekap.length > 0 ? (
                            paginatedRekap.map((rekap, index) => (
                                <tr key={rekap.id} className="hover:bg-gray-50">
                                    <td className="border-b p-2">{firstIndex + index + 1}</td>
                                    <td className="border-b p-2">{rekap.header.date_paid}</td>
                                    <td className="border-b p-2">{rekap.category.name}</td>
                                    <td className="border-b p-2">{rekap.total_value}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border-b p-2 text-center">Tidak ada transaksi ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
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
