const FormInput = ({
  name = "",
  type,
  placeholder,
  size = "large",
  isRequired = "false",
  register = () => {},
  errors = {},
  setValue = () => {},
  value = "",
  watch = () => {},
  readOnly = false,
  onChangeFnc = () => {},
}: {
  name?: string;
  type?: string;
  placeholder?: string;
  size?: any;
  isRequired?: string;
  register?: any;
  errors?: any;
  setValue?: any;
  value?: any;
  watch?: any;
  readOnly?: boolean;
  onChangeFnc?: any;
}) => {
  return (
    <>
      {type === "text" ||
      type === "number" ||
      type === "email" ||
      type === "textArea" ? (
        <>
          {type === "textArea" ? (
            <textarea
              readOnly={readOnly}
              {...register(name, {
                required: isRequired === "true" ? true : false,
              })}
              name={name}
              placeholder={placeholder}
              size={size}
              defaultValue={value}
              onChange={(e) => {
                setValue(name, e.target.value);
                onChangeFnc();
              }}
              style={{
                marginBottom: "0px",
                borderColor: errors && errors[name] ? "red" : "#cdcdcd",
                padding: "10px 10px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
              }}
            />
          ) : (
            <input
              type={type}
              readOnly={readOnly}
              {...register(name, {
                required: isRequired === "true" ? true : false,
              })}
              name={name}
              placeholder={placeholder}
              size={size}
              defaultValue={value}
              onChange={(e) => {
                setValue(name, e.target.value);
                onChangeFnc;
              }}
              style={{
                marginBottom: "0px",
                borderColor: errors && errors[name] ? "red" : "#cdcdcd",
                padding: "10px 10px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                height: "42px",
              }}
            />
          )}
        </>
      ) : (
        <>
          <input
            readOnly={readOnly}
            {...register(name, {
              required: isRequired === "true" ? true : false,
            })}
            name={name}
            placeholder={placeholder}
            size={size}
            defaultValue={value}
            onChange={(e) => {
              setValue(name, e.target.value);
              onChangeFnc;
            }}
            style={{
              marginBottom: "0px",
              borderColor: errors && errors[name] ? "red" : "#cdcdcd",
              padding: "10px 10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              height: "42px",
            }}
          />
        </>
      )}
    </>
  );
};

export default FormInput;
