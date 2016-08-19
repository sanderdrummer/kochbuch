<?php

namespace App\Http\Controllers;

use App\Models\ProductItem;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductItemController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct () {
        //
    }



    public function read () {

        $products = ProductItem::all();

        return response()->json($products);
    }



    public function create (Request $request) {

        $success = true;
        $item = new ProductItem();

        try {
            if ($request->has('amount') && $request->has('product_id')) {
                $item->amount = $request->input('amount');
                $item->inBasket = false;
                $item->product_id = null;
                $item->recipe_id = null;
                $item->list_id = null;
                $item->save();

                $item->product_id = $request->input('product_id');
                $item->save();

                if ($request->has('recipe_id')) {
                    $item->recipe_id = $request->input('recipe_id');
                    $item->save();

                }

                if ($request->has('list_id')) {
                    $item->list_id = $request->input('list_id');
                    $item->save();
                }

            }
        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }



    public function update (Request $request) {

        $success = true;

        try {
            if ($request->has('id')) {
                $item = ProductItem::find($request->input('id'));

                if ($request->has('inBasket')) {
                    $item->inBasket = $request->input('inBasket');
                }

                if ($request->has('amount')) {
                    $item->amount = $request->input('amount');
                }

                if ($request->has('product_id')) {
                    $item->product_id = $request->input('product_id');
                }

                if ($request->has('recipe_id')) {
                    $item->recipe_id = $request->input('recipe_id');
                }

                if ($request->has('list_id')) {
                    $item->list_id = $request->input('list_id');
                }

                $item->save();
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }



    public function destroy (Request $request) {

        $success = true;

        try {
            if ($request->has('id')) {
                $success = Product::destroy($request->input('id'));
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
