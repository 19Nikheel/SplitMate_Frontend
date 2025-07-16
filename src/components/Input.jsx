export const Input = ({
  label,
  type,
  placeholder,
  HandleOnChange,
  val,
  req,
}) => {
  return (
    <div className="inpc">
      <div className="label">{label}</div>
      <input
        className="inp"
        type={type}
        placeholder={placeholder}
        onChange={HandleOnChange}
        value={val}
        required={req}
      ></input>
    </div>
  );
};
