import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../../redux/contactsOps.js";
import {
  selectFilteredContacts,
  selectFilter,
} from "../../redux/contactsSlice.js";
import ContactList from "../ContactList/ContactList.jsx";
import ContactForm from "../ContactForm/ContactForm.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
import { setFilter } from "../../redux/filtersSlice.js";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts); // Відфільтровані контакти
  const filter = useSelector(selectFilter); // Значення фільтра

  // Завантаження контактів під час ініціалізації
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Додавання нового контакту
  const handleAddContact = ({ name, number }) => {
    dispatch(addContact({ name, number }));
  };

  // Видалення контакту
  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  // Обробка зміни фільтра
  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <h2>Contacts</h2>
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
