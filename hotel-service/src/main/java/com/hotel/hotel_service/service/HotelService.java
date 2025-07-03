package com.hotel.hotel_service.service;

import com.hotel.hotel_service.model.Hotel;
import com.hotel.hotel_service.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }

    public Hotel saveHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public void deleteHotelById(Long id) {
        hotelRepository.deleteById(id);
    }
    public Hotel updateHotel(Long id, Hotel updatedHotel) {
    return hotelRepository.findById(id).map(hotel -> {
        hotel.setName(updatedHotel.getName());
        hotel.setAddress(updatedHotel.getAddress());
        hotel.setCity(updatedHotel.getCity());
        hotel.setPricePerNight(updatedHotel.getPricePerNight());
        return hotelRepository.save(hotel);
    }).orElse(null);
}

}
