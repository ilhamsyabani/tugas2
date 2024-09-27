import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categoriesdata }) {
    const { data, setData, post, errors, processing } = useForm({
        description: '',
        code: '',
        rate_euro: '',
        date_paid: '',
        categories: [{ category: '', details: [{ name: '', value_idr: '' }] }]
    });

    const handleDetailChange = (categoryIndex, detailIndex, e) => {
        const updatedDetails = [...data.categories];
        updatedDetails[categoryIndex].details[detailIndex][e.target.name] = e.target.value;
        setData('categories', updatedDetails);
    };

    const addDetail = (categoryIndex) => {
        const updatedDetails = [...data.categories];
        updatedDetails[categoryIndex].details.push({ name: '', value_idr: '' });
        setData('categories', updatedDetails);
    };

    const removeDetail = (categoryIndex, detailIndex) => {
        const updatedDetails = [...data.categories];
        updatedDetails[categoryIndex].details.splice(detailIndex, 1);
        setData('categories', updatedDetails);
    };

    const addCategory = () => {
        setData('categories', [...data.categories, { category: '', details: [{ name: '', value_idr: '' }] }]);
    };

    const handleCategoryChange = (index, e) => {
        const updatedCategories = [...data.categories];
        updatedCategories[index].category = e.target.value;
        setData('categories', updatedCategories);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/transaction', {
            ...data,
            onSuccess: (response) => {
                alert(response.props.message);
                setData({
                    description: '',
                    code: '',
                    rate_euro: '',
                    date_paid: '',
                    categories: [{ category: '', details: [{ name: '', value_idr: '' }] }]
                });
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tambah Data
                </h2>
            }
        >
            <Head title="Tambah Data" />

            <div className="py-12 px-8">
                <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-md w-full">

                    <div className="flex w-full gap-8 items-end mb-6">
                        <div className="flex-1 mr-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi Transaksi</label>
                            <textarea
                                id="description"
                                name="description"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={5}
                                required
                            />
                            {errors.description && <div className="text-red-500">{errors.description}</div>}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 w-[200px]">Code</label>
                                    <input
                                        type="text"
                                        id="code"
                                        name="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {errors.code && <div className="text-red-500">{errors.code}</div>}
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label htmlFor="rate_euro" className="block text-sm font-medium text-gray-700 w-[200px]">Rate Euro</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="rate_euro"
                                        name="rate_euro"
                                        value={data.rate_euro}
                                        onChange={(e) => setData('rate_euro', e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {errors.rate_euro && <div className="text-red-500">{errors.rate_euro}</div>}
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label htmlFor="date_paid" className="block text-sm font-medium text-gray-700 w-[200px]">Tanggal Pembayaran</label>
                                    <input
                                        type="date"
                                        id="date_paid"
                                        name="date_paid"
                                        value={data.date_paid}
                                        onChange={(e) => setData('date_paid', e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {errors.date_paid && <div className="text-red-500">{errors.date_paid}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {data.categories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-6 p-4 border rounded-md shadow-md">
                                <div className='flex justify-between'>
                                    <div className="flex gap-4 items-center mb-4">
                                        <label htmlFor={`category-${categoryIndex}`} className="block text-sm font-medium text-gray-700">Kategori Transaksi</label>
                                        <select
                                            className="border p-2 w-[200px] rounded-md border-gray-300"
                                            id={`category-${categoryIndex}`}
                                            value={category.category}
                                            onChange={(e) => handleCategoryChange(categoryIndex, e)}
                                        >
                                            <option value="">Semua Kategori</option>
                                            {categoriesdata.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <button
                                            type="button"
                                            onClick={() => addDetail(categoryIndex)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Tambah Detail
                                        </button>
                                    </div>
                                </div>

                                {category.details.map((detail, detailIndex) => (
                                    <div key={detailIndex} className="flex gap-4 items-end">
                                        <div className='flex-1'>
                                            <label htmlFor={`name-${categoryIndex}-${detailIndex}`} className="block text-sm font-medium text-gray-700">Nama</label>
                                            <input
                                                type="text"
                                                id={`name-${categoryIndex}-${detailIndex}`}
                                                name="name"
                                                value={detail.name}
                                                onChange={(e) => handleDetailChange(categoryIndex, detailIndex, e)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor={`value_idr-${categoryIndex}-${detailIndex}`} className="block text-sm font-medium text-gray-700">Nilai (IDR)</label>
                                            <input
                                                type="number"
                                                id={`value_idr-${categoryIndex}-${detailIndex}`}
                                                name="value_idr"
                                                value={detail.value_idr}
                                                onChange={(e) => handleDetailChange(categoryIndex, detailIndex, e)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center justify-end">
                                            {category.details.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDetail(categoryIndex, detailIndex)}
                                                    className="bg-red-600 p-2 rounded-md text-white hover:bg-red-800"
                                                >
                                                    {/* SVG for remove icon */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-end gap-4'>
                        <button
                            type="button"
                            onClick={addCategory}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Tambah Kategori Transaksi
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600" disabled={processing}>
                            Simpan Transaksi
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
