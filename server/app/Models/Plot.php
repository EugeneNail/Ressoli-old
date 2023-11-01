<?php

namespace App\Models;

use App\Models\CamelCaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Plot extends Model {
    use HasFactory;

    protected $fillable = [
        "gas",
        "water",
        "sewer",
        "electricity",
        "area",
    ];

    public $timestamps = false;

    public function application(): MorphOne {
        return $this->morphOne(Application::class, "applicable");
    }
}
