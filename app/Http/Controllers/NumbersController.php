<?php

namespace App\Http\Controllers;



class NumbersController extends Controller
{
    public function fibonacci($n = 5)
    {
        $fibos = [];
        for ($i = 0; $i <= $n; $i++) {
            if ($i == 0) {
                $fibos[$i] = 0;
            } elseif ($i == 1) {
                $fibos[$i] = 1;
            } else {
                $fibos[$i] = $fibos[$i - 1] + $fibos[$i - 2];
            }
        }

        return [
            'result' => $fibos[$n],
        ];
    }


    public function fibonacciProduct($n1, $n2)
    {

        $fib1 = $this->fibonacci($n1)['result'];
        $fib2 = $this->fibonacci($n2)['result'];
        $product = $fib1 + $fib2;

        return response()->json([
            'product' => $product,
        ]);
    }
}
