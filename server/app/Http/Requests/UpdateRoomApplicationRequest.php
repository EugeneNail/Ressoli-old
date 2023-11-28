<?php

namespace App\Http\Requests;

use App\Models\Support\Rules;
use App\Rules\RoomExistsRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomApplicationRequest extends FormRequest {
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
    public function rules(Rules $rules): array {
        return array_merge(
            $rules->forApplication(),
            ["applicableId" => new RoomExistsRule()]
        );
    }
}
