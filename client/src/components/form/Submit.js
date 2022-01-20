import { useFormikContext } from "formik";

function SubmitBtn({ title, className, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      type="submit"
      className={"btn btn-primary mt-4 normal-case " + className}
      {...otherProps}
      onClick={handleSubmit}
    >
      {title}
    </button>
  );
}

export default SubmitBtn;
