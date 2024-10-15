// import PropTypes from 'prop-types';
import Button from '@/ui/button/Button';
import Modal from '@/ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opensWindowName="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
