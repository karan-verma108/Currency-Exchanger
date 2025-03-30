export type CurrencyExhangeActions =
  | { type: 'SET_BASE_AMOUNT'; payload: number }
  | { type: 'SET_BASE_CONVERTED_AMOUNT'; payload: number }
  | { type: 'SET_ORIGIN_CURRENCY'; payload: string }
  | { type: 'SET_DESTINATION_CURRENCY'; payload: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'SET_DATA'; payload: any };

export const initialState: InitialStateType = {
  originCurrency: 'usd',
  destinationCurrency: 'inr',
  baseAmount: 0,
  convertedAmount: 0,
  data: {},
};

export interface InitialStateType {
  originCurrency: string;
  destinationCurrency: string;
  baseAmount: number;
  convertedAmount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
