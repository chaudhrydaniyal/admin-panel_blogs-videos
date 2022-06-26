/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Blogs from "views/Blogs";
import CreateBlog from "views/CreateBlog";
import EditBlog from "views/EditBlog";
import Category from "views/category/Category";
import Playlists from "views/playlists/playlists";
import PlaylistsDetail from "views/playlists/playlistDetails";
import PlaylistDetail from "views/playlists/playlistDetails";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },


  {
    path: "/blogs",
    name: "Blogs",
    icon: "bi bi-file-earmark-text",
    component: Blogs,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Blog Categories",
    icon: "bi-menu-button",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "bi bi-youtube",
    component: Playlists,
    layout: "/admin",
  },

  {
    path: "/createBlog",
    // name: "createBlog",
    // icon: "bi bi-youtube",
    component: CreateBlog,
    layout: "/admin",
    redirect:true
  },
  {
    path: "/playlistDetail",
    // name: "createBlog",
    // icon: "bi bi-youtube",
    component: PlaylistDetail,
    layout: "/admin",
    redirect:true
  },

  {
    path: "/editBlog",
    // name: "createBlog",
    // icon: "bi bi-youtube",
    component: EditBlog,
    layout: "/admin",
    redirect:true
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
