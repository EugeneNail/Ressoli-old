<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model {
    use HasFactory;

    protected $fillable = [
        "city",
        "street",
        "house_number",
        "apartment_number",
    ];

    public function application(): HasMany {
        return $this->hasMany(Application::class);
    }

    public $timestamps = false;
}
