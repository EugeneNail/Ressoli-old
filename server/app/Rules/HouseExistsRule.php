<?php

namespace App\Rules;

use App\Models\House;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class HouseExistsRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (is_null(House::find($value))) {
            $fail("Запись о доме не найдена в базе данных. Введите информацию о доме повторно.");
        }
    }
}
