<?php

namespace App\Rules;

use App\Models\Apartment;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ApartmentExistsRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (is_null(Apartment::find($value))) {
            $fail("Запись о квартире на найдена в базе данных. Введите информацию о квартире повторно.");
        }
    }
}
