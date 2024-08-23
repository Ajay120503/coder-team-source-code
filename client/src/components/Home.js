import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import {
  ChakraProvider,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react'

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
    <ChakraProvider>
      <div className="container-fluid ">
        <div className="row d-flex justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm p-2 bg-secondary rounded">
              <div className="card-body text-center bg-dark">
                <Icon />
                <Text style={{ fontSize: '25px' }} className="card-title text-light mb-4">Welcome in Coder Team</Text>
                <div className="form-group mb-3">
                  <Tooltip hasArrow label='Enter the Room ID' placement='top-start'>
                    <Input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="form-control"
                      placeholder="Room ID"
                      onKeyUp={handleInputEnter}
                      bg="#fff"
                    />
                  </Tooltip>
                </div>
                <div className="form-group mb-4">
                  <Tooltip hasArrow label='Enter the Valid Username' placement='top-start'>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                      placeholder="Username"
                      onKeyUp={handleInputEnter}
                      bg="#fff"
                    />
                  </Tooltip>
                </div>
                <Tooltip hasArrow label='Click to Join the Room' placement='top'>
                  <button
                    onClick={joinRoom}
                    className="btn btn-success btn-lg btn-block"
                  >
                    Join
                  </button>
                </Tooltip>
                <Text className="mt-3 text-light">
                  Don’t have a Room ID? Create{" "}
                  <Tooltip hasArrow label='Create New Room ID' placement='top'>
                    <span
                      onClick={generateRoomId}
                      className="text-success cursor-pointer"
                      style={{ cursor: "pointer" }}
                    >
                      New Room ID
                    </span>
                  </Tooltip>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>

  );
}

export default Home;
