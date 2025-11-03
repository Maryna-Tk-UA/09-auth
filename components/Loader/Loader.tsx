import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <div className={css.spinner} />
      <span className={css.text}>Loading...</span>
    </div>
  );
}

export default Loader;
