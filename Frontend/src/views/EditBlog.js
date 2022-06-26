import "./CreateBlog.css";

import React, { Component, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { useLocation } from "react-router-dom";

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

import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from 'ckeditor5-custom-build/build/ckeditor';

function EditBlog() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     blogTitle: "",
  //     shortDescription: "",
  //     detailedDescription: "",
  //     blogText: "",
  //     blogCategory: "",
  //   };
  // }

  const blog = useLocation().state;

  console.log("blogineditblog", blog);

  const [blogTitle, setBlogTitle] = useState(blog.title);
  const [shortDescription, setShortDescription] = useState(
    blog.ShortDescription
  );
  const [detailedDescription, setDetailedDescription] = useState(
    blog.DetailedDescription
  );
  const [blogText, setBlogText] = useState(blog.BlogText);
  const [blogCategory, setBlogCategory] = useState(blog.BlogCategory);

  console.log("params", blog);

  const editorConfiguration = {

    toolbar: [  "heading",
    "|",'bold', 'italic' ,   "bulletedList",
    "numberedList",     "blockQuote", "|",
    "insertTable",
  
    "imageUpload" ,  "|",  "undo",
    "redo",]
  };

  return (
    <div className="d-flex justify-content-center">
      <Card
        border="light"
        style={{ width: "95%" }}
        className="table-wrapper table-responsive shadow-sm p-3 "
      >
        <Card.Body className="pt-0">
          <div className="blogs">
            <div className="editor">
              <div style={{ display: "flex" }} className="m-3 row">
                <input
                  type="title"
                  className="form-control col-8"
                  id="blogTitle"
                  placeholder="Title"
                  value={blogTitle}
                  onChange={(e) => {
                    setBlogTitle(e.target.value);
                  }}
                />
                   <div className="pt-2 col-3 d-flex">
                  <h5 className="font-weight-bold " >Blog Category: </h5>
                  <div className="text-secondary d-flex" >&nbsp; &nbsp;<div >{blogCategory}</div></div>
                </div>

                <Button
                  className="ms-3 col-1"
                  style={{backgroundColor:"#0E86D4" ,color:"white" }}

                  onClick={async () => {
                    try {
                      const response = await axios({
                        method: "put",
                        url: "http://localhost:3001/blogs",
                        data: {
                          _id: blog._id,
                          title: blogTitle,
                          ShortDescription: shortDescription,
                          DetailedDescription: detailedDescription,
                          BlogText: blogText,
                        },
                        headers: { "Content-Type": "application/json" },
                      });

                      console.log("response", response);

                      if (response.data === "login successful") {
                        console.log("redirect");
                        window.open("/home", "_self");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Update
                </Button>
              </div>

              <div className=" m-3 ">
                <h5 className="font-weight-bold">Short Description:</h5>
                <textarea
                  type="shortDescription"
                  className="form-control rounded shadow-sm border-1"
                  id="shortDescription"
                  placeholder="Short Description"
                  value={shortDescription}
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                  }}
                />

                {/* <input
              type="blogCategory"
              className="form-control m-3 rounded shadow-sm border-1"
              id="blogCategory"
              placeholder="Blog Category"

              onChange={(e) => {
               setBlogCategory(e.target.value)
              }}
            /> */}

             
              </div>

              <div className="m-3 rounded shadow-sm border-1">
              <h5 className="font-weight-bold">Detailed Description:</h5>

                <CKEditor
                  editor={Editor}
                  data={blogText}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setBlogText(data);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                  config={editorConfiguration}
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditBlog;
