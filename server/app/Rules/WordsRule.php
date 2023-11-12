<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class WordsRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (preg_match("/[^a-zA-Zа-яА-Я ]+/u", $value)) {
            $fail("Значение должно содержать только буквы и пробел");
        }
    }
}
