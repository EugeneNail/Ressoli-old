<?php

namespace App\Http\Requests;

use App\Models\Support\ApplicationOptions;
use App\Rules\AddressExistsRule;
use App\Rules\ClientExistsRule;
use App\Rules\PlotExistsRule;
use App\Services\DropOptionsService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePlotApplicationRequest extends FormRequest {
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
            "clientId" => new ClientExistsRule(),
            "addressId" => new AddressExistsRule(),
            "applicableId" => new PlotExistsRule(),
            "photos" => "array",
            "photos.*" => ["required", "numeric"],
            "contract" => ["required", Rule::in($dropOptionsService->collectApplication())],
            "price" => ["required", "numeric", "min:1", "max: 100000000"],
            "hasVat" => "boolean",
            "hasMortgage" => "boolean",
        ];
    }
}
