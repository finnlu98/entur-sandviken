import { useDashboard } from "../../../context/dashboard-context";
import { IoMdAdd, IoMdArrowDropright } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import "./sidebar.css";
import { useEffect, useState } from "react";
import Profile from "../../auth/Profile";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaCaretRight } from "react-icons/fa";
import EditEntity from "../editMode/edit-entity";
import { EditingKey } from "../model/EditMode";
import { Widgets } from "../../../widgets/core/model/widgets";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLayout } from "react-icons/ai";

const Sidebar: React.FC = () => {
  const { editMode, addWidget, setEditingKey } = useDashboard();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (editMode.editMode === false) {
      setCollapsed(false);
    }
  }, [editMode.editMode]);

  return (
    <>
      <div className={`sidebar ${editMode.editMode ? "edit-mode" : ""} ${collapsed ? "collapsed" : ""}`}>
        {editMode.editMode && !collapsed && (
          <>
            <div className="widget-menu-row surface animate-appear-left">
              <Profile />
            </div>
            <div className="sidebar-title animate-appear-left">
              <div>
                <IoMdArrowDropright /> General
              </div>
            </div>
            <div className="widget-menu-row surface animate-appear-left">
              <div className="h-row">
                <div className="item friendly-display-item">
                  <IoSettingsOutline />
                </div>
                <div className="item friendly-display-item">Home settings</div>
              </div>
              <div className="item widget-action-buttons">
                <button className="small" onClick={() => setEditingKey(EditingKey.profile)}>
                  <FaCaretRight />
                </button>
              </div>
            </div>
            <div className="widget-menu-row surface animate-appear-left">
              <div className="h-row">
                <div className="item friendly-display-item">
                  <AiOutlineLayout />
                </div>
                <div className="item friendly-display-item">Layout templates</div>
              </div>
              <div className="item widget-action-buttons">
                <button className="small" onClick={() => setEditingKey(EditingKey.layoutTemplate)}>
                  <FaCaretRight />
                </button>
              </div>
            </div>
            <div className="sidebar-title animate-appear-left">
              <div>
                <IoMdArrowDropright /> Widget menu
              </div>
            </div>
          </>
        )}
        {Widgets &&
          editMode.editMode &&
          !collapsed &&
          Object.entries(Widgets)
            .filter(([key, entries]) => !entries.boolenHiddenSupported)
            .map(([key, entries]) => (
              <div key={key} className="widget-menu-row surface animate-appear-left">
                <div className="item friendly-display">
                  <div className="friendly-display-item">{entries.widgetIcon} </div>
                  <div className="friendly-display-item">{entries.friendlyName} </div>
                </div>
                <div className="item widget-action-buttons">
                  <button className="small" onClick={() => setEditingKey(key as unknown as EditingKey)}>
                    <CiEdit />
                  </button>
                  <button className="small" onClick={() => addWidget(entries.id)}>
                    <IoMdAdd />
                  </button>
                </div>
              </div>
            ))}
        <div className="sidebar-footer widget-menu-row surface " onClick={() => setCollapsed(!collapsed)}>
          <button className="button-text-only font-large animate-appear-left">
            {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>
        </div>
      </div>
      <EditEntity onClose={() => setEditingKey(null)} editKey={editMode.editingWidgetKey} />
    </>
  );
};

export default Sidebar;
