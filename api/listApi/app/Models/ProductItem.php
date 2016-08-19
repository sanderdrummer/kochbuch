<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class ProductItem extends Model
{
    public $table = "productitems";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'amount',
        'inBasket',
        'product_id',
        'recipe_id',
        'list_id',
    ];

    public function recipe()
    {
        return $this->belongsTo('App\Models\Recipe');
    }

    public function listItem()
    {
        return $this->belongsTo('App\Models\List');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }
}
