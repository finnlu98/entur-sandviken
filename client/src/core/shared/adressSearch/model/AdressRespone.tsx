import BaseResponse from "../../../../api/model/BaseResponse";
import type { Coordinate } from "../../../../model/Coordinate";

export class SearchAddressResponse extends BaseResponse {
  adresser!: AdressResult[];
}

class AdressResult {
  adressetekst!: string;
  representasjonspunkt!: Coordinate;
  kommunenavn!: string;
  kommunenummer!: string;
}
