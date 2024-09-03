import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const UserPanel = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-5">
        <div className="px-2 sm:pl-14 py-3 border border-black">
          User Panel
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanel;
