<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Application;
use App\Models\Client;
use App\Models\Photo;
use App\Rules\AddressExistsRule;
use App\Rules\ClientExistsRule;
use App\Rules\TermsExistRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ApplicationService {

    private readonly array $options;

    public function __construct(DropOptionsService $options) {
        $this->options = $options->getFor(Application::class);
    }

    public function fill(Application $application, Request $request): void {
        $application->fill([
            "price" => $request->terms["price"],
            "contract" => $request->terms["contract"],
            "has_vat" => isset($request->terms["hasVat"]),
            "has_mortgage" => isset($request->terms["hasMortgage"]),
            "is_active" => true
        ]);
    }

    public function associateDependencies(Application $application, Request $request, $applicable) {
        $application->user()->associate($request->user());
        $application->client_id = $request->clientId;
        $application->address_id = $request->addressId;
        $application->terms_id = $request->termsId;
        $application->applicable()->associate($applicable);
    }

    public function savePhotos(Application $application, array $indices) {
        if (!empty($indices)) {
            $photos = Photo::findMany($indices);

            foreach ($photos as $photo) {
                $oldPath = $photo->path;
                $newPath = str_replace("temp/", "", $oldPath);
                Storage::disk("public")->move($oldPath, $newPath);
                $photo->path = $newPath;
                $photo->save();
            }

            $application->photos()->saveMany($photos);
            $application->save();
        }
    }

    public function rules(): array {
        return [
            "clientId" => ["numeric", "integer", new ClientExistsRule()],
            "addressId" => ["numeric", "integer", new AddressExistsRule()],
            "termsId" => ["numeric", "integer", new TermsExistRule()],
            "applicableId" => ["numeric", "integer"],
            "photoIds" => "array",
            "photoIds.*" => ["required", "numeric"],
        ];
    }
}
