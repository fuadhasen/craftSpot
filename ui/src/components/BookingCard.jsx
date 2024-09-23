function BookingCard({ booking }) {
    return (
        <li className="p-4 bg-white shadow-md rounded-md">
            <p className="text-lg font-bold">{booking.service.name}</p>
            <p>{new Date(booking.schedule_time).toLocaleString()}</p>
        </li>
    );
}

export default BookingCard;