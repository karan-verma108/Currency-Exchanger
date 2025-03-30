import { useEffect, useReducer } from 'react';
import { Input } from './components/elements';
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

      case 'SET_DATA':
        return { ...state, data: action.payload };

      default:
        break;
    }
  };

  const [state, dispatch]: [
    InitialStateType,
    React.Dispatch<CurrencyExhangeActions>
  ] = useReducer(currencyExchangeReducer, initialState);

  const currencyItems = state?.data?.conversion_rates;

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

  const handleOriginCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({ type: 'SET_ORIGIN_CURRENCY', payload: e.target.value });
  };

  console.log('stata.data', state);

  return (
    <div className='h-screen flex justify-center items-center bg-amber-200 w-full'>
      <div className='py-4 border border-slate-200 shadow-2xl w-6/12 rounded-lg bg-white'>
        <div className='px-3 flex justify-between rounded-lg'>
          <Input
            id='baseAmount'
            name='baseAmount'
            value={state?.baseAmount ?? 0}
            label='From'
            type='number'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: 'SET_BASE_AMOUNT',
                payload: Number(e.target.value),
              })
            }
            inputClassName='outline-0'
          />
          <div className='flex flex-col gap-3'>
            <label htmlFor='currencyType'>Currency Type</label>
            <select id='currencyType' onChange={handleOriginCurrencyChange}>
              {state.data !== undefined &&
                currencyItems &&
                Object?.keys?.(currencyItems)?.map?.(
                  (currencyLabel: string) => (
                    <option key={currencyLabel} value={currencyLabel}>
                      {currencyLabel}
                    </option>
                  )
                )}
            </select>
          </div>

          <button
            id='dropdownDefaultButton'
            data-dropdown-toggle='dropdown'
            className='text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'
            type='button'
          >
            Dropdown button
            <svg
              className='w-2.5 h-2.5 ms-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>

          <div className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44'>
            <ul
              className='py-2 text-sm text-gray-700'
              aria-labelledby='dropdownDefaultButton'
            >
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                  Dashboard
                </a>
              </li>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                  Settings
                </a>
              </li>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                  Earnings
                </a>
              </li>
              <li>
                <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
