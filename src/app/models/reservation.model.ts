import { ReservationStatus } from './reservation-status.enum';
import { User } from './user.model';

export class Reservation {
  timeCreated: Date;
  timeStart: Date;
  timeEnd: Date;
  status: ReservationStatus;
  user: User;
}
