import { removeAlert } from "../../store/alerts";
import { useDispatch } from "react-redux";

export default function Toast({ alerts }) {
  const dispatch = useDispatch();
  const onDismiss = (e) =>
    dispatch(removeAlert(e.target.parentElement.parentElement.id));

  return (
    <>
      {alerts?.list.map((alert) => (
        <div
          className={"alert alert-" + alert.type}
          key={`alert-${alert.id}`}
          id={alert.id}
          toggle={onDismiss}
        >
          <div class="flex-1">
            {alert.icon && (
              <span className="">
                <i className={alert.icon} />
              </span>
            )}
            <label>{alert.msg}</label>
          </div>
        </div>
      ))}
    </>
  );
}
