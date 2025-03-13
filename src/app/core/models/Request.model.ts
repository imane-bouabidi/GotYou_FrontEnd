import {RequestStatus} from './enums/request-status.enum';
import {Student} from './Student.model';
import {StudentDonation} from './StudentDonation.model';
import {DonationBox} from './DonationBox.model';
import {Media} from './Media.model';

export interface Request {
  id : number;
  title : string;
  description : string;
  requestDate? : Date;
  reason : string;
  status : RequestStatus;
  amount : number;
  // student : Student;
  student: Student;
  studentDonation? : StudentDonation[];
  donationBox? : DonationBox;
  media? : Media[];
}
