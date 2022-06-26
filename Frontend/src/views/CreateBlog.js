import "./CreateBlog.css";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
import Editor from 'ckeditor5-custom-build/build/ckeditor';

import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
var moment = require('moment');

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



const editorConfiguration = {

  toolbar: [  "heading",
  "|",'bold', 'italic' ,   "bulletedList",
  "numberedList",     "blockQuote", "|",
  "insertTable",

  "imageUpload" ,  "|",  "undo",
  "redo",]
};




class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogTitle: "",
      shortDescription: "",
      detailedDescription: "",
      blogText: "",
      blogCategory: "",
      blogCategories: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/categories`).then((res) => {
      console.log("blogs", res);
      this.setState({ blogCategories: res.data });
    });
  }

  render() {

    const custom_config = {
      // plugins: [ Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage ],
      // image: {
      //     toolbar: [
      //         'imageStyle:block',
      //         'imageStyle:side',
      //         '|',
      //         'toggleImageCaption',
      //         'imageTextAlternative',
      //         '|',
      //         'linkImage'
      //     ]
      // },
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "insertTable",
          "|",
          "imageUpload",
          "undo",
          "redo",
        ],
      },

      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
    };

    return (
      <>

        <div className="d-flex justify-content-center">
          <Card
            border="light"
            style={{ width: "95%" }}
            className="table-wrapper table-responsive shadow-sm p-3 "
          >
            <Card.Body className="pt-0">
              <div className="blogs">
                <div className="editor">
                  <div className="mt-3" style={{backgroundColor:"#fafafa",border:"solid",borderWidth:"1px",borderColor:"lightgray", paddingTop:"10px",paddingBottom:"5px", borderTopLeftRadius:"10px",  borderTopRightRadius:"10px"}}>
                  <div style={{ display: "flex" }} className="m-3 row">
                    <input
                      type="title"
                      className="form-control  col-8"
                      id="blogTitle"
                      placeholder="Title"
                      required
                      onChange={(e) => {
                        console.log("toPost", this.state);
                        this.setState({ [e.target.id]: e.target.value });
                      }}
                    />
                    {/* <div className="col-2 text-center mt-3">Blog Category:</div>
                    <select
                      class="form-select col-2 ms-3 mt-2 mb-2"
                      aria-label="Default select example"
                      onChange={(e) => {
                        console.log("toPost", this.state);
                        this.setState({ blogCategory: e.target.value });
                      }}
                    >
                      {this.state.blogCategories.map((c) => (
                        <option value={`${c.name}`}>{c.name}</option>
                      ))}
                    </select>{" "} */}

                    <div class="form-group col-3">
                      <select
                        class="form-control"
                        name="dropdown-test"
                        aria-label="Default select example"
                        onChange={(e) => {
                          console.log("toPost", this.state);
                          this.setState({ blogCategory: e.target.value });
                        }}
                      >
                        <option
                          value=""
                          disabled
                          selected
                          // class="form-select col-2 ms-3 mt-2 mb-2"
                        >
                          Blog Category
                        </option>

                        {this.state.blogCategories.map((c) => (
                          <option value={`${c.name}`}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      className="ms-3 mb-3 col-1"
                      style={{backgroundColor:"#0E86D4" ,color:"white" }}

                      onClick={async () => {

                        if(this.state.blogTitle==""){
                        document.getElementById('blogTitle').placeholder = 'Title of Blog is required *';
                        // document.getElementById('blogTitle').style.borderColor = "red"
                        // console.log("placeholder",document.getElementById('blogTitle').style)
                        // document.getElementById('blogTitle').style


                        if(this.state.shortDescription==""){
                        document.getElementById('shortDescription').placeholder = 'Short Description of Blog is required *';}
                      return
                      
                      }
                      console.log("current stat4e", this.state);

                        try {
                          const response = await axios({
                            method: "post",
                            url: "http://localhost:3001/blogs",
                            data: {
                              title: this.state.blogTitle,
                              ShortDescription: this.state.shortDescription,
                              DetailedDescription:
                                this.state.detailedDescription,
                              BlogText: this.state.blogText,
                              BlogCategory: this.state.blogCategory,
                              createdAt: moment().format('LLL')
                            },
                            headers: { "Content-Type": "application/json" },
                          });

                          console.log("response", response);
                        } catch (error) {
                          console.log(error);
                        }

                        // try {
                        //   const response = await axios({
                        //     method: "post",
                        //     url: "http://localhost:3001/categories",
                        //     data: {
                        //       name: this.state.blogCategory,
                        //     },
                        //     headers: { "Content-Type": "application/json" },
                        //   });

                        //   console.log("response", response);
                        // } catch (error) {
                        //   console.log(error);
                        // }
                      }}
                    >
                      Publish
                    </Button>
                  </div>

                  <div className="d-flex m-3 ">
                    <textarea
                      type="shortDescription"
                      className="form-control rounded shadow-sm border-1   "
                      id="shortDescription"
                      placeholder="Short Description"
                      onChange={(e) => {
                        console.log("toPost", this.state);
                        this.setState({ [e.target.id]: e.target.value });
                      }}
                    />

                    {/* <textarea
                      type="detailedDescription"
                      className="form-control rounded shadow-sm border-1"
                      // style={{ width: "98%" }}
                      id="detailedDescription"
                      placeholder="Detailed Description"
                      onChange={(e) => {
                        console.log("toPost", this.state);
                        this.setState({ [e.target.id]: e.target.value });
                      }}
                    /> */}
                  </div>

                  </div>
            

               
                    <CKEditor
                      editor={Editor}
                      config={ editorConfiguration }

                      data=" "
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.setState({ blogText: data });
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                      // config={custom_config}
                    />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default CreateBlog;
