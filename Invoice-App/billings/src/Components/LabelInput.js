const Label = (props) => {
  return (
    <>
      <label htmlFor="">{props.name}</label>
    </>
  );
};

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.change}
    />
  );
};

export { Label, Input };
