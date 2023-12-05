<?php

namespace App\Models;

use App\Models\CamelCaseModel;
use Database\Factories\LandParcelFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class LandParcel extends Model {
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function application(): MorphOne {
        return $this->morphOne(Application::class, "applicable");
    }
}
