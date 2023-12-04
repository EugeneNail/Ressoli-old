<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Client extends Model {
    use HasFactory;

    protected $guarded = [];

    public function applications(): HasMany {
        return $this->hasMany(Application::class);
    }

    public $timestamps = false;
}
