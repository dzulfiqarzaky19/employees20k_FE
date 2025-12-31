import { useSearchParams } from 'react-router-dom';

export const useEmployeeModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('id');
  const modalType = searchParams.get('modal');

  const openEdit = (id: string) => setSearchParams({ modal: 'edit', id });
  const openAdd = () => setSearchParams({ modal: 'add' });
  const close = () => setSearchParams({});

  return {
    isOpen: !!modalType,
    mode: modalType as 'add' | 'edit' | null,
    selectedId,
    openEdit,
    openAdd,
    close,
  };
};
