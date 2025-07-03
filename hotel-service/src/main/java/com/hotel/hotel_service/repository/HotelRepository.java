package com.hotel.hotel_service.repository;

import com.hotel.hotel_service.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
