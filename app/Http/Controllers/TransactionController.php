<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\TransactionDetail;
use App\Models\TransactionHeader;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = TransactionDetail::with(['header', 'category'])->get();
        $categories = Category::all();
        return inertia('Transactions/Index', [
            'transactions' => $transactions,
            'categories' => $categories,
        ]);
    }

    public function list()
    {
        $transactions = TransactionDetail::with(['header', 'category'])->get();
        $categories = Category::all();
        return inertia('Transactions/List', [
            'transactions' => $transactions,
            'categories' => $categories,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('Transactions/Create', [
            'categoriesdata' => $categories,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'code' => 'required|string',
            'rate_euro' => 'required|numeric',
            'date_paid' => 'required|date',
            'categories' => 'required|array',
            'categories.*.category' => 'required',
            'categories.*.details' => 'required|array',
            'categories.*.details.*.name' => 'required|string',
            'categories.*.details.*.value_idr' => 'required|numeric',
        ], [
            'description.required' => 'Deskripsi Transaksi harus diisi.',
            'code.required' => 'Code harus diisi.',
            'rate_euro.required' => 'Rate Euro harus diisi.',
            'date_paid.required' => 'Tanggal Pembayaran harus diisi.',
            'categories.required' => 'Kategori harus diisi.',
            'categories.array' => 'Kategori harus berupa array.',
            'categories.*.category_id.required' => 'ID Kategori Transaksi harus diisi.',
            'categories.*.category_id.exists' => 'ID Kategori Transaksi tidak ditemukan.',
            'categories.*.details.required' => 'Detail Transaksi harus diisi.',
            'categories.*.details.array' => 'Detail harus berupa array.',
            'categories.*.details.*.name.required' => 'Nama detail harus diisi.',
            'categories.*.details.*.value_idr.required' => 'Nilai (IDR) harus diisi.',
            'categories.*.details.*.value_idr.numeric' => 'Nilai (IDR) harus berupa angka.',
        ]);

        $transactionDetail = TransactionHeader::create([
            'description' => $validatedData['description'],
            'code' => $validatedData['code'],
            'rate_euro' => $validatedData['rate_euro'],
            'date_paid' => $validatedData['date_paid'],
        ]);

        foreach ($validatedData['categories'] as $category) {
            $categoryId = $category['category'];

            foreach ($category['details'] as $detail) {
                TransactionDetail::create([
                    'transaction_category_id' => $categoryId,
                    'transaction_id' => $transactionDetail->id,
                    'name' => $detail['name'],
                    'value_idr' => $detail['value_idr'],
                ]);
            }
        }

        session()->flash('message', 'Transaksi berhasil disimpan.');

        return redirect()->route('transaction.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TransactionDetail $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TransactionDetail $transaction)
    {
        $categories = Category::all();

        $header = $transaction->header;
        $details = $header->details()->with('category')->get();

        $groupedDetails = $details->groupBy(function($detail) {
            return $detail->category->name; 
        });

        $transactionData = TransactionDetail::with(['header', 'category'])->findOrFail($transaction->id);

        return inertia('Transactions/Edit', [
            'transaction' => $transactionData,
            'categoriesdata' =>  $categories,
            'categoriesItems' => $groupedDetails
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TransactionDetail $transaction)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'code' => 'required|string',
            'rate_euro' => 'required|numeric',
            'date_paid' => 'required|date',
            'categories' => 'required|array',
            'categories.*.category' => 'required',
            'categories.*.details' => 'required|array',
            'categories.*.details.*.name' => 'required|string',
            'categories.*.details.*.value_idr' => 'required|numeric',
        ], [
            'description.required' => 'Deskripsi Transaksi harus diisi.',
            'code.required' => 'Code harus diisi.',
            'rate_euro.required' => 'Rate Euro harus diisi.',
            'date_paid.required' => 'Tanggal Pembayaran harus diisi.',
            'categories.required' => 'Kategori harus diisi.',
            'categories.array' => 'Kategori harus berupa array.',
            'categories.*.category_id.required' => 'ID Kategori Transaksi harus diisi.',
            'categories.*.category_id.exists' => 'ID Kategori Transaksi tidak ditemukan.',
            'categories.*.details.required' => 'Detail Transaksi harus diisi.',
            'categories.*.details.array' => 'Detail harus berupa array.',
            'categories.*.details.*.name.required' => 'Nama detail harus diisi.',
            'categories.*.details.*.value_idr.required' => 'Nilai (IDR) harus diisi.',
            'categories.*.details.*.value_idr.numeric' => 'Nilai (IDR) harus berupa angka.',
        ]);
    
        
        $transactionData = TransactionHeader::findOrFail($transaction);
        
       
        $transactionData->update([
            'description' => $validatedData['description'],
            'code' => $validatedData['code'],
            'rate_euro' => $validatedData['rate_euro'],
            'date_paid' => $validatedData['date_paid'],
        ]);
    
        
        foreach ($validatedData['categories'] as $categoryData) {
            // Misalkan ada relasi categories
            $category = $transactionData->categories()->updateOrCreate(
                ['name' => $categoryData['category']],
                []
            );
    
            
            foreach ($categoryData['details'] as $detail) {
                $category->details()->updateOrCreate(
                    ['name' => $detail['name']],
                    ['value_idr' => $detail['value_idr']]
                );
            }
        }
    
        return redirect()->route('data.index')->with('success', 'Data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransactionDetail $transaction)
    {
        $transaction->delete();
        return  redirect()->back()->with('message', 'Transaksi berhasil dihapus.');
    }

    public function rekap()
    {
        $rekapData = TransactionDetail::select('transaction_id', 'transaction_category_id', DB::raw('SUM(value_idr) as total_value'))
            ->groupBy('transaction_id', 'transaction_category_id')
            ->with(['header', 'category'])
            ->get();
        $categories = Category::all();
        return inertia('Transactions/Rekap', ['rekaps' => $rekapData, 'categories' => $categories]);
    }
}
