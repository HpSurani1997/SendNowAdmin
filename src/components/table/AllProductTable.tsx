import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Parcel } from "../../redux/parcels/parcelsSlice";

type Props = {
  tableData: Parcel[];
  handleDelete: (id: number) => void;
};

const AllProductTable = ({ tableData, handleDelete }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Parcel | null>(null);

  const handleShow = (item: Parcel, editMode: boolean) => {
    setSelectedItem(item);
    setIsEdit(editMode);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <table className="table table-dashed table-hover digi-dataTable all-product-table">
        <thead>
          <tr>
            <th>Parcel</th>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>
                {item.media && item.media.length > 0 && (
                  <img
                    src={item.media[0].mediaUrl}
                    alt={`Parcel image`}
                    style={{ maxWidth: "100px", height: "100px" }}
                  />
                )}
              </td>
              <td>{item.title}</td>
              <td>AED {item.amount}</td>
              <td>{item.status}</td>
              <td>
                <div className="btn-box">
                  <button onClick={() => handleShow(item, false)}>
                    <i className="fa-light fa-eye"></i>
                  </button>
                  <button onClick={() => handleShow(item, true)}>
                    <i className="fa-light fa-pen"></i>
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <i className="fa-light fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for View/Edit */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Parcel" : "View Parcel"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.title}
                  readOnly={!isEdit}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.amount}
                  readOnly={!isEdit}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedItem.weight}
                  readOnly={!isEdit}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={selectedItem.description}
                  readOnly={!isEdit}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Label>Dimensions (L x W x H)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    defaultValue={selectedItem.length}
                    readOnly={!isEdit}
                  />
                  <Form.Control
                    type="text"
                    defaultValue={selectedItem.width}
                    readOnly={!isEdit}
                  />
                  <Form.Control
                    type="text"
                    defaultValue={selectedItem.height}
                    readOnly={!isEdit}
                  />
                </div>
              </Form.Group>
              <Form.Group style={{ marginBottom: 10 }}>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={selectedItem.status}
                  disabled={!isEdit}
                >
                  <option value="pending">Pending</option>
                  <option value="picked">Picked</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>
              {!isEdit &&
                selectedItem.media &&
                selectedItem.media.length > 0 && (
                  <Form.Group>
                    <Form.Label>Images</Form.Label>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      {selectedItem.media.map((image, index) => (
                        <img
                          key={index}
                          src={image.mediaUrl}
                          alt={`Parcel ${index}`}
                          style={{ maxWidth: "100px", height: "100px" }}
                        />
                      ))}
                    </div>
                  </Form.Group>
                )}
            </Form>
          )}
        </Modal.Body>
        {isEdit && (
          <Modal.Footer>
            <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default AllProductTable;
