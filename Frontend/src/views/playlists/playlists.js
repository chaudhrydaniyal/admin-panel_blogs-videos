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

  ///MODAL CODE

  // const [open, setOpen] = React.useState(false);


// import ClassicEditor from "./classicEditor";

// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
// import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
// import Aside from "./blogsSidebar";
// import { Button } from "react-bootstrap";
// import CustomDropselect from "../../dropselect/customDropselect";

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      newPlaylist: "",
      menuItems: [
        // {
        //   name: "services",
        //   submenu: [
        //     {
        //       name: "webdevelopment",
        //       submenu: [
        //         {
        //           name: "backend",
        //           submenu: [{ name: "nodejs" }, { name: "php" }],
        //         },
        //         { name: "frontend" },
        //       ],
        //     },
        //     { name: "seo" },
        //     { name: "webdesign" },
        //   ],
        // },
      ],
      parentPlaylist: "",
      open:false,
    };
  }



  componentDidMount() {
    axios.get(`http://localhost:3001/categories`).then((res) => {
      console.log("blogs", res);
      this.setState({ blogCategories: res.data });
    });
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/playlists`).then((res) => {
      console.log("playlists", res);
      this.setState({ menuItems: res.data });
    });
  }

  render() {

    const handleOpen = () => this.setState({open:true});
    const handleClose = () => this.setState({open:false});
    return (
      <div className="d-flex justify-content-center ">


      <PlaylistTable />
      </div>
    );
  }
}

export default Playlists;
