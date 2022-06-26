import transactions from "./data";

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

import { dashboardRoutes } from "../../routes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import axios from "axios";

export const BlogsTable = () => {
  const totalTransactions = transactions.length;

  const [blogs, setBlogs] = useState([]);

  const [filteredBlogs, setFilteredBlogs] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/blogs`).then((res) => {
      console.log("blogs", res);
      setBlogs(res.data);
    });
  }, []);

  const TableRow = (props) => {
    const { _id, title, ShortDescription, BlogCategory, createdAt } = props;

    const status = "Paid";
    const statusVariant =
      status === "Paid"
        ? "white"
        : status === "Due"
        ? "warning"
        : status === "Canceled"
        ? "danger"
        : "primary";

    return (
      <tr>
        {/* <td>
          <Card.Link as={Link} className="fw-normal">
            {_id}
          </Card.Link>
        </td> */}
        <td>
          <span className="fw-normal">{title}</span>
        </td>
        <td>
          <span className="fw-normal">{ShortDescription}</span>
        </td>
        {/* <td>
          <span className="fw-normal">{BlogCategory}</span>
        </td> */}
        <td>
          <span className="fw-normal">{createdAt.substr(0, 10)}</span>
        </td>
        <td>
          <span
            className={`fw-normal bg-success text-white p-1 pl-2 pr-2 rounded`} 
            // style={{backgroundColor:"#32CD32", color:"#006400", fontSize:"12px"}}
          >
            {/* <i class="bi bi-check mt-1"></i> */}
             active
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup} >
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0 pr-2 pl-2"
              style={{  backgroundColor:"lightgray", textDecoration:"none" }}
            >
              Action {" "}
              <span className="icon icon-sm ">
                {/* <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" /> */}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item> */}
              <Dropdown.Item>
                <Link
                  to={{
                    pathname: "/admin/editBlog",
                    state: props,
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <Button
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                    color: "red",
                  }}
                  onClick={() => {
                    //delete the blog
                    axios
                      .delete(`http://localhost:3001/blogs/${_id}`)
                      .then(() =>
                        axios.get(`http://localhost:3001/blogs`).then((res) => {
                          console.log("blogs", res);
                          setBlogs(res.data);
                        })
                      );
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card
      border="light"
      style={{ width: "95%" }}
      className="table-wrapper table-responsive shadow-sm p-3 "
    >
      <Card.Body className="pt-0">

        <div className="d-flex mt-3 mb-1">
        <h3 className="mr-5" style={{marginTop:"0px", marginBottom:"0px"}}>Blogs List</h3>

          <input
            id="tableSearch"
            onChange={(e) => {
              setFilteredBlogs(e.target.value);
              console.log("filteredBlogs", filteredBlogs);
            }}
            className="form-control "
            placeholder="  &#x1F50D; Search Blog"
            style={{
              width: "400px",
              border: "none",
              backgroundColor: "#f0f0f0",
            }}
          ></input>
          {/* <i class="bi bi-search"></i> */}

          <Link
            to="/admin/createBlog"
            style={{ marginLeft: "42%",backgroundColor:"#0E86D4" ,color:"white" }}
            className="btn mb-2"
          >
            <i class="bi bi-plus mr-1" style={{fontSize:"20px",}}></i>Create Blog
          </Link>
        </div>
        <Table hover id="myTable" className="user-table align-items-center">
          <thead>
            <tr>
              {/* <th className="border-bottom">id</th> */}
              <th className="border-bottom font-weight-bold" style={{fontSize:"15px", width:"30%"}}>Title</th>
              <th className="border-bottom font-weight-bold" style={{fontSize:"15px"}}>Category</th>
              {/* <th className="border-bottom">Short Description</th> */}
              <th className="border-bottom font-weight-bold" style={{fontSize:"15px"}}>Date Created</th>
              <th className="border-bottom font-weight-bold" style={{fontSize:"15px"}}>Status</th>
              <th className="border-bottom font-weight-bold" style={{fontSize:"15px"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(
              (b) =>
                b.title.toLowerCase().includes(filteredBlogs.toLowerCase()) && (
                  <TableRow key={`transaction-${b._id}`} {...b} />
                )
            )}
          </tbody>
        </Table>
        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer> */}
      </Card.Body>
    </Card>
  );
};
