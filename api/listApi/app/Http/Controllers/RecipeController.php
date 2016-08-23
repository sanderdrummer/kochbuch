<?php

namespace App\Http\Controllers;

use App\Models\ProductItem;
use App\Models\Recipe;
use Illuminate\Http\Request;
use App\Models\Product;
use DB;

class RecipeController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct () {
        //
    }



    public function read () {

        $recipes = Recipe::all();

        return response()->json($recipes);
    }



    public function readSingle (Request $request) {

        $recipe = false;

        try {
            if ($request->has('id')) {
                $recipe = Recipe::find($request->input('id'));
                $products = DB::table('productItems')
                              ->select(array(
                                  'products.name AS name',
                                  'productitems.amount',
                                  'productitems.product_id',
                                  'productitems.recipe_id',
                                  'productitems.id',
                              ))
                              ->join('products', 'products.id', '=', 'productitems.product_id')
                              ->where('recipe_id', '=', $request->input('id'))
                              ->get();
                $recipe['products'] = $products;
            }

        } catch (Exception $e) {

        }

        return response()->json($recipe);
    }



    public function create (Request $request) {

        $recipe = new Recipe();

        try {
            if ($request->has('name')) {
                $recipe->name = $request->input('name');
                $recipe->save();
            }
        } catch (Exception $e) {
            $recipe = false;
        }

        return response()->json($recipe);
    }



    public function update (Request $request) {

        $success = true;

        try {
            if ($request->has('id')) {
                $recipe = Recipe::find($request->input('id'));
                if ($request->has('name')) {
                    $recipe->name = $request->input('name');
                }
                if ($request->has('description')) {
                    $recipe->description = $request->input('description');
                }
                $recipe->save();
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
                $success = Recipe::destroy($request->input('id'));
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
