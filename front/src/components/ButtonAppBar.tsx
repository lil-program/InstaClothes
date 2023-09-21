import * as React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import ClosetsMenu from "./ClosetsMenu";
import { ClosetRegistField } from "./ClosetRegistField";

function ButtonAppBar(props) {

  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function Modal({ children }) {
    return (
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "gray",
            opacity: "0.5",
          }}
        ></div>
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    );
  }

  const { handleLogout, closets, location, setLocation } = props;

  

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ClosetsMenu openModal={openModal} closets={closets} location={location} setLocation={setLocation}/>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              InstaClothe
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {showModal && (
        <Modal>
          <div
            style={{
              backgroundColor: "white",
              width: "300px",
              height: "200px",
              padding: "1em",
              borderRadius: "15px",
            }}
          >
            <h2>クローゼットの追加</h2>
            <ClosetRegistField />
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export { ButtonAppBar };
