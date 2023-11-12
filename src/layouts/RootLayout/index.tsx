import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../ui/components/organisms/Header';
import BoardModal from '../../components/BoardModal';

export default function RootLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (location.pathname === '/') {
        navigate('/boards');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      <Outlet context={{ setIsModalOpen }} />
      {isModalOpen && (
        <BoardModal setIsModalOpen={setIsModalOpen} mode={'create'} />
      )}
    </>
  );
}
