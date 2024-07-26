/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; // Importez votre instance Firestore configurée
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './OffresManagement.css';

function OffresManagement() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const querySnapshot = await getDocs(collection(db, 'offers'));
      const fetchedOffers = [];
      querySnapshot.forEach((doc) => {
        fetchedOffers.push({ id: doc.id, ...doc.data() });
      });
      setOffers(fetchedOffers);
    };

    fetchOffers();
  }, []);

  const [showForm, setShowForm] = useState(false);

  const [newOffer, setNewOffer] = useState({
    date: '',
    duration: '1 mois',
    endDate: '',
    title: '',
    description: '',
    price: '',
  });

  const calculateEndDate = (startDate, duration) => {
    const start = new Date(startDate);
    let end = new Date(startDate);
    switch (duration) {
      case '1 mois':
        end.setMonth(start.getMonth() + 1);
        break;
      case '3 mois':
        end.setMonth(start.getMonth() + 3);
        break;
      case '6 mois':
        end.setMonth(start.getMonth() + 6);
        break;
      case '12 mois':
        end.setFullYear(start.getFullYear() + 1);
        break;
      default:
        break;
    }
    return end.toISOString().split('T')[0];
  };

  const handleAddOffer = async () => {
    const endDate = calculateEndDate(newOffer.date, newOffer.duration);
    const offerWithEndDate = { ...newOffer, endDate };

    try {
      const docRef = await addDoc(collection(db, 'offers'), offerWithEndDate);
      console.log('Document added with ID: ', docRef.id);

      setOffers([...offers, { id: docRef.id, ...offerWithEndDate }]);
      setShowForm(false); // Hide form after adding offer
      setNewOffer({
        date: '',
        duration: '1 mois',
        endDate: '',
        title: '',
        description: '',
        price: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await deleteDoc(doc(db, 'offers', offerId));
      const updatedOffers = offers.filter(offer => offer.id !== offerId);
      setOffers(updatedOffers);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  return (
    <div className="offers-management">
      <div className="offers-controls">
        <button onClick={() => setShowForm(!showForm)}>Add</button>
      </div>

      <div className={`offers-form ${showForm ? 'active' : ''}`}>
        <h2>Add Offer</h2>
        <form>
          <input type="date" name="date" value={newOffer.date} onChange={handleInputChange} />
          <select name="duration" value={newOffer.duration} onChange={handleInputChange}>
            <option value="1 mois">1 mois</option>
            <option value="3 mois">3 mois</option>
            <option value="6 mois">6 mois</option>
            <option value="12 mois">12 mois</option>
          </select>
          <input type="text" name="title" placeholder="Title" value={newOffer.title} onChange={handleInputChange} />
          <input type="text" name="description" placeholder="Description" value={newOffer.description} onChange={handleInputChange} />
          <input type="number" name="price" placeholder="Price" value={newOffer.price} onChange={handleInputChange} />
          <button type="button" onClick={handleAddOffer}>Create</button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>End Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr key={index}>
              <td>{offer.date}</td>
              <td>{offer.duration}</td>
              <td>{offer.endDate}</td>
              <td>{offer.title}</td>
              <td>{offer.description}</td>
              <td>{offer.price}</td>
              <td><button onClick={() => handleDeleteOffer(offer.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OffresManagement;



