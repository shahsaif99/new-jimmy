<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobSafetyAnalysisResource extends JsonResource
{
    public function toArray($request)
    {
        $participants = $this->relationLoaded('participants') ? $this->participants : collect();
        $signedCount = $participants->filter(fn ($p) => $p->has_signed)->count();

        // The overview shows this same column two different ways: a count on
        // the admin "All JSAs" tab, and the viewer's own status on "My JSAs".
        // Both are computed here so the two tabs can never disagree.
        $me = $request->user()
            ? $participants->firstWhere('user_id', $request->user()->id)
            : null;

        return [
            'id' => $this->id,
            'jsa_no' => $this->jsa_no,
            'title' => $this->title,
            'project_id' => $this->project_id,
            'project_name' => $this->projectLabel(),
            'jsa_date' => optional($this->jsa_date)->toDateString(),
            'work_location' => $this->work_location,
            'jsa_leader_id' => $this->jsa_leader_id,
            'jsa_leader_name' => optional($this->leader)->name,
            'status' => $this->status,
            'description' => $this->description,
            'created_by' => $this->created_by,

            'participants_total' => $participants->count(),
            'participants_signed' => $signedCount,
            'all_signed' => $participants->count() > 0 && $signedCount === $participants->count(),
            // null when the viewer is not a participant, which is how the My
            // JSAs tab tells "nothing is being asked of you" from "not signed".
            'my_signature_status' => $me ? $me->signature_status : null,

            'hazards' => JsaHazardResource::collection($this->whenLoaded('hazards')),
            'participants' => JsaParticipantResource::collection($this->whenLoaded('participants')),

            'created_at' => optional($this->created_at)->toDateTimeString(),
            'updated_at' => optional($this->updated_at)->toDateTimeString(),
        ];
    }

    /**
     * Projects read as "6521 - Borregaard" throughout the app and on the
     * client's own report template, so the label is built once here.
     */
    private function projectLabel(): ?string
    {
        if (!$this->relationLoaded('project') || !$this->project) {
            return null;
        }

        return trim(implode(' - ', array_filter([
            $this->project->project_no,
            $this->project->name,
        ])));
    }
}
