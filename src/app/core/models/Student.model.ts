import {StudentGenderEnum} from './enums/student-gender.enum';
import {StudentLevelEnum} from './enums/student-level.enum';
import {Stories} from './Stories.model';

export interface Student{
  major: string
  situationDetails: string
  situationTitle: string;
  startDate: Date;
  gender:StudentGenderEnum;
  level:StudentLevelEnum;
  requests:Request[];
  stories: Stories[];
}
