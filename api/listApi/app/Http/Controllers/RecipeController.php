<?php

namespace App\Http\Controllers;
use App\Models\Recipe;
use Illuminate\Http\Request;
use App\Models\Product;
use DB;

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

        $products = DB::table('recipes')
            ->select(array(
                'recipes.name',
                'recipes.description',
                'products.name AS productName',
                'productitems.amount',
                'productitems.recipe_id AS idRecipe',
                'productitems.product_id AS idProduct',
                'productitems.id AS item_id',
            ))
            ->join('productitems', 'recipes.id', '=', 'productitems.recipe_id')
            ->join('products', 'products.id', '=', 'productitems.product_id')
            ->get();

        return response()->json($products);
    }

    public function create(Request $request) {
        $success = true;
        $recipe = new Recipe();

        try {
            if ($request->has('name')) {
                $recipe->name = $request->input('name');
                $recipe->save();
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
                $recipe = Recipe::find( $request->input('id'));
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




    public function destroy(Request $request) {
        $success = true;

        try {
            if ($request->has('id')) {
                $success = Recipe::destroy( $request->input('id'));
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
