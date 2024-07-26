/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; // Importez votre instance Firestore configurée
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './HolidayPage.css'// Assurez-vous d'ajouter des styles pour la page des vacances

function HolidayPage() {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ date: '', name: '' });

  useEffect(() => {
    const fetchHolidays = async () => {
      const querySnapshot = await getDocs(collection(db, 'holidays'));
      const fetchedHolidays = [];
      querySnapshot.forEach((doc) => {
        fetchedHolidays.push({ id: doc.id, ...doc.data() });
      });
      setHolidays(fetchedHolidays);
    };

    fetchHolidays();
  }, []);

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (newHoliday.date && newHoliday.name) {
      try {
        const docRef = await addDoc(collection(db, 'holidays'), newHoliday);
        console.log('Document added with ID: ', docRef.id);

        setHolidays([...holidays, { id: docRef.id, ...newHoliday }]);
        setNewHoliday({ date: '', name: '' }); // Réinitialiser le formulaire
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('Please enter both date and holiday name');
    }
  };

  const handleDeleteHoliday = async (holidayId) => {
    try {
      await deleteDoc(doc(db, 'holidays', holidayId));
      const updatedHolidays = holidays.filter(holiday => holiday.id !== holidayId);
      setHolidays(updatedHolidays);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="holiday-page">
      <h1>Holiday Page</h1>
      <form onSubmit={handleAddHoliday} className="holiday-form">
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newHoliday.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Holiday Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newHoliday.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Holiday</button>
      </form>
      <table className="holiday-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Holiday</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={index}>
              <td>{holiday.date}</td>
              <td>{holiday.name}</td>
              <td>
                <button onClick={() => handleDeleteHoliday(holiday.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HolidayPage;
