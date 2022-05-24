import { Component, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Plant } from '../models/plant';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.css']
})
export class PlantCardComponent {
  @Input() plant: Plant;
  plantBeingWatered: boolean = false;
  wateringProgressBarValue: number = 0;
  timeWateredMilliseconds: number = 0;
  timer = interval(10);
  intervalCounter: number = 0;
  subscription: Subscription;
  wateringStatusText: string = "Idle";

  constructor(private plantService: PlantService) { }

  handleWaterState() {
    this.plantBeingWatered = !this.plantBeingWatered;
    if(this.plantBeingWatered) {
      this.wateringStatusText = "Watering...";
      this.waterPlant();
    } else {
      this.wateringStatusText = "Stopped";
      this.subscription.unsubscribe();
    }
  }

  private waterPlant() {
    this.subscription = this.timer.subscribe(() => {
      this.wateringProgressBarValue =  this.timeWateredMilliseconds / 100;
      this.timeWateredMilliseconds = (this.intervalCounter++ * 10);

      if (this.timeWateredMilliseconds === 10000) {
        // watering successful
        this.subscription.unsubscribe();
        this.plantBeingWatered = false;
        this.intervalCounter = 0;
        this.wateringProgressBarValue = 0;
        this.updateLastWateredTime(new Date());
      }
    });
  }

  private updateLastWateredTime(dateTime: Date) {
    this.plantService.updateLastWateredTime(this.plant.id, dateTime).subscribe
    (plant => {
        this.plant = plant;
        this.wateringStatusText = "Success!";
      }
    ),
    (err => {
      console.log(err);
      this.wateringStatusText = "Error";
      }
    );
  }
}
