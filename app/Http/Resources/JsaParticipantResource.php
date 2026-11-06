<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JsaParticipantResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'signature_status' => $this->signature_status,
            'has_signed' => $this->has_signed,
            'signed_at' => optional($this->signed_at)->toDateTimeString(),
            'recorded_by_id' => $this->recorded_by_id,
            'reminder_sent_at' => optional($this->reminder_sent_at)->toDateTimeString(),
            // A participant with no login can never sign in the app, so the UI
            // offers them the paper route only.
            'can_sign_in_app' => $this->user_id !== null,
            'is_me' => $request->user() ? $this->user_id === $request->user()->id : false,
        ];
    }
}
