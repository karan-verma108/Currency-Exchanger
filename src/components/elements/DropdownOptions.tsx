export default function Dropdown({
  data,
  currencyItems,
  onItemClick,
}: {
  data: any;
  currencyItems: any;
  onItemClick: (currency: string) => void;
}): React.JSX.Element {
  return (
    <div className='z-10 absolute top-20 bg-white divide-y divide-gray-100 border border-gray-200 rounded-lg shadow-sm overflow-y-auto h-44 container'>
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
              className='cursor-pointer hover:bg-blue-400 hover:text-black py-1'
              onClick={() => onItemClick(currencyLabel)}
            >
              {currencyLabel}
            </li>
          ))}
      </ul>
    </div>
  );
}
