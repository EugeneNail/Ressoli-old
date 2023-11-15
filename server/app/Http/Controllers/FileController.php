<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller {
    public function uploadTempImages(Request $request) {
        $filePaths = [];
        if ($request->hasFile("images")) {
            foreach ($request->file("images") as $file) {
                $filePaths[] = Storage::disk("public")->put("temp", $file);
            }
            return response($filePaths, Response::HTTP_OK);
        }
    }
}
