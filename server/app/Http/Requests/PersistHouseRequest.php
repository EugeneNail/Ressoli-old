<?php

namespace App\Http\Requests;

use App\Services\DropOptionsService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PersistHouseRequest extends FormRequest {
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
    public function rules(DropOptionsService $dropOptionsService): array {
        $options = $dropOptionsService->forHouse();

        return [
            "id" => ["numeric"],
            "levelCount" => ["required", "numeric", "min:1", "max:100", "integer"],
            "ceiling" => ["required", "numeric", "min:1", "max:5", "decimal:0,2"],
            "roomCount" => ["required", "numeric", "min:1", "max:100", "integer"],
            "landArea" => ["required", "numeric", "min:1", "max:10000", "decimal:0,2"],
            "area" => ["required", "numeric", "min:1", "max:10000", "decimal:0,2"],
            "water" => ["required", "string", Rule::in($options["water"])],
            "gas" => ["required", "string", Rule::in($options["gas"])],
            "electricity" => ["required", "string", Rule::in($options["electricity"])],
            "sewer" => ["required", "string", Rule::in($options["sewer"])],
            "walls" => ["required", "string", Rule::in($options["walls"])],
            "hotWater" => ["required", "string", Rule::in($options["hotWater"])],
            "condition" => ["required", "string", Rule::in($options["condition"])],
            "heating" => ["required", "string", Rule::in($options["heating"])],
            "bath" => ["required", "string", Rule::in($options["bath"])],
            "toilet" => ["required", "string", Rule::in($options["toilet"])],
            "hasGarage" => ["required", "boolean"],
            "constructionTime" => ["required", "string", Rule::in($options["constructionTime"])],
            "roof" => ["required", "string", Rule::in($options["roof"])],
        ];
    }
}
