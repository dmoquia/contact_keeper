import React from "react";
import PropTypes from "prop-types";
import ContactContext from "../context/contact/contactContext";
const ContactItem = ({ contact }) => {
  const contactContext = React.useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" />
            {email}
          </li>
        )}
        {email && (
          <li>
            <i className="fas fa-phone" />
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          delete
        </button>
      </p>
    </div>
  );
};
ContactItem.protoTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
