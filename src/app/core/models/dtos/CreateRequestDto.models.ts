import {RequestStatus} from '../enums/request-status.enum';
import {Student} from '../Student.model';
import {Media} from '../Media.model';

export interface CreateRequestDto{
  title : string;
  description : string;
  reason : string;
  status : RequestStatus;
  amount : number;
  studentId : string;
  media? : Media[];
}
