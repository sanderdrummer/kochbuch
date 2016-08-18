<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class RecipeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function read() {

        $products = Product::all();

        return response()->json($products);
    }

    public function create(Request $request) {
        $success = true;
        $product = new Product();

        try {
            if ($request->has('name')) {
                $product->name = $request->input('name');
                $product->save();
            }
        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }

    public function update(Request $request) {
        $success = true;

        try {
            if ($request->has('id')) {
                $product = Product::find( $request->input('id'));
                if ($request->has('name')) {
                    $product->name = $request->input('name');
                    $product->save();
                }
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }

    public function destroy(Request $request) {
        $success = true;

        try {
            if ($request->has('id')) {
                $success = Product::destroy( $request->input('id'));
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
