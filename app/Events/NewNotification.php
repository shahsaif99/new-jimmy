<?php

namespace App\Events;

use Illuminate\Bus\Queueable;
use Illuminate\Broadcasting\Channel;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class NewNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $message;
    public $user;
    public function __construct($user,$message)
    {
        $this->message = $message;
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['broadcast','database'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => $this->message,
        ]);
    }
    public function toArray($notifiable)
    {
        return [
            'message' => $this->message,
        ];
    }
    public function broadcastOn()
    {
        return new Channel('users.'.$this->user->id);
    }
}
