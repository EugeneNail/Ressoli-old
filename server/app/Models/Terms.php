<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Terms extends Model {
    use HasFactory;

    protected $table = "terms";

    protected $guarded = [];

    public $timestamps = false;

    public function application(): BelongsTo {
        return $this->belongsTo(Application::class);
    }
}
