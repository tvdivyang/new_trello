import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FiEdit2 } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getalllanesdata } from "../Redux/Actions/LoginAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function Trello() {
  const [columns, setColumns] = useState([]);
  const [inpval, setinpval] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [lanesinpval, setLanesinpval] = useState({
    id: "",
    title: "",
    cards: [],
  });
  const [show, setShow] = useState(false);
  const [lanesModal, setLanesModal] = useState(false);
  const [item, setitem] = useState("");
  const [datas, setdatas] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const fetchalllanesdata = useSelector(
    (state) => state.register.fetchalllanes
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(getalllanesdata());
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(fetchalllanesdata));
    } else {
      setColumns(JSON.parse(localStorage.getItem("data")));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(columns));
  }, [columns]);
  const fetchData = () => {
    setColumns(fetchalllanesdata);
  };
  useEffect(() => {
    fetchData();
  }, [fetchalllanesdata]);
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Find the source and destination lanes
    const sourceLane = columns.lanes.find(
      (lane) => lane.id === source.droppableId
    );
    const destinationLane = columns.lanes.find(
      (lane) => lane.id === destination.droppableId
    );
    // Check if source and destination lanes are defined
    if (!sourceLane || !destinationLane) return;
    if (source.droppableId !== destination.droppableId) {
      const sourceItems = sourceLane.cards ? [...sourceLane.cards] : [];
      const destItems = destinationLane.cards ? [...destinationLane.cards] : [];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      // Update the state with the new columns
      setColumns((prevColumns) => {
        return {
          lanes: prevColumns.lanes?.map((lane) => {
            if (lane.id === source.droppableId) {
              const temp = { ...lane, cards: sourceItems };
              return temp;
            }
            if (lane.id === destination.droppableId) {
              const tempdata = { ...lane, cards: destItems };
              return tempdata;
            }
            return lane;
          }),
        };
      });
    } else {
      const copiedItems = sourceLane.cards ? [...sourceLane.cards] : [];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns((prevColumns) => ({
        lanes: prevColumns.lanes?.map((lane) => {
          if (lane.id === source.droppableId) {
            const temp = { ...lane, cards: copiedItems };
            return temp;
          }
          return lane;
        }),
      }));
    }
  };

  const handleOnchage = (name, value) => {
    setinpval({ ...inpval, [name]: value });
  };

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleopemmodal = (lane, card, isedit) => {
    if (isedit === false) {
      var id = randomNumberInRange(20, 20000);
      id = String(id);
      setinpval({ ...inpval, id });
      setitem(card);
    }
    if (isedit === true) {
      setitem(card);
      setdatas(lane);
      setinpval({
        id: card.id,
        title: card.title,
        description: card.description,
      });
    }
    setShow(!show);
  };

  const handleclosemodal = () => {
    setShow(!show);
    setinpval({
      id: "",
      title: "",
      description: "",
    });
  };

  const handleCareteCard = () => {
    setColumns((prevColumns) => ({
      lanes: prevColumns.lanes.map((data) => {
        if (data.title === item.title) {
          const updatedCards = [...data.cards, inpval];
          setitem("");
          return { ...data, cards: updatedCards };
        }
        return data;
      }),
    }));
    handleclosemodal();
  };

  const handleSave = () => {
    setColumns((prevColumns) => ({
      lanes: prevColumns.lanes.map((data) => {
        const updatedCards = data.cards.map((card) => {
          if (card.id === item.id) {
            return {
              ...card,
              title: inpval.title,
              description: inpval.description,
            };
          }
          return card;
        });

        if (data.id === datas.id) {
          return { ...data, cards: updatedCards };
        }
        return data;
      }),
    }));

    handleclosemodal();
  };

  const handleRemoveCard = (lane, card) => {
    setColumns((prevColumns) => ({
      lanes: prevColumns.lanes.map((data) => {
        if (data.id === lane.id) {
          const updatedCards = data.cards.filter((c) => c.id !== card.id);
          return { ...data, cards: updatedCards };
        }
        return data;
      }),
    }));
  };

  const handleLanesOnchage = (name, value) => {
    setLanesinpval({ ...lanesinpval, [name]: value });
  };

  const handleLanesOpenModal = (lane) => {
    if (lane) {
      setdatas(lane);
      setLanesinpval({
        id: lane.id,
        title: lane.title,
        cards: lane.cards,
      });
    } else {
      var id = randomNumberInRange(20000, 80000);
      id = String(id);
      setLanesinpval({ ...lanesinpval, id });
    }
    setLanesModal(!lanesModal);
  };

  const handleLanesTitleChage = () => {
    setColumns((prevColumns) => ({
      lanes: prevColumns.lanes.map((lane) => {
        if (lane.id === datas.id) {
          return {
            ...lane,
            title: lanesinpval.title,
          };
        }
        return lane;
      }),
    }));
    setLanesModal(!lanesModal);
    setLanesinpval({
      id: "",
      title: "",
      cards: [],
    });
  };

  const handleLanesTitleRemove = (item) => {
    setColumns((prevColumns) => ({
      lanes: prevColumns.lanes.filter((lane) => lane.id !== item.id),
    }));
  };

  const handleAddColumn = () => {
    setColumns((prevColumns) => ({
      lanes: [
        ...prevColumns.lanes,
        {
          id: lanesinpval.id,
          title: lanesinpval.title,
          cards: [], // You can initialize cards array as empty for the new lane
        },
      ],
    }));
    setLanesModal(!lanesModal);
  };
  const handleLogout = () => {
    localStorage.clear("token");
    history("/login");
  };
  return (
    <div>
      <Modal show={show} animation={false}>
        <Modal.Body className="">
          <p>Enter Your Title</p>
          <input
            name="title"
            value={inpval.title}
            onChange={(e) => handleOnchage(e.target.name, e.target.value)}
          ></input>
          <p>Enter Your Description</p>
          <input
            name="description"
            value={inpval.description}
            onChange={(e) => handleOnchage(e.target.name, e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleclosemodal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={item.description ? handleSave : handleCareteCard}
          >
            {item.description ? "Save Changes" : "Add to card"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={lanesModal} animation={false}>
        <Modal.Body className="">
          <p>Enter Your Title</p>
          <input
            name="title"
            value={lanesinpval.title}
            onChange={(e) => handleLanesOnchage(e.target.name, e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setLanesModal(!lanesModal);
              setLanesinpval({
                id: "",
                title: "",
                cards: [],
              });
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={isEdit ? handleLanesTitleChage : handleAddColumn}
          >
            {isEdit ? "Changes Title" : "Add Column"}
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <h1 style={{ textAlign: "center" }}>TRELLO</h1>
        <h5
          style={{ textAlign: "right", marginRight: "25px" }}
          onClick={handleLogout}
        >
          Logout
        </h5>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleLanesOpenModal();
              setIsEdit(false);
            }}
          >
            Add Column
          </button>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {columns?.lanes?.map((item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <span>
                    <h2>{item.title}</h2>
                    <p className="d-flex justify-content-center">
                      <FiEdit2
                        className="me-3"
                        onClick={() => {
                          handleLanesOpenModal(item);
                          setIsEdit(true);
                        }}
                      />
                      <BiTrash onClick={() => handleLanesTitleRemove(item)} />
                    </p>
                  </span>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={item.id} key={item.id}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 500,
                            }}
                          >
                            {item.cards.map((data, index) => {
                              return (
                                <Draggable
                                  key={data.id}
                                  draggableId={data.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {/* {item.description} */}
                                        <p>Title : {data.title}</p>
                                        <p>Description : {data.description}</p>
                                        <p className="d-flex justify-content-center">
                                          <FiEdit2
                                            className="me-3"
                                            onClick={() =>
                                              handleopemmodal(item, data, true)
                                            }
                                          />
                                          <BiTrash
                                            onClick={() =>
                                              handleRemoveCard(item, data)
                                            }
                                          />
                                        </p>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            <p
                              onClick={() =>
                                handleopemmodal(fetchalllanesdata, item, false)
                              }
                              className="bg-danger"
                            >
                              ADD TO CARD
                            </p>
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Trello;
