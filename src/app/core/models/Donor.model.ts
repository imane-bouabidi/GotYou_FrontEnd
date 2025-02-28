import {DonorTypeEnum} from './enums/donor-type.enum';
import {DonationModel} from './Donation.model';
import {User} from './User.model';

export interface DonorModel extends User{
  speciality: string;
  reason: string;
  donorType:DonorTypeEnum;
  donations:DonationModel[];
}
