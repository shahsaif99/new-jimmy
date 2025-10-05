<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationCoontroller extends Controller
{
    public function index ()
    {
        $notifications = auth()->user()->notifications;
        return response()->json(['notifications' => $notifications], 200);
    }
    public function readNotifications ()
    {
       auth()->user()->notifications->markAsRead();
       return response()->json(['message' => 'Notifications marked as read'], 200);
    }
}
