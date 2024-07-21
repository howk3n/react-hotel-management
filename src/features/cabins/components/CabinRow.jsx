import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Utils from "@/utils/index";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../api/useDeleteCabin";
import { useCreateCabin } from "../api/useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  cabin: PropTypes.object,
};
function CabinRow({ cabin }) {
  const { isDeletingCabin, handleDeleteCabin } = useDeleteCabin();
  const { isCreatingCabin, handleCreateCabin } = useCreateCabin();
  const isWorking = isDeletingCabin || isCreatingCabin;

  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicateCabin() {
    handleCreateCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <TableRow role="row">
        <img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{Utils.number.formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{Utils.number.formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicateCabin} disabled={isWorking}>
            <HiSquare2Stack />
          </button>
          {!showForm && (
            <button
              onClick={() => setShowForm((show) => !show)}
              disabled={isWorking}
            >
              <HiPencil />
            </button>
          )}
          <button
            onClick={() => handleDeleteCabin(cabinId)}
            disabled={isWorking}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
