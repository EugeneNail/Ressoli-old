<?php

namespace App\Services;

use App\Models\Terms;
use App\Services\DropOptionsService;
use Illuminate\Validation\Rule;

class TermsService {

    private readonly array $options;

    public function __construct(DropOptionsService $options) {
        $this->options = $options->getFor(Terms::class);
    }

    public function rules(string $prefix = null): array {
        return [
            $prefix . "contract" => ["required", Rule::in($this->options["contract"])],
            $prefix . "price" => ["required", "numeric", "min:1", "max: 100000000"],
        ];
    }
}
