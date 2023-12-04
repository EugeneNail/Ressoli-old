<?php

namespace App\Http\Requests;

use App\Models\Support\Rules;
use App\Rules\AddressNumberRule;
use App\Rules\StreetRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class PersistAddressRequest extends FormRequest {
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
    public function rules(Request $request): array {
        $rules = [
            "city" => ["required", "alpha"],
            "street" => ["required", new StreetRule()],
            "addressNumber" => ["required", new AddressNumberRule()],
        ];

        if ($request->fields === "full") {
            $rules["apartmentNumber"] = ["required", new AddressNumberRule()];
        }

        return $rules;
    }
}
