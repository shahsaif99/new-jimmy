<?php

namespace App\Traits;

use Image;

trait Upload
{

    public static function uploadBase64Avatar($base64Image)
    {
        $extension = explode('/', explode(':', substr($base64Image, 0, strpos($base64Image, ';')))[1])[1]; // .jpg .png .pdf
        $replace = substr($base64Image, 0, strpos($base64Image, ',') + 1);
        // find substring fro replace here eg: data:image/png;base64,
        $image = str_replace($replace, '', $base64Image);
        $image = str_replace(' ', '+', $image);
        $imageName = \Str::random(10) . '.' . $extension;
        \Storage::disk('public')->put($imageName, base64_decode($image));
        return $imageName;
    }

    public static function uploadBase64AvatarAndResize($base64Image)
    {
        $extension = explode('/', explode(':', substr($base64Image, 0, strpos($base64Image, ';')))[1])[1];
        $image = Image::make(file_get_contents($base64Image))->orientate()
            ->resize(250, 250, function ($constraints) {
                $constraints->upsize();
                $constraints->aspectRatio();
            });
        $imageName = \Str::random(10) . '.' . $extension;
        \Storage::disk('public')->put($imageName, $image->encode());
        return $imageName;
    }
}
