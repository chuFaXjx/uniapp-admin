import React, { useState, useEffect } from "react";
import Logo from "./imgs/logo.png";
import { Layout, Menu } from "antd";
import style from "./nav.module.less";
import { createCollapseAction } from "../../store/actions/collaspe_action";
import { connect } from "react-redux";
import {
  UsergroupDeleteOutlined,
  UserOutlined,
  CopyOutlined,
  EditOutlined,
  FileTextOutlined,
  TableOutlined,
  ProjectOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getMenuList } from "../../api/menuList";

const { Sider } = Layout;
function NavMenu(props) {
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  let items = [];
  let rootSubmenuKeys = [
    "51",
    "1334806894995996673",
    "1334807138768945153",
    "1334808090397802498",
    "784480084118470656",
    "1334808707124068353",
    "1334822791945027585",
    "54",
    "21",
  ];
  const [menu, setmenu] = useState([]);
  async function MenuList() {
    let allmenu = await getMenuList();
    console.log(allmenu);
    setmenu(allmenu.data[0].children);
    const resMenu = transformMenu(allmenu.data[0].children);
    console.log(resMenu);
    resMenu.map((item) => {
      if (item.children) {
        items.push(getItem(item.label, item.key, item.icon, item.children));
        rootSubmenuKeys.push(item.key);
      } else {
        items.push(getItem(item.label, item.key, ""));
      }
      setmenu(items);
    });
  }

  let iconsList = [
    <UsergroupDeleteOutlined />,
    <UserOutlined />,
    <CopyOutlined />,
    <EditOutlined />,
    <FileTextOutlined />,
    <TableOutlined />,
    <ProjectOutlined />,
    <SettingOutlined />,
    <CalendarOutlined />,
  ];
  function transformMenu(data) {
    const res = data.map((item, idx) => {
      const obj = {
        label: item.title,
        key: item.id,
        type: item.type,
        url: item.url,
      };
      if (item.children && item.children.length) {
        obj.children = transformMenu(item.children);
        obj.icon = iconsList[idx];
      } else if (item.icon) {
        obj.icon = icon;
      } else if (item.url !== "") {
        obj.key = item.url;
      }
      return obj;
    });
    return res;
  }

  const onClick = (e) => {
    navigate(e.key.slice(6));
  };
  const [openKeys, setOpenKeys] = useState(["51"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    MenuList();
  }, []);

  return (
    <Sider
      style={{ height: "100vh" ,background:'fff' }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      theme="dark"
    >
      <div className={style.logo}>
        {props.collapsed ? (
          <img src={Logo} className={style.LogoImg} />
        ) : (
          <span className={style.LogoFont}>教务管理系统</span>
        )}
      </div>
      <Menu
        onClick={onClick}
        mode="inline"
        items={menu}
        theme="dark"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
}
export default connect(
  (state) => ({
    collapsed: state.collapse,
  }),
  {
    createCollapseAction,
  }
)(NavMenu);
