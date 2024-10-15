import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '@/features/cabins/components/CabinTable';
import AddCabin from '@/features/cabins/components/AddCabin';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
