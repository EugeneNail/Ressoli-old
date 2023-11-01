<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model {
    use HasFactory;

    protected $fillable = [
        "price",
        "hasVat",
        "hasMortgage"
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
