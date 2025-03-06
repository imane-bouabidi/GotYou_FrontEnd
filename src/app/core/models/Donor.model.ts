import {DonorTypeEnum} from './enums/donor-type.enum';
import {DonationModel} from './Donation.model';

export interface DonorModel{
  speciality: string;
  reason: string;
  donorType:DonorTypeEnum;
  donations:DonationModel[];
}
