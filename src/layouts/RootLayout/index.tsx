import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../ui/components/organisms/Header';
import CreateNewBoardModal from '../../components/CreateNewBoardModal';

export default function RootLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/boards');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      <Outlet context={{ setIsModalOpen }} />
      {isModalOpen && <CreateNewBoardModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
