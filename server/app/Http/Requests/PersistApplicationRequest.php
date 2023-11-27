<?php

namespace App\Http\Requests;

use App\Models\Support\ApplicationOptions;
use App\Rules\AddressExistsRule;
use App\Rules\ApartmentExistsRule;
use App\Rules\ClientExistsRule;
use App\Rules\HouseExistsRule;
use App\Rules\PlotExistsRule;
use App\Services\DropOptionsService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PersistApplicationRequest extends FormRequest {
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
    public function rules(Request $request, DropOptionsService $options): array {


        return [
            "type" => ["required", Rule::in(["plot", "house", "apartment"])],
            "clientId" => new ClientExistsRule(),
            "addressId" => new AddressExistsRule(),
            "applicableId" => $this->selectRule($request->type),
            "photos" => "array",
            "photos.*" => ["required", "numeric"],
            "contract.contract" => ["required", Rule::in($options->forContract())],
            "contract.price" => ["required", "numeric", "min:1", "max: 100000000"],
            "contract.hasVat" => "boolean",
            "contract.hasMortgage" => "boolean",
        ];
    }
}
