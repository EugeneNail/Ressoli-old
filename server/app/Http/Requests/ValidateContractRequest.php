<?php

namespace App\Http\Requests;

use App\Services\DropOptionsService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ValidateContractRequest extends FormRequest {
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
        return [
            "contract" => ["required", Rule::in($dropOptionsService->collectApplication())],
            "price" => ["required", "numeric", "min:1", "max: 100000000"],
            "hasVat" => "boolean",
            "hasMortgage" => "boolean"
        ];
    }
}
