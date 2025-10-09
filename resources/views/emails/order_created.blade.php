<x-mail::message>
# New Order Created
 
Below are the details

<x-mail::table>
    |                       |                         |
    | :-------------------- | ------------------------|
    | Reseler Name          | {{ $reseller['name'] }} |
    | Reseler Email         | {{ $reseller['email'] }} |
    | Plan                  | {{ $order['plan']['title'] }} |
    | Date of Installation  | {{ $order['date_of_installtion'] }} |
    | Time of Installation  | {{ $order['time_of_installation'] }} |
    | Order ID              | {{ $order['id'] }} |
    | Total Amount          | {{ number_format($order['total_amount']) }} kr |
    | Order DateTime        | {{ $order['created_at'] }} |
</x-mail::table>

<x-mail::button :url="url('order-details/'. $order->id)">
View Order
</x-mail::button>
 
Thanks,<br>
{{ config('app.name') }}
</x-mail::message>