import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";

import { Navbar, Container } from "react-bootstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PlaylistTable } from "./Tables";

import { useLocation } from "react-router-dom";
import { ChildPlaylistTable } from "./childPlaylists";
import { PlaylistVideos } from "./playlistVideos";

var moment = require("moment");



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};



function  PlaylistDetail () {
  
    const playlist_detail = useLocation().state;

    console.log("playlist_detail",playlist_detail)

    

    return (
      <div className="d-flex justify-content-center ">
 <Card
        border="light"
        style={{ width: "95%" }}
        className="table-wrapper table-responsive shadow-sm p-3 "
      >
        <Card.Body className="pt-0">
        <div className="d-flex">
        <h4 className="mt-0 mb-0">Playlist Name: </h4> <span className="ml-2 mt-1">{playlist_detail.name}</span>
        </div>
        <br></br> 
        Parent Id: {playlist_detail.parent}

        <br></br>

        Level: {playlist_detail.level != undefined ? playlist_detail.level : "Not Defined"}



        <br />

        <ChildPlaylistTable id={playlist_detail._id} level={playlist_detail.level}></ChildPlaylistTable>

<PlaylistVideos id={playlist_detail._id}></PlaylistVideos>
    
        </Card.Body>
      </Card>
      </div>
    );
  }


export default PlaylistDetail;
