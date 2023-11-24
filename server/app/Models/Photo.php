<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Photo extends Model {
    use HasFactory;

    public function application(): BelongsTo {
        return $this->belongsTo(Application::class);
    }

    protected $fillable = [
        "path",
        "application_id"
    ];

    public $timestamps = false;
}
