import {StudentGenderEnum} from './enums/student-gender.enum';
import {StudentLevelEnum} from './enums/student-level.enum';
import {Stories} from './Stories.model';
import {User} from './User.model';

export interface Student extends User{
  situationDetails: string
  situationTitle: string;
  startDate: Date;
  gender:StudentGenderEnum;
  level:StudentLevelEnum;
  requests:Request[];
  stories: Stories[];
}
