import { VerificationStatus } from "src/enum/verification-status.enum";
import { VerificationResponseDto } from "./verification-response.dto";

export abstract class FindOneResponseDto {
  id: number;
  nationalId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  contactNumber: string;
  lineId: string;
  medCertificateId: number;
  jobCertificateImg: string;
  jobCertificateSelfieImg: string;
  idCardImg: string;
  idCardSelfieImg: string;
  status: VerificationStatus;
  verification: VerificationResponseDto;
}