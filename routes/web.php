<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NumbersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/transaction', TransactionController::class);
Route::resource('/categori', CategoryController::class);
Route::get('/list', [TransactionController::class, 'list'])->name('list');
Route::get('/rekap', [TransactionController::class, 'rekap'])->name('rekap');
Route::get('/fibonacci/{n}', [NumbersController::class, 'fibonacci']);
Route::get('/fibonacci/product/{n1}/{n2}', [NumbersController::class, 'fibonacciProduct']);
Route::get('/task', function () {
    return Inertia::render('Fibonacci');
})->name('task');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
