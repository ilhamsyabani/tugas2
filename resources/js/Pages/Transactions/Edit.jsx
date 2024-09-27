import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ transaction, categoriesItems, categoriesdata }) {
    const { flash } = usePage().props;
    console.log(categoriesItems);

    const { data, setData, put, errors, processing } = useForm({
        id: transaction.id,
        description: transaction.header.description || '',
        code: transaction.header.code || '',
        rate_euro: transaction.header.rate_euro || '',
        date_paid: transaction.header.date_paid || '',
        category: transaction.category || '',
        name: transaction.name || '',
        value_idr: transaction.value_idr || '',
        categories: transaction.categories || [{ category: '', details: [{ name: '', value_idr: '' }] }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transaction/${transaction.id}`, data, {
            onSuccess: (response) => {
                alert(response.props.message);
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
                    Edit Data Transaksi
                </h2>
            }
        >
            <Head title="Edit Data Transaksi" />

            <div className="py-12 px-8">
                <form onSubmit={handleSubmit} className="p-6p-6 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-50 rounded-md shadow-md w-full">
                    <div className="flex w-full gap-8 items-end mb-6">
                        <div className="flex-1 mr-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-800 dark:text-gray-50">Deskripsi Transaksi</label>
                            <textarea
                                id="description"
                                name="description"
                                className="mt-1 text-gray-800 block w-full p-2 border border-gray-300 rounded-md"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={5}
                                required
                            />
                            {errors.description && <div className="text-red-500">{errors.description}</div>}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col space-y-1">
                                {[
                                    { label: 'Code', type: 'text', name: 'code', value: data.code },
                                    { label: 'Rate Euro', type: 'number', name: 'rate_euro', value: data.rate_euro, step: '0.01' },
                                    { label: 'Tanggal Pembayaran', type: 'date', name: 'date_paid', value: data.date_paid },
                                ].map(({ label, type, name, value, step }) => (
                                    <div className="flex items-center space-x-4" key={name}>
                                        <label htmlFor={name} className="block text-sm font-medium text-gray-800 dark:text-gray-50 w-[200px]">{label}</label>
                                        <input
                                            type={type}
                                            step={step}
                                            id={name}
                                            name={name}
                                            value={value}
                                            onChange={(e) => setData(name, e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                                            required
                                        />
                                        {errors[name] && <div className="text-red-500">{errors[name]}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 p-4 border rounded-md shadow-md">
                        <div className='flex justify-between'>
                            <div className="flex gap-4 items-center mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-800 dark:text-gray-50">Kategori Transaksi</label>
                                <select
                                    className="border p-2 w-[200px] rounded-md text-gray-800 border-gray-300"
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                >
                                    {categoriesdata.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 items-end">
                            <div className='flex-1'>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-50">Nama</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-50">Nilai (IDR)</label>
                                <input
                                    type="number"
                                    id="value_idr"
                                    name="value_idr"
                                    value={data.value_idr}
                                    onChange={(e) => setData('value_idr', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 text-gray-800 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <ul className='mt-8'>
                            {categoriesItems.map((category, i) => (
                                <li key={i}>
                                    <h3 className='mt-6 font-semibold '>Kategori :{category.category}</h3>
                                    <ul>
                                        <li className='flex w-[70%] '>
                                            <span className='flex-1'>Name: </span> <span>Value IDR: </span>
                                        </li>
                                        {category.items.map((item) => (
                                            <li key={item.id} className='flex w-[70%] '>
                                                <span className='flex-1'> {item.name}, </span> <span>{item.value_idr}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex justify-end gap-4'>
                        <button type="submit" className="bg-gray-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold px-6 py-2 rounded hover:dark:bg-gray-900 hover:dark:text-white  hover:bg-gray-50 hover:text-gray-900" disabled={processing}>
                            Simpan Transaksi
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
