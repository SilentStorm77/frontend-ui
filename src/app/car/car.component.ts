import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
  cameraUrl: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.startCamera();
  }

  startCamera(): void {
    // Make HTTP GET request to Spring Boot endpoint to get camera feed URL
    this.http.get('http://localhost:8080/stream', { responseType: 'blob' })
      .subscribe(response => {
        this.cameraUrl = URL.createObjectURL(response);
      });
  }

  controlCar(direction: string): void {
    // Make HTTP POST request to Spring Boot endpoint to control the car
    this.http.post('http://localhost:8080/control', { direction: direction, speed: 100 })
      .subscribe(response => {
        console.log(response);
      });
  }
}

