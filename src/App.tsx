import { useEffect, useReducer, useRef } from 'react';
import { CurrencyDropdown, Input } from './components/elements';
import {
  CurrencyExhangeActions,
  InitialStateType,
  initialState,
} from './types/index.ts';

export default function App() {
  const currencyExchangeReducer = (
    state: any,
    action: CurrencyExhangeActions
  ) => {
    switch (action.type) {
      case 'SET_ORIGIN_CURRENCY':
        return { ...state, originCurrency: action.payload };

      case 'SET_DESTINATION_CURRENCY':
        return { ...state, destinationCurrency: action.payload };

      case 'SET_BASE_AMOUNT':
        return { ...state, baseAmount: action.payload };

      case 'SET_CONVERTED_AMOUNT':
        return { ...state, convertedAmount: action.payload };

      case 'SET_DATA':
        return { ...state, data: action.payload };

      case 'SET_ORIGIN_CURRENCY_DROPDOWN_VISIBILITY':
        return {
          ...state,
          isOriginCurrencyDropdownVisible: action.payload
            ? false
            : !state.isOriginCurrencyDropdownVisible,
        };

      case 'SET_DESTINATION_CURRENCY_DROPDOWN_VISIBILITY':
        return {
          ...state,
          isDestinationCurrencyDropdownVisible: action.payload
            ? false
            : !state.isDestinationCurrencyDropdownVisible,
        };

      case 'CALCULATE_CURRENCY_EXCHANGE':
        return {
          ...state,
          convertedAmount: (
            state?.data?.conversion_rates?.[state?.destinationCurrency] *
            state?.baseAmount
          ).toFixed(2),
        };

      case 'SWAP_CLICK':
        return {
          ...state,
          originCurrency: state.destinationCurrency,
          destinationCurrency: state.originCurrency,
          baseAmount: state.convertedAmount,
          convertedAmount: state.baseAmount,
        };

      default:
        break;
    }
  };

  const [state, dispatch]: [
    InitialStateType,
    React.Dispatch<CurrencyExhangeActions>
  ] = useReducer(currencyExchangeReducer, initialState);

  const currencyItems = state?.data?.conversion_rates;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originCurrenciesDropdownRef: any = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destinationCurrenciesDropdownRef: any = useRef(null);

  const currencyApi: string = `${import.meta.env.VITE_CURRENCY_CONVERTER_API}${
    state?.originCurrency
  }`;

  const fetchData = async () => {
    try {
      const res = await fetch(currencyApi);
      const data = await res.json();
      dispatch({ type: 'SET_DATA', payload: data });
    } catch (error) {
      console.error('err', error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (e: any) => {
      if (
        originCurrenciesDropdownRef.current &&
        !originCurrenciesDropdownRef.current.contains(e.target)
      ) {
        dispatch({
          type: 'SET_ORIGIN_CURRENCY_DROPDOWN_VISIBILITY',
          payload: 'false',
        });
      }
      if (
        destinationCurrenciesDropdownRef.current &&
        !destinationCurrenciesDropdownRef.current.contains(e.target)
      ) {
        dispatch({
          type: 'SET_DESTINATION_CURRENCY_DROPDOWN_VISIBILITY',
          payload: 'false',
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const handleOriginCurrencyClick = (label: string) => {
    dispatch({ type: 'SET_ORIGIN_CURRENCY', payload: label });
  };

  const handleDestinationCurrencyClick = (label: string) => {
    dispatch({ type: 'SET_DESTINATION_CURRENCY', payload: label });
  };

  const handleCurrencyExchange = () => {
    dispatch({ type: 'CALCULATE_CURRENCY_EXCHANGE' });
  };

  const onSwapClick = () => {
    dispatch({ type: 'SWAP_CLICK' });
  };

  console.log('stata.data', { state: state, conversionRates: currencyItems });

  console.log(
    'result',
    currencyItems?.[state?.destinationCurrency] * state?.baseAmount
  );

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-amber-200 w-full'>
      <div className='py-4 border border-slate-200 shadow-2xl w-6/12 rounded-lg bg-white'>
        <div className='px-3 flex justify-between rounded-lg'>
          <Input
            id='baseAmount'
            name='baseAmount'
            value={state?.baseAmount === 0 ? null : state?.baseAmount}
            label='From'
            placeholder='0'
            type='number'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: 'SET_BASE_AMOUNT',
                payload: Number(e.target.value),
              })
            }
            inputClassName='outline-0 border border-slate-400 rounded-lg p-1'
          />

          <CurrencyDropdown
            state={state}
            selectedCurrency={state?.originCurrency}
            ref={originCurrenciesDropdownRef}
            onDropdownClick={() =>
              dispatch({ type: 'SET_ORIGIN_CURRENCY_DROPDOWN_VISIBILITY' })
            }
            currencyItems={currencyItems}
            isDropdownVisible={state.isOriginCurrencyDropdownVisible}
            onItemClick={handleOriginCurrencyClick}
            // className='bg-orange-400'
          />
        </div>
      </div>
      <button
        onClick={onSwapClick}
        className='bg-blue-500 text-white rounded-lg py-2 px-3 cursor-pointer'
      >
        Swap
      </button>
      <div className='py-4 border border-slate-200 shadow-2xl w-6/12 rounded-lg bg-white'>
        <div className='px-3 flex justify-between rounded-lg'>
          <Input
            id='convertedAmount'
            name='convertedAmount'
            value={state?.convertedAmount === 0 ? null : state?.convertedAmount}
            label='To'
            placeholder='0'
            type='number'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: 'SET_CONVERTED_AMOUNT',
                payload: Number(e.target.value),
              })
            }
            inputClassName='outline-0 border border-slate-400 rounded-lg p-1'
          />

          <CurrencyDropdown
            state={state}
            selectedCurrency={state?.destinationCurrency}
            ref={destinationCurrenciesDropdownRef}
            onDropdownClick={() =>
              dispatch({ type: 'SET_DESTINATION_CURRENCY_DROPDOWN_VISIBILITY' })
            }
            currencyItems={currencyItems}
            isDropdownVisible={state.isDestinationCurrencyDropdownVisible}
            onItemClick={handleDestinationCurrencyClick}
            // className='bg-red-400'
          />
        </div>
      </div>
      <button
        onClick={handleCurrencyExchange}
        className='bg-blue-400 text-white rounded-lg py-3 px-4 cursor-pointer'
      >
        Covert {state?.originCurrency} to {state?.destinationCurrency}
      </button>
    </div>
  );
}
