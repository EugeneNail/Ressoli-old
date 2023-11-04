<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AddressNumberRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (preg_match("/[^\wа-яА-Я\/]/u", $value)) {
            $fail("Поле должно состоять только из букв, цифр и символа /");
        }
    }
}
