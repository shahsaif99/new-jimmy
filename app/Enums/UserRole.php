<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case BDM = 'bdm';
    case Partner = 'partner';
    case Broker = 'broker';
}
