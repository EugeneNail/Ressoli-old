<?php

namespace App\Rules;

use App\Models\Terms;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TermsExistRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (is_null(Terms::find($value))) {
            $fail("The terms not found in the database");
        }
    }
}
