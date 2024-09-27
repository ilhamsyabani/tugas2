
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Category  ({ categories }) {
    const [categoryName, setCategoryName] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(categories);

    useEffect(() => {
        setCategoryList(categories);
    }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editCategory) {
            // Update category
            axios.put(`/categories/${editCategory.id}`, { name: categoryName })
                .then(response => {
                    setCategoryList(categoryList.map(cat => (cat.id === editCategory.id ? response.data : cat)));
                    resetForm();
                });
        } else {
            // Create new category
            axios.post('/categories', { name: categoryName })
                .then(response => {
                    setCategoryList([...categoryList, response.data]);
                    resetForm();
                });
        }
    };

    const resetForm = () => {
        setCategoryName('');
        setEditCategory(null);
    };

    const handleEdit = (category) => {
        setCategoryName(category.name);
        setEditCategory(category);
    };

    const handleDelete = (id) => {
        axios.delete(`/categories/${id}`)
            .then(() => {
                setCategoryList(categoryList.filter(cat => cat.id !== id));
            });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manajemen Kategori
                </h2>
            }
        >
            <Head title="Category Manager" />

            <div className="p-8">
                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Nama Kategori"
                        className="border p-2 mr-2"
                        required
                    />
                    <button type="submit" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded">
                        {editCategory ? 'Update Kategori' : 'Tambah Kategori'}
                    </button>
                    {editCategory && (
                        <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                            Batal
                        </button>
                    )}
                </form>

                <div class="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-sm bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    <thead className="bg-gray-200 dark:bg-gray-700 text-xs uppercase font-medium p-4">
                        <tr>
                            <th className="px-6 py-3 text-center tracking-wider">No</th>
                            <th className="px-6 py-3 text-center tracking-wider">Nama Kategori</th>
                            <th className="px-6 py-3 text-center tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList.length > 0 ? (
                            categoryList.map((category, index) => (
                                <tr key={category.id}>
                                    <td className="px-6 py-3 text-center tracking-wider">{index + 1}</td>
                                    <td className=" text-center px-6 py-4">{category.name}</td>
                                    <td className=" text-center px-6 py-4">
                                        <button onClick={() => handleEdit(category)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(category.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border-b p-2 text-center">Tidak ada kategori ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};


