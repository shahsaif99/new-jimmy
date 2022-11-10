<?php

namespace App\Enums;

enum LeadStatus: string
{
    case Lead = 'lead';
    case Application = 'application';
    case Submitted = 'submitted';
    case Approved = 'approved';
    case Settled = 'settled';
}
