<?php

namespace App\Services;

use App\Models\Client;
use App\Models\LandParcel;
use App\Rules\WordsRule;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Nette\NotImplementedException;

class LandParcelService {

    public function __construct(DropOptionsService $options) {
        $this->options = $options->getFor(LandParcel::class);
    }

    private readonly array $options;

    public function rules(string $prefix = null): array {
        return [
            $prefix . "water" => ["required", "string", new WordsRule(), Rule::in($this->options["water"])],
            $prefix . "sewer" => ["required", "string", new WordsRule(), Rule::in($this->options["sewer"])],
            $prefix . "electricity" => ["required", "string", new WordsRule(), Rule::in($this->options["electricity"])],
            $prefix . "gas" => ["required", "string", new WordsRule(), Rule::in($this->options["gas"])],
            $prefix . "area" => ["required", "numeric", "min:1", "max:10000", "decimal:0,2"],
        ];
    }
}
