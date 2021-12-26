import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  doFilteredList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(el => el.name.toLowerCase().includes(filter.toLowerCase().trim()));
  };

  addContact = (e, newName, newNumber) => {
    e.preventDefault();

    const isDuplicate = this.state.contacts.find(contact => contact.name === newName);

    if (isDuplicate) {
      alert(`${newName} is already in contacts.`);
    } else {
      const newContact = { id: nanoid(5), name: newName, number: newNumber };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter filter={this.state.filter} onChangeFilter={this.handleFilter} />
          <ContactList filteredList={this.doFilteredList()} onDelete={this.deleteContact} />
        </Section>
      </Container>
    );
  }
}

export default App;
