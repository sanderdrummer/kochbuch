<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListModel;
use DB;

class ListController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct () {
        //
    }



    public function read () {

        $lists = ListModel::all();

        return response()->json($lists);
    }



    public function readSingle (Request $request) {

        $list = false;

        try {
            if ($request->has('id')) {
                $list = ListModel::find($request->input('id'));
                $products = DB::table('productItems')
                              ->select(array(
                                  'products.name AS name',
                                  'productitems.amount',
                                  'productitems.product_id',
                                  'productitems.recipe_id',
                                  'productitems.id',
                              ))
                              ->join('products', 'products.id', '=', 'productitems.product_id')
                              ->where('list_id', '=', $request->input('id'))
                              ->get();
                $list['products'] = $products;
            }

        } catch (Exception $e) {

        }

        return response()->json($list);
    }



    public function create (Request $request) {

        $list = new ListModel();

        try {
            if ($request->has('name')) {
                $list->name = $request->input('name');
                $list->save();
            }
        } catch (Exception $e) {
            $list = false;
        }

        return response()->json($list);
    }



    public function update (Request $request) {

        $success = true;

        try {
            if ($request->has('id')) {
                $list = ListModel::find($request->input('id'));
                if ($request->has('name')) {
                    $list->name = $request->input('name');
                }
                if ($request->has('description')) {
                    $list->description = $request->input('description');
                }
                $list->save();
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
                $success = ListModel::destroy($request->input('id'));
            }

        } catch (Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
