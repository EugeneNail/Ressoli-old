<?php

namespace App\Http\Requests;

use App\Rules\AddressNumberRule;
use App\Rules\StreetRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

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
    public function rules(): array {
        return [
            "city" => "required|alpha",
            "street" => ["required", new StreetRule()],
            "houseNumber" => ["required", new AddressNumberRule()],
            "typeOfCity" => ["required", Rule::in(["Город", "Село", "Хутор", "ПГТ"])],
            "typeOfStreet" => ["required", Rule::in(["Бульвар", "Проезд", "Переулок", "Улица", "Проспект"])]
        ];
    }
}
