<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model {
    use HasFactory;

    protected $fillable = [
        "city",
        "street",
        "house_number",
        "apartment_number"
    ];

    public function application(): BelongsTo {
        return $this->belongsTo(Application::class);
    }

    public $timestamps = false;
}
