package com.hotel.hotel_service.controller;

import com.hotel.hotel_service.dto.BookingRequest;
import com.hotel.hotel_service.model.Booking;
import com.hotel.hotel_service.model.Hotel;
import com.hotel.hotel_service.model.User;
import com.hotel.hotel_service.repository.BookingRepository;
import com.hotel.hotel_service.repository.HotelRepository;
import com.hotel.hotel_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest bookingRequest) {

        Optional<Hotel> hotelOpt = hotelRepository.findById(bookingRequest.getHotelId());
        if (hotelOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid hotel ID");
        }

        Optional<User> userOpt = userRepository.findById(bookingRequest.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid user ID");
        }

        if (bookingRequest.getCheckInDate() == null || bookingRequest.getCheckOutDate() == null
                || !bookingRequest.getCheckOutDate().isAfter(bookingRequest.getCheckInDate())) {
            return ResponseEntity.badRequest().body("Invalid check-in/check-out dates");
        }

        Booking booking = new Booking();
        booking.setHotel(hotelOpt.get());
        booking.setUser(userOpt.get());
        booking.setCheckInDate(bookingRequest.getCheckInDate());
        booking.setCheckOutDate(bookingRequest.getCheckOutDate());
        booking.setGuests(bookingRequest.getGuests());
        booking.setRooms(bookingRequest.getRooms());

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }
}
