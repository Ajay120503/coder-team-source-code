import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    // Redirect to the editor page
    navigate(`/editor/${roomId}`, {
      state: { username },
    });
    toast.success("Joining room...");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <Icon />
              <h4 className="card-title text-light mb-4">Welcome to Coder Team</h4>
              <div className="form-group mb-3">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="form-control"
                  placeholder="Room ID"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <button
                onClick={joinRoom}
                className="btn btn-success btn-lg btn-block"
              >
                Join
              </button>
              <p className="mt-3 text-light">
                Don’t have a Room ID? Create{" "}
                <span
                  onClick={generateRoomId}
                  className="text-success cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  New Room ID
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
