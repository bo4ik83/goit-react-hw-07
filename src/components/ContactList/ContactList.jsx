import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps"; // Використовуйте операцію для видалення
import { selectFilteredContacts } from "../../redux/contactsSlice"; // Мемоізований селектор
import s from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts); // Відфільтровані контакти

  if (!filteredContacts.length) {
    return <p className={s.message}>No contacts found.</p>;
  }

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <p className={s.contactInfo}>
            <span className={s.contactName}>{name}:</span>{" "}
            <span className={s.contactNumber}>{number}</span>
          </p>
          <button
            className={s.button}
            onClick={() => dispatch(deleteContact(id))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                dispatch(deleteContact(id));
              }
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
