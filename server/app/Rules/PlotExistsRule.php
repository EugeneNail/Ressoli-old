<?php

namespace App\Rules;

use App\Models\Plot;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PlotExistsRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (is_null(Plot::find($value))) {
            $fail("Запись об участке не найдена в базе данных. Введите информацию об участке повторно.");
        }
    }
}
