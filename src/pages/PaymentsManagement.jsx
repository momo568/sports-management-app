/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase'; // Ensure the path is correct
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './PaymentsManagement.css';

function PaymentsManagement() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const querySnapshot = await getDocs(collection(db, 'payments'));
      const fetchedPayments = [];
      querySnapshot.forEach((doc) => {
        fetchedPayments.push({ id: doc.id, ...doc.data() });
      });
      setPayments(fetchedPayments);
    };

    fetchPayments();
  }, []);

  const [newPayment, setNewPayment] = useState({
    date: '',
    amount: '',
    paidAmount: '', // Add paid amount field
    method: 'Chèque', // Default to 'Chèque'
    status: 'Pending', // Default status to 'Pending'
    description: '',
  });

  const handleAddPayment = async () => {
    const remainingAmount = newPayment.amount - newPayment.paidAmount; // Calculate remaining amount
    const paymentWithRemaining = { ...newPayment, remainingAmount };

    try {
      const docRef = await addDoc(collection(db, 'payments'), paymentWithRemaining);
      console.log('Document added with ID: ', docRef.id);

      setPayments([...payments, { id: docRef.id, ...paymentWithRemaining }]);
      setNewPayment({
        date: '',
        amount: '',
        paidAmount: '',
        method: 'Chèque',
        status: 'Pending',
        description: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await deleteDoc(doc(db, 'payments', paymentId));
      const updatedPayments = payments.filter(payment => payment.id !== paymentId);
      setPayments(updatedPayments);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
      const paymentDoc = doc(db, 'payments', paymentId);
      await updateDoc(paymentDoc, { status: newStatus });
      setPayments(payments.map(payment => payment.id === paymentId ? { ...payment, status: newStatus } : payment));
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div className="payments-management">
      <div className="payments-controls">
        <input type="date" name="date" value={newPayment.date} onChange={handleInputChange} />
        <input type="number" name="amount" placeholder="Amount" value={newPayment.amount} onChange={handleInputChange} />
        <input type="number" name="paidAmount" placeholder="Paid Amount" value={newPayment.paidAmount} onChange={handleInputChange} /> {/* Add paid amount input */}
        <select name="method" value={newPayment.method} onChange={handleInputChange}>
          <option value="Chèque">Chèque</option>
          <option value="Espèce">Espèce</option>
          <option value="Carte bancaire">Carte bancaire</option>
        </select>
        <input type="text" name="status" placeholder="Status" value={newPayment.status} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={newPayment.description} onChange={handleInputChange} />
        <button onClick={handleAddPayment}>Add</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Paid Amount</th>
            <th>Remaining Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Description</th>
            <th>Pending</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.date}</td>
              <td>{payment.amount}</td>
              <td>{payment.paidAmount}</td>
              <td>{payment.remainingAmount}</td>
              <td>{payment.method}</td>
              <td>
                <span className={`status ${payment.status === 'Completed' ? 'completed' : 'pending'}`}>
                  {payment.status === 'Completed' ? 'Payé' : 'Non payé'}
                </span>
              </td>
              <td>{payment.description}</td>
              <td><button className="pending-button" onClick={() => updatePaymentStatus(payment.id, 'Pending')}>Pending</button></td>
              <td><button className="completed-button" onClick={() => updatePaymentStatus(payment.id, 'Completed')}>Completed</button></td>
              <td><button onClick={() => handleDeletePayment(payment.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsManagement;
