import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import EldersPage from "../Pages/EldersPage";
import DashboardPage from "../Pages/DashboardPage";
import HomePage from "../Pages/HomePage";
import CareTakersPage from "../Pages/CareTakersPage";
import Colors from "../Constants/colors";

const SideBarComponent = ({ updateView }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CDBSidebar textColor="#fff" backgroundColor={Colors.primary}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Elder Care
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link onClick={() => updateView(<DashboardPage  updateView={updateView} />)} to="/">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </Link>
            <Link onClick={() => updateView(<HomePage  updateView={updateView}  />)} to="/">
              <CDBSidebarMenuItem icon="home">Elderly Homes</CDBSidebarMenuItem>
            </Link>

            <Link
              onClick={() => updateView(<CareTakersPage  updateView={updateView}  />)}
              to="/"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Care Takers
              </CDBSidebarMenuItem>
            </Link>
            <Link onClick={() => updateView(<EldersPage  updateView={updateView} />)} to="/">
              <CDBSidebarMenuItem icon="user">Elders</CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBarComponent;
