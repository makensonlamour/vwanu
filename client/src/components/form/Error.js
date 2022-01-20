function FormError({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <label className="label">
      <span className="label-text-alt text-danger">{error}</span>
    </label>
  );
}

export default FormError;
