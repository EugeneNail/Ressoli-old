<?php

namespace App\Rules;

use App\Models\Address;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AddressExistsRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (is_null(Address::find($value))) {
            $fail("Запись об адресе не найдена в базе данных. Введите информацию об адресе повторно.");
        }
    }
}
