<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;

    protected $table = 'transaction_detail';

    protected $fillable = ['name', 'value_idr', 'transaction_id', 'transaction_category_id'];

    public function header()
    {
        return $this->belongsTo(TransactionHeader::class, 'transaction_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'transaction_category_id');
    }
}
