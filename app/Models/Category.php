<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'ms_category';

    protected $fillable = ['name'];

    public function transaction()
    {
        return $this->hasMany(TransactionDetail::class);
    }
}
