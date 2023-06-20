interface IInputProps {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export type { IInputProps };
