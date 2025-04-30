import { fieldStyle } from "./field.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Field: React.FC<Props> = ({ className, label, ...props }) => {
  return (
    <div className={className}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input {...props} className={fieldStyle} />
    </div>
  );
};
