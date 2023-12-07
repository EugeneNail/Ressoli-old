<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistTermsRequest;
use App\Models\Terms;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TermsController extends Controller {
    public function persist(PersistTermsRequest $request) {
        $terms = Terms::find($request->termsId);
        $fields = [
            "has_mortgage" => $request->hasMortgage != null,
            "has_vat" => $request->hasVat != null,
            "price" => $request->price,
            "contract" => $request->contract
        ];

        if (is_null($terms)) {
            $terms = Terms::create($fields);
            return new JsonResponse($terms->id, Response::HTTP_CREATED);
        }

        $terms->fill($fields);
        $terms->save();

        return new JsonResponse($terms->id, Response::HTTP_OK);
    }
}
