import { Component, OnInit } from '@angular/core';
import { HotelForm } from '../models/hotel-form';
import { NgForm } from '@angular/forms';
import {HotelService} from '../services/hotel.service';
import { Router } from '@angular/router';
import { Room } from '../models/room';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  addHotelForm = new HotelForm('', '', '', '', '', 0, false,[]);
  hotelSubmission;
  rooms : Room[];

  constructor(private hotelService : HotelService,
              private router: Router) { }
              

  ngOnInit(): void {
    this.hotelService.getAllRooms().subscribe(data => {
      this.rooms = data as Room[];
      console.log(this.rooms);
    });
  }

  addHotel(hotelForm:NgForm) {
    console.log(this.addHotelForm)
    console.log(JSON.stringify(hotelForm.value))
    this.hotelSubmission=new HotelForm(hotelForm.value.hotelName, hotelForm.value.address,
      hotelForm.value.postcode, hotelForm.value.city, hotelForm.value.ammenities, hotelForm.value.starRating,
      hotelForm.value.airportTransfers, hotelForm.value.room)
      console.log(this.hotelSubmission)

    this.hotelService.addHotelSubmit(this.hotelSubmission).subscribe( data => {
      if (data){
        this.router.navigate(['/hotel-list']);
      }
    });
  }
}
