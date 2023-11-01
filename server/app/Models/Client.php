<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model {
    use HasFactory;

    protected $fillable = [
        "name",
        "surname"
    ];

    public function applications(): HasMany {
        return $this->hasMany(Application::class);
    }

    public $timestamps = false;
}
