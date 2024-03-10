import { Injectable } from '@angular/core';
import { list, ref, Database, set, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private database: Database) {}

  addData(timeStart: number) {
    const data = {
      timeStamp: new Date(timeStart).getTime(),
      email: 'giannis.keik@gmail.com',
      name: 'John',
      phone: '78329418298',
    };
    set(ref(this.database, `/tempReservations/${data.timeStamp}/`), {
      email: data.email,
      name: data.name,
      phone: data.phone,
    });
  }

  addReservation(reservation: Reservation) {
    set(
      ref(this.database, `/tempReservations/${reservation.timeStart}/`),
      reservation
    );
  }

  getData(): Observable<any> {
    const starCountRef = ref(this.database, 'tempReservations/');

    return new Observable<any>((observer) => {
      const unsubscribe = onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        observer.next(data);
      });

      return () => unsubscribe();
    });
  }
}
