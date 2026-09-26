import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { IsStellarPublicKey } from '../../common/validators/stellar-address.validator';

export class BuyPolicyDto {
  @IsString()
  @IsNotEmpty()
  @IsStellarPublicKey()
  holder: string;

  @IsString()
  @IsNotEmpty()
  policyId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  premium?: number;
}
