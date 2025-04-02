import { InitialStateType } from '../../types';
import DropdownOptions from './DropdownOptions';

export default function CurrencyDropdown({
  state,
  ref,
  onDropdownClick,
  currencyItems,
  onItemClick,
}: {
  state: InitialStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  onDropdownClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currencyItems: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemClick: any;
}): React.JSX.Element {
  return (
    <div
      className='flex flex-col gap-3 relative'
      onClick={() => onDropdownClick()}
      ref={ref}
    >
      <label htmlFor='currencyType'>Currency Type</label>

      <button
        data-dropdown-toggle='dropdown'
        className='text-black bg-white border border-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer'
        type='button'
      >
        {state?.originCurrency}
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
      {state?.isDropdownVisible && (
        <DropdownOptions
          data={state.data}
          currencyItems={currencyItems}
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
}
