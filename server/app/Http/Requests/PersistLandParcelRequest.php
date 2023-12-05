<?php

namespace App\Http\Requests;

use App\Models\LandParcel;
use App\Models\Support\PlotOptions;
use App\Rules\WordsRule;
use App\Services\DropOptionsService;
use App\Services\LandParcelService;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class PersistLandParcelRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(LandParcelService $service): array {

        return $service->rules();
    }
}
