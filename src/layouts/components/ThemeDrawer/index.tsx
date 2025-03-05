import { Drawer, Divider, Tooltip } from "antd";
import { LayoutOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useSelector, useDispatch, RootState } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";
import "./index.less";

const ThemeDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { layout, themeDrawerVisible } = useSelector((state: RootState) => state.global);
  return (
    <Drawer
      title="主题配置"
      width={290}
      zIndex={999}
      closable={false}
      maskClosable={true}
      open={themeDrawerVisible}
      className="theme-drawer"
      onClose={() => dispatch(setGlobalState({ key: "themeDrawerVisible", value: false }))}
      >
      <Divider className="divider">
        <LayoutOutlined />
        布局样式
      </Divider>
      <div className="layout-box">
        <Tooltip placement="top" title="纵向" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb22 layout-vertical ${layout === "vertical" && "layout-active"}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "vertical" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-container">
              <div className="layout-light"></div>
              <div className="layout-content"></div>
            </div>
            {layout === "vertical" && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement="top" title="经典" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb22 layout-classic ${layout === "classic" && "layout-active"}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "classic" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-container">
              <div className="layout-light"></div>
              <div className="layout-content"></div>
            </div>
            {layout === "classic" && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement="top" title="横向" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item layout-transverse ${layout === "transverse" && "layout-active"}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "transverse" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-content"></div>
            {layout === "transverse" && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement="top" title="分栏" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item layout-columns ${layout === "columns" && "layout-active"}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "columns" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-light"></div>
            <div className="layout-content"></div>
            {layout === "columns" && <CheckCircleFilled />}
          </div>
        </Tooltip>
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;


