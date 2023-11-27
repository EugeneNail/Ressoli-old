<?php

namespace App\Models\Support;

use App\Rules\AddressExistsRule;
use App\Rules\AddressNumberRule;
use App\Rules\ClientExistsRule;
use App\Rules\StreetRule;
use App\Services\DropOptionsService;
use Illuminate\Validation\Rule;

class Rules {

    private DropOptionsService $options;

    public function __construct(DropOptionsService $dropOptionsService) {
        $this->options = $dropOptionsService;
    }

    public function forApplication(): array {
        return [
            "clientId" => ["required", new ClientExistsRule()],
            "addressId" => ["required", new AddressExistsRule()],
            "photos" => ["array"],
            "photos.*" => ["required", "numeric"],
            "contract" => ["required", Rule::in($this->options->forContract())],
            "price" => ["required", "numeric", "min:1", "max: 100000000"],
            "hasVat" => ["required", "boolean"],
            "hasMortgage" => ["required", "boolean"],
        ];
    }

    public function forContract(string $prefix = null): array {
        return [
            $prefix . "contract" => ["required", Rule::in($this->options->forContract())],
            $prefix . "price" => ["required", "numeric", "min:1", "max: 100000000"],
            $prefix . "hasVat" => "boolean",
            $prefix . "hasMortgage" => "boolean"
        ];
    }

    public function forAddress(string $prefix = null): array {
        return [
            $prefix . "city" => "required|alpha",
            $prefix . "street" => ["required", new StreetRule()],
            $prefix . "houseNumber" => ["required", new AddressNumberRule()],
            $prefix . "typeOfCity" => ["required", Rule::in(["Город", "Село", "Хутор", "ПГТ"])],
            $prefix . "typeOfStreet" => ["required", Rule::in(["Бульвар", "Проезд", "Переулок", "Улица", "Проспект"])]
        ];
    }

    public function forClient(string $prefix = null): array {
        return [
            $prefix . "name" => "required|alpha",
            $prefix . "surname" => "required|alpha",
            $prefix . "phoneNumber" => "required|regex:/^\+{0,1}[0-9]{11}$/",
        ];
    }
}
