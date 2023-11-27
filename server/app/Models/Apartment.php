<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Apartment extends Model {
    use HasFactory;

    protected $guarded = [];

    public function application(): MorphOne {
        return $this->morphOne(Application::class, "applicable");
    }

    public $timestamps = false;
}
