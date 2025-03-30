import { twMerge } from 'tw-merge';

export default function Input({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  inputClassName,
  containerClassName,
}: {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
}): React.JSX.Element {
  return (
    <div className={twMerge(`flex flex-col gap-3 ${containerClassName ?? ''}`)}>
      <label htmlFor='fromCurrency'>{label}</label>
      <input
        type={type ?? ''}
        id={id ?? ''}
        name={name ?? ''}
        value={value ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        placeholder={placeholder ?? ''}
        className={inputClassName ?? ''}
      />
    </div>
  );
}
