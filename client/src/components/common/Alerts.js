import React from "react";
import PropTypes from "prop-types";
import { removeAlert } from "../../features/alert/alertSlice";
import { useDispatch } from "react-redux";

import { BsFillExclamationTriangleFill } from "react-icons/bs";

export default function Toast({ alerts, className }) {
  const dispatch = useDispatch();
  const onDismiss = (e) => dispatch(removeAlert(e.target.parentElement.parentElement.id));

  return (
    <>
      {alerts?.list.map((alert) => (
        <>
          <div className={className + " alert alert-" + alert.type} key={`alert-${alert.id}`} id={alert.id} toggle={onDismiss}>
            <div className="flex-1">
              {<span className="px-4">{<BsFillExclamationTriangleFill size="24px" />}</span>}
              <label>{alert.msg}</label>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

Toast.propTypes = { alerts: PropTypes.object.isRequired, className: PropTypes.string };
