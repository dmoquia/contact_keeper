import React from "react";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import AuthContext from "../context/auth/authContext";
const Home = () => {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};
export default Home;
