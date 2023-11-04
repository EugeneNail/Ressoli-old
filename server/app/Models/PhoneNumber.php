<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class PhoneNumber extends Model {
    use HasFactory;

    public function numberable(): MorphTo {
        return $this->morphTo();
    }

    protected $fillable = [
        "id",
        "value",
        "numberable_id",
        "numberable_type"
    ];

    public $timestamps = false;

    public $incrementing = false;
}
