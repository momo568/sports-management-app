import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider,useAuth } from './pages/AuthContext';
import NavBar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar';
import CustomerManagement from './pages/CustomerManagement';
import OffresManagement from './pages/OffresManagement';
import PaymentsManagement from './pages/PaymentsManagement';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContactForm from './pages/ContactForm';
import CalendarPage from './pages/CalendarPage';
import HolidayPage from './pages/HolidayPage';
import StatisticsChart from './pages/StatisticsChart';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  const [customerData, setCustomerData] = React.useState([]);
  const [paymentData, setPaymentData] = React.useState([]);
  const [offerData, setOfferData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const customerSnapshot = await getDocs(collection(db, 'customers'));
        const fetchedCustomerData = customerSnapshot.docs.map(doc => doc.data() || {});

        const paymentSnapshot = await getDocs(collection(db, 'payments'));
        const fetchedPaymentData = paymentSnapshot.docs.map(doc => doc.data() || {});

        const offerSnapshot = await getDocs(collection(db, 'offers'));
        const fetchedOfferData = offerSnapshot.docs.map(doc => doc.data() || {});

        setCustomerData(fetchedCustomerData);
        setPaymentData(fetchedPaymentData);
        setOfferData(fetchedOfferData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="customerManagement" element={<CustomerManagement />} />
        <Route path="offerManagement" element={<OffresManagement />} />
        <Route path="paymentsManagement" element={<PaymentsManagement />} />
        <Route path="/contact-us" element={<ContactForm />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/holiday" element={<HolidayPage />} />
        <Route path="/statistics" element={
          <div>
            <h1>Statistics Dashboard</h1>
            <StatisticsChart
              customerData={customerData}
              paymentData={paymentData}
              offerData={offerData}
            />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          <Route path="/*" element={<PrivateRoutes />} />
          <Route path="/public/*" element={<PublicRoutes />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;

