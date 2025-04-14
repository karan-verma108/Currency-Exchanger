import { twMerge } from 'tw-merge';

export default function Dropdown({
  data,
  className,
  currencyItems,
  onItemClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  className: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currencyItems: any;
  onItemClick: (currency: string) => void;
}): React.JSX.Element {
  return (
    <div
      className={twMerge(
        `z-10 absolute top-20 bg-white divide-y divide-gray-100 border border-gray-200 rounded-lg shadow-sm overflow-y-auto h-44 container ${
          className ?? ''
        }`
      )}
    >
      <ul
        className='py-2 text-sm text-gray-700  text-center flex flex-col gap-2.5'
        aria-labelledby='dropdownDefaultButton'
      >
        {data !== undefined &&
          currencyItems &&
          Object?.keys?.(currencyItems)?.map?.((currencyLabel: string) => (
            <li
              key={currencyLabel}
              value={currencyLabel}
              className='cursor-pointer hover:bg-amber-300 hover:text-amber-700 py-1'
              onClick={() => onItemClick(currencyLabel)}
            >
              {currencyLabel}
            </li>
          ))}
      </ul>
    </div>
  );
}
