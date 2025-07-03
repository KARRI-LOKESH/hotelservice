package com.hotel.hotel_service.dto;

import com.hotel.hotel_service.model.Booking;

public class BookingResponse {
    public Long id;
    public Long hotelId;
    public Long userId;
    public String checkInDate;
    public String checkOutDate;
    public int guests;
    public int rooms;

    public BookingResponse(Booking booking) {
        this.id = booking.getId();
        this.hotelId = booking.getHotel().getId();
        this.userId = booking.getUser().getId();
        this.checkInDate = booking.getCheckInDate().toString();
        this.checkOutDate = booking.getCheckOutDate().toString();
        this.guests = booking.getGuests();
        this.rooms = booking.getRooms();
    }
}
