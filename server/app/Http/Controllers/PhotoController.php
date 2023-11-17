<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadTempRequest;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller {
    public function uploadTemp(UploadTempRequest $request) {
        $photos = [];
        if ($request->hasFile("images")) {
            foreach ($request->file("images") as $file) {
                $photo = new Photo(["path" => Storage::disk("public")->put("temp", $file)]);
                $photo->save();
                $photos[] = $photo;
            }
        }
        return response($photos, Response::HTTP_OK);
    }

    public function delete(Request $request, int $id) {
        $photo = Photo::find($id);
        if (isset($photo)) {
            $photo->delete();
            Storage::disk("public")->delete($photo->path);
        }
        return response()->noContent();
    }
}
