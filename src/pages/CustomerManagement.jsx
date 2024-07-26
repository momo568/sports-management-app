/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; // Importez votre instance Firestore configurée
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './CustomerManagement.css';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    date: '',
    signIn: '',
    signOut: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const fetchedCustomers = [];
      querySnapshot.forEach((doc) => {
        fetchedCustomers.push({ id: doc.id, ...doc.data() });
      });
      setCustomers(fetchedCustomers);
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    try {
      const docRef = await addDoc(collection(db, 'customers'), newCustomer);
      console.log('Document added with ID: ', docRef.id);

      setCustomers([...customers, { id: docRef.id, ...newCustomer }]);
      setNewCustomer({
        date: '',
        signIn: '',
        signOut: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteDoc(doc(db, 'customers', customerId));
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="customer-management">
      <div className="customer-controls">
        <button onClick={() => setShowForm(!showForm)}>Add</button>
      </div>

      <div className={`customer-form ${showForm ? 'active' : ''}`}>
        <h2>Add Customer</h2>
        <form>
          <input type="date" name="date" value={newCustomer.date} onChange={handleInputChange} />
          <input type="time" name="signIn" value={newCustomer.signIn} onChange={handleInputChange} />
          <input type="time" name="signOut" value={newCustomer.signOut} onChange={handleInputChange} />
          <input type="text" name="firstName" placeholder="First Name" value={newCustomer.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={newCustomer.lastName} onChange={handleInputChange} />
          <input type="tel" name="phone" placeholder="Phone" value={newCustomer.phone} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
          <button type="button" onClick={handleAddCustomer}>Create</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sign In</th>
            <th>Sign Out</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.date}</td>
              <td>{customer.signIn}</td>
              <td>{customer.signOut}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;

