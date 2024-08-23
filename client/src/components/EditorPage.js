import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import { Tooltip, ChakraProvider } from "@chakra-ui/react";
import './EditorPage.css'

function EditorPage() {
  const [clients, setClients] = useState([]);
  const codeRef = useRef(null);

  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: Location.state?.username,
      });

      // Listen for new clients joining the chatroom
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          // this ensure that new user connected message do not display to that user itself
          if (username !== Location.state?.username) {
            toast.success(`${username} joined the Coder Team.`);
          }
          setClients(clients);
          // also send the code to sync
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the Coder Team`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    // cleanup
    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, [Location.state, navigate, roomId]);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is Copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the Room ID");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Client panel */}
        <div
          className="col-md-3 col-sm-3 col-3 col-lg-2 bg-dark text-light d-flex flex-column h-100"
          style={{ boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <p className="text-center text-white my-2" style={{ fontSize: "1.7vw", cursor: 'default' }}>
            <i className="fa-solid fa-laptop"></i>
            <i className="fa-solid fa-code mx-2" style={{ color: "#ff0033" }}></i>
            <span style={{ fontFamily: "Aladin" }}>Coder Team</span>
          </p>
          <hr />
          {/* Client list container */}
          <div style={{ cursor: 'default' }} className="d-flex flex-column flex-grow-1 overflow-auto">
            <span style={{ fontWeight: 900 }} className="mb-3"><i style={{ fontSize: "20px" }} class="fa-solid fa-user"></i> Users</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <hr />
          {/* Buttons */}
          <div className="mt-auto px-2">
            <ChakraProvider>
              <Tooltip hasArrow label='Copy the Room ID' placement='auto'>
                <button style={{ fontWeight: 500 }} className="btn btn-success w-100 mb-2" onClick={copyRoomId}>
                  <i style={{ fontSize: "20px" }} class="fa-solid fa-copy"></i>  Copy ID
                </button>
              </Tooltip>
              <Tooltip hasArrow label='Leave the coder Room' placement='auto'>
                <button
                  className="btn btn-danger w-100 mb-2"
                  onClick={leaveRoom}
                  style={{ fontWeight: 500 }}
                >
                  <i style={{ fontSize: "20px" }} class="fa-solid fa-right-from-bracket"></i> Leave
                </button>
              </Tooltip>
            </ChakraProvider>
          </div>
        </div>

        {/* Editor panel */}
        <div className="col-md-9 col-9 col-ms-9 col-lg-7 d-flex h-100 p-2">
          {/* md-3 lg-4 */}
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
