<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\EditableApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Address;
use App\Models\Apartment;
use App\Models\Application;
use App\Models\Client;
use App\Models\House;
use App\Models\Photo;
use App\Models\LandParcel;
use App\Models\Support\Rules;
use App\Services\DropOptionsService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller {

    public function validateTerms(Request $request, DropOptionsService $options) {
        $request->validate([
            "contract" => ["required", Rule::in($options->getFor(Application::class)["contract"])],
            "price" => ["required", "numeric", "min:1", "max: 100000000"],
        ]);

        return response()->noContent();
    }
}
