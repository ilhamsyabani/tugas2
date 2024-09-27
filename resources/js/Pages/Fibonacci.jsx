import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Fibonacci() {
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`/fibonacci/product/${n1}/${n2}`);
        if (!response.ok) {
            const error = await response.json();
            console.error('Error fetching Fibonacci product:', error);
            return;
        }
    
        const data = await response.json();
        setResult(data.product);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Jumlah Bilangan Fibonacci
                </h2>
            }
        >
            <Head title="Fibonacci" />

            <div className="p-8">
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <label htmlFor="n1" className="block mb-1">Bilangan Fibonacci ke-n1:</label>
                        <input
                            type="number"
                            id="n1"
                            value={n1}
                            onChange={(e) => setN1(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="n2" className="block mb-1 dark:text-white">Bilangan Fibonacci ke-n2:</label>
                        <input
                            type="number"
                            id="n2"
                            value={n2}
                            onChange={(e) => setN2(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Hitung Jumlah
                    </button>
                </form>

                {result !== null && (
                    <div>
                        <h3 className="text-lg font-semibold dark:text-white">Hasil:</h3>
                        <p className='dark:text-white'>Fb({n1}) + Fb({n2}) = {result}</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
