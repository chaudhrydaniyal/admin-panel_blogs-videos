import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@mui/material/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

import { Dropdown, ButtonGroup, Button } from "@themesberg/react-bootstrap";

import { Card } from "@themesberg/react-bootstrap";

import { useEffect, useState } from "react";

import axios from "axios";
var moment = require("moment");

export const PlaylistVideos = ({ id}) => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylist, setNewPlaylist] = useState("")
    const [url, setUrl] = useState("")


    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");

    const [filteredBlogs, setFilteredBlogs] = useState("");

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        axios.get(`http://localhost:3001/videos/${id}`).then((res) => {
            console.log("videos", res);
            setPlaylists(res.data);
        });
    }, [id]);

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        console.log("getComparator", order, orderBy);

        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            console.log("order", a);
            console.log("order2", b);

            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });

        console.log(
            "stabilizedThis",
            stabilizedThis.map((el) => el[0])
        );

        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: "S/N",
            numeric: false,
            disablePadding: false,
            label: "No.",
        },
        {
            id: "Title",
            numeric: false,
            disablePadding: false,
            label: "Name",
        },
        {
            id: "src",
            numeric: true,
            disablePadding: false,
            label: "No. of Videos",
        },
        {
            id: "createdAt",
            numeric: true,
            disablePadding: false,
            label: "Date Created",
            extended: true,
        },
        {
            id: "carbs",
            numeric: true,
            disablePadding: false,
            label: "Actions",
        },
    ];

    function EnhancedTableHead(props) {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                            width={headCell.extended === true ? "30%" : "15%"}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {"orderBy" === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const handleRequestSort = (event, property) => {
        console.log("property", property);
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    ///MODAL CODE

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    // Avoid a layout jump when reaching the last page with empty rows.

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - playlists.length) : 0;

    const TableRowCustom = (props) => {
        const { _id, name, noOfVideos, createdAt } = props;
const {title} = props;

const {url} = props

        const labelId = props.labelId;

        const index = props.index;

        const rowsPerPage = props.rowsPerPage;
        const page = props.page;

        const status = "Paid";
        const statusVariant =
            status === "Paid"
                ? "white"
                : status === "Due"
                    ? "warning"
                    : status === "Canceled"
                        ? "danger"
                        : "primary";

        const isItemSelected = false;

        return (
            <TableRow
                hover
                // onClick={(event) => handleClick(event, row.name)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={_id}
                selected={isItemSelected}
            >
                <TableCell align="left">{rowsPerPage * page + index + 1}</TableCell>

                <TableCell align="left">

                    {title}
              
                </TableCell>
                <TableCell align="right">{url}</TableCell>
                <TableCell align="right">{createdAt}</TableCell>

                <TableCell align="right">
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle
                            as={Button}
                            split
                            variant="link"
                            className="text-dark m-0 p-0 pr-2 pl-2"
                            style={{ backgroundColor: "lightgray", textDecoration: "none" }}
                        >
                            Action <span className="icon icon-sm "></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link
                                    to={{
                                        pathname: "/admin/editBlog",
                                        state: props,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                                    Edit
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
                                            .delete(`http://localhost:3001/videos/${_id}`)
                                            .then(() =>
                                                axios
                                                    .get(`http://localhost:3001/videos/${id}`)
                                                    .then((res) => {
                                                        console.log("blogs", res);
                                                        setPlaylists(res.data);
                                                    })
                                            )
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                                    Delete
                                </Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Box sx={{ width: "95%" }}>
            <Paper sx={{ width: "100%", mb: 2 }} className="p-4">
                <TableContainer>
                    <div className="d-flex ml-3 mt-3 mb-1">
                        <h3>Playlist Videos</h3>
                        <Button
                            onClick={handleOpen}
                            style={{
                                backgroundColor: "#0E86D4",
                                color: "white",
                                marginLeft: "auto",
                            }}
                            className="mt-3"
                        >
                            <i class="bi bi-plus mr-1" style={{ fontSize: "20px" }}></i> Add
                            Video
                        </Button>{" "}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="d-flex">
                                    <Typography
                                        className="mt-3"
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Upload New Video:
                                    </Typography>

                                    <IconButton
                                        onClick={handleClose}
                                        style={{ marginLeft: "auto" }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                                <hr></hr>
                                <br />
                                <div className="d-flex mb-3 justify-content-center">
                                    <input
                                        style={{ width: "500px" }}
                                        type="newCategory"
                                        className="form-control rounded shadow-sm border-1"
                                        id="newCategory"
                                        placeholder="Video Title"
                                        onChange={(e) => {
                                            setNewPlaylist(e.target.value);
                                        }}
                                    />
                                     <Button
                                        className="ml-5 "
                                        onClick={async () => {
                                            try {
                                                const response = await axios({
                                                    method: "post",
                                                    url: "http://localhost:3001/videos",
                                                    data: {
                                                        title: newPlaylist,
                                                        createdAt: moment().format("LLL"),
                                                        url:url,
                                                        playlist: `${id}`,
                                                    },
                                                    headers: { "Content-Type": "application/json" },
                                                })

                                                axios
                                                    .get(`http://localhost:3001/videos/${id}`)
                                                    .then((res) => {
                                                        console.log("blogs", res);
                                                        setPlaylists(res.data);
                                                    })
                                                handleClose()


                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}
                                    >
                                        Save Video{" "}
                                    </Button>
                                    </div>
                                    

<input
                                        style={{ width: "650px" , marginLeft:"40px" }}
                                        type="newCategory"
                                        className="form-control rounded shadow-sm border-1"
                                        id="newCategory"
                                        placeholder="Video URL"
                                        onChange={(e) => {
                                            setUrl(e.target.value);
                                        }}
                                    />
                                   
                                
                                <br></br>
                                <hr></hr>
                            </Box>
                        </Modal>
                    </div>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={false ? "small" : "medium"}
                    >
                        {" "}
                        <EnhancedTableHead
                            // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            // onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={5}
                        />
                        <TableBody>
                            {stableSort(playlists, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((b, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        b.title
                                            .toLowerCase()
                                            .includes(filteredBlogs.toLowerCase()) && (
                                            <TableRowCustom
                                                key={`transaction-${b._id}`}
                                                {...b}
                                                labelId={labelId}
                                                index={index}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                            />
                                        )
                                    );
                                })}

                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>{" "}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={playlists.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
