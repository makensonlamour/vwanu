import { useFormikContext } from "formik";

function SubmitBtn({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      className="btn btn-primary mt-4"
      {...otherProps}
      onClick={handleSubmit}
    >
      {title}
    </button>
  );
}

export default SubmitBtn;
