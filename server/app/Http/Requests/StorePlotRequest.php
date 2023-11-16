<?php

namespace App\Http\Requests;

use App\Models\Support\PlotOptions;
use App\Rules\WordsRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StorePlotRequest extends FormRequest {
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
    public function rules(PlotOptions $options, WordsRule $wordsRule): array {
        return [
            "water" => ["required", "string", $wordsRule, Rule::in($options->water)],
            "sewer" => ["required", "string", $wordsRule, Rule::in($options->sewer)],
            "electricity" => ["required", "string", $wordsRule, Rule::in($options->electricity)],
            "gas" => ["required", "string", $wordsRule, Rule::in($options->gas)],
            "area" => ["required", "numeric", "min:1", "max:10000", "decimal:0,2"],
        ];
    }
}
