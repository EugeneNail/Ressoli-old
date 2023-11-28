<?php

namespace App\Rules;

use App\Models\Room;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RoomExistsRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (is_null(Room::find($value))) {
            $fail("Запись о комнате не найдена в базе данных. Введите информацию о доме повторно.");
        }
    }
}
