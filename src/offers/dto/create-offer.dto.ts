import { IsBoolean, IsNumber } from 'class-validator';

export class CreateOfferDto {
  itemId: number;

  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
