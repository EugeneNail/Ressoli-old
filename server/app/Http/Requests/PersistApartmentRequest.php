<?php

namespace App\Http\Requests;

use App\Services\DropOptionsService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PersistApartmentRequest extends FormRequest {
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
        $options = $dropOptionsService->forApartment();

        return [
            "hasWater"  => ["required", "boolean"],
            "hasGas"  => ["required", "boolean"],
            "hasElectricity"  => ["required", "boolean"],
            "hasSewer"  => ["required", "boolean"],
            "hasHotWater" => ["required", "boolean"],
            "hasGarage"  => ["required", "boolean"],
            "hasGarbageChute"  => ["required", "boolean"],
            "hasElevator"  => ["required", "boolean"],
            "isCorner" => ["required", "boolean"],
            "hasHeating" => ["required", "boolean"],
            "hasLoggia"  => ["required", "boolean"],
            "hasBalcony"  => ["required", "boolean"],
            "condition" => ["required", "string", Rule::in($options["condition"])],
            "walls" => ["required", "string", Rule::in($options["walls"]),],
            "bath" => ["required", "string", Rule::in($options["bath"])],
            "toilet" => ["required", "string", Rule::in($options["toilet"])],
            "constructionTime" => ["required", "string", Rule::in($options["constructionTime"])],
            "area" => ["required", "decimal:0,2", "min:1", "max:10000"],
            "roomCount" => ["required", "integer", "min:1", "max:100"],
            "levelCount" => ["required", "integer", "min:1", "max:100"],
            "level" => ["required", "integer", "min:1", "max:100", "lte:levelCount"],
            "ceiling" => ["required", "decimal:0,2", "min:1", "max:5"]
        ];
    }

    public function messages(): array {
        return [
            "level.lte" => "Значение должно быть в пределах общего количества этажей в доме."
        ];
    }
}
