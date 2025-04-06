export type CurrencyExhangeActions =
  | { type: 'SET_BASE_AMOUNT'; payload: number }
  | { type: 'SET_CONVERTED_AMOUNT'; payload: number }
  | { type: 'SET_ORIGIN_CURRENCY'; payload: string }
  | { type: 'SET_DESTINATION_CURRENCY'; payload: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'SET_DATA'; payload: any }
  | { type: 'SET_ORIGIN_CURRENCY_DROPDOWN_VISIBILITY'; payload?: string }
  | { type: 'SET_DESTINATION_CURRENCY_DROPDOWN_VISIBILITY'; payload?: string }
  | { type: 'CALCULATE_CURRENCY_EXCHANGE' }
  | { type: 'SWAP_CLICK' };

export const initialState: InitialStateType = {
  originCurrency: 'usd',
  destinationCurrency: 'inr',
  baseAmount: null,
  convertedAmount: null,
  data: {},
  isOriginCurrencyDropdownVisible: false,
  isDestinationCurrencyDropdownVisible: false,
};

export interface InitialStateType {
  originCurrency: string;
  destinationCurrency: string;
  baseAmount: number | null;
  convertedAmount: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isOriginCurrencyDropdownVisible: boolean;
  isDestinationCurrencyDropdownVisible: boolean;
}
