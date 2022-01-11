function FormError({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <label class="label">
      <span class="label-text-alt text-danger">{error}</span>
    </label>
  );
}

export default FormError;
