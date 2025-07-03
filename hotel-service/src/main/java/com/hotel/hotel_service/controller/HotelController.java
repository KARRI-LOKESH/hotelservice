package com.hotel.hotel_service.controller;

import com.hotel.hotel_service.model.Hotel;
import com.hotel.hotel_service.service.HotelService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @Value("${upload.dir:uploads}")
    private String uploadDir;

    @GetMapping
    public List<Hotel> getHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id);
        return hotel != null ? ResponseEntity.ok(hotel) : ResponseEntity.notFound().build();
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Hotel> addHotel(
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("pricePerNight") double pricePerNight,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        String imagePath = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String filename = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Files.copy(imageFile.getInputStream(), uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
                imagePath = "/uploads/" + filename;
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Hotel hotel = new Hotel();
        hotel.setName(name);
        hotel.setAddress(address);
        hotel.setCity(city);
        hotel.setPricePerNight(pricePerNight);
        hotel.setImageUrl(imagePath);

        Hotel savedHotel = hotelService.saveHotel(hotel);
        return ResponseEntity.ok(savedHotel);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
public ResponseEntity<Hotel> updateHotel(
        @PathVariable Long id,
        @RequestParam("name") String name,
        @RequestParam("address") String address,
        @RequestParam("city") String city,
        @RequestParam("pricePerNight") double pricePerNight,
        @RequestParam(value = "image", required = false) MultipartFile imageFile
) {
    Hotel existingHotel = hotelService.getHotelById(id);
    if (existingHotel == null) {
        return ResponseEntity.notFound().build();
    }

    existingHotel.setName(name);
    existingHotel.setAddress(address);
    existingHotel.setCity(city);
    existingHotel.setPricePerNight(pricePerNight);

    if (imageFile != null && !imageFile.isEmpty()) {
        try {
            String filename = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(imageFile.getInputStream(), uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            existingHotel.setImageUrl("/uploads/" + filename);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    Hotel updatedHotel = hotelService.saveHotel(existingHotel); // use saveHotel to update
    return ResponseEntity.ok(updatedHotel);
}


    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotelById(id);
    }
}
