import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Observable, Subscription } from 'rxjs';
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
  timer: Observable<number> = interval(10);
  intervalCounter: number = 0;
  subscription: Subscription;
  wateringStatusText: string = "Idle";

  constructor(private plantService: PlantService, private snackBar: MatSnackBar) { }

  handleWaterState(): void {
    // check if last watered time is within 30 seconds of current time
    // alert user that plant cannot be watered again within 30 seconds
    if (this.lastWateredTimeWithin30Seconds()) {
      return;
    }

    this.plantBeingWatered = !this.plantBeingWatered;
    if (this.plantBeingWatered) {
      this.wateringStatusText = "Watering...";
      this.waterPlant();
    } else {
      this.wateringStatusText = "Stopped";
      this.subscription.unsubscribe();
    }
  }

  private lastWateredTimeWithin30Seconds(): boolean {
    const thirtySeconds = 1000 * 30;
    const thirtySecondsAgo = Date.now() - thirtySeconds;
    const isWithin30Seconds = this.plant.lastWateredTime.getTime() >= thirtySecondsAgo;

    if (isWithin30Seconds) {
      this.snackBar.open(this.plant.name + " Needs Time to Absorb", "Got It", {
        duration: 5000,
      });
    }

    return isWithin30Seconds;
  }

  private waterPlant(): void {
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

  private updateLastWateredTime(dateTime: Date): void {
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

  subtractOneHourFromLastWateredTime(): void {
    this.plant.lastWateredTime.setHours(this.plant.lastWateredTime.getHours() - 1);
    this.plantService.updateLastWateredTime(this.plant.id, this.plant.lastWateredTime).subscribe
    (plant => {
        this.plant = plant;
        this.wateringStatusText = "Idle";
      }
    ),
    (err => {
      console.log(err);
      this.wateringStatusText = "Error";
      }
    );
  }

  wateredMoreThanSixHoursAgo(): boolean {
    const sixHour = 1000 * 60 * 60 * 6;
    const sixHourAgo = Date.now() - sixHour;
    return this.plant.lastWateredTime.getTime() < sixHourAgo;
  }
}
