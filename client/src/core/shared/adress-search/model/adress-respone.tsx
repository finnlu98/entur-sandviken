import BaseResponse from '../../../../api/model/base-response';
import type { Coordinate } from '../../../../model/coordinate';

export class SearchAddressResponse extends BaseResponse {
  adresser!: AdressResult[];
}

class AdressResult {
  adressetekst!: string;
  representasjonspunkt!: Coordinate;
  kommunenavn!: string;
  kommunenummer!: string;
}
