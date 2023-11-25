<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class House extends Model {
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function application(): MorphOne {
        return $this->morphOne(Application::class, "applicable");
    }
}
