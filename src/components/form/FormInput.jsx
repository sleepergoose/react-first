import './FormItems.css';
import { TextField } from '@mui/material';

const FormInput = ({
  name,
  type,
  variant,
  label,
  register,
  errors,
  multiline = undefined,
}) => {
  return (
    <div className="height">
      <TextField
        label={label}
        variant={variant}
        type={type}
        name={name}
        className="form-control"
        placeholder={label}
        multiline={!!multiline}
        maxRows={multiline ?? undefined}
        {...register}
      />

      {errors[name]?.type === 'required' && (
        <span role="alert">The &#39;{label}&#39; field is required</span>
      )}
      {errors[name]?.type === 'minLength' && (
        <span role="alert">{errors[name]?.message}</span>
      )}
      {errors[name]?.type === 'maxLength' && (
        <span role="alert">{errors[name]?.message}</span>
      )}
      {errors[name]?.type === 'min' && (
        <span role="alert">{errors[name]?.message}</span>
      )}
      {errors[name]?.type === 'max' && (
        <span role="alert">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default FormInput;
