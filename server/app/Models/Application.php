<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Application extends Model {
    use HasFactory;

    protected $fillable = [
        "user_id",
        "price",
        "has_vat",
        "has_mortgage",
        "applicable_type",
        "applicable_id"
    ];

    protected $guard = [
        "applicable_type",
        "applicable_id"
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function applicable(): MorphTo {
        return $this->morphTo();
    }
}
