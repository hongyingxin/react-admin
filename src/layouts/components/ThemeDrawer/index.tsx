import { Drawer, Divider, Tooltip, Popover, Switch, InputNumber } from "antd";
import { LayoutOutlined, CheckCircleFilled, QuestionCircleOutlined, FireOutlined } from "@ant-design/icons";
import { useSelector, useDispatch, RootState } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";
import "./index.less";
import ColorPicker from "./components/ColorPicker";

const ThemeDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { layout, themeDrawerVisible, menuSplit, siderInverted, headerInverted, isDark, isGrey, isWeak, isHappy, compactAlgorithm, borderRadius } = useSelector((state: RootState) => state.global);
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
      <div className="theme-item mt30">
        <span>
          菜单分割
          <Tooltip title="经典模式下生效">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
        <Switch
          disabled={layout !== "classic"}
          checked={menuSplit}
          onChange={value => dispatch(setGlobalState({ key: "menuSplit", value }))}
        />
      </div>
      <div className="theme-item">
        <span>
          侧边栏反转色
          <Tooltip title="侧边栏颜色变为深色模式">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
        <Switch checked={siderInverted} onChange={value => dispatch(setGlobalState({ key: "siderInverted", value }))} />
      </div>
      <div className="theme-item mb35">
        <span>
          头部反转色
          <Tooltip title="头部颜色变为深色模式">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
        <Switch checked={headerInverted} onChange={value => dispatch(setGlobalState({ key: "headerInverted", value }))} />
      </div>
      {/* 主题设置 */}
      <Divider className="divider">
        <FireOutlined />
        全局主题
      </Divider>
      <div className="theme-item">
        <span>主题颜色</span>
        <Popover placement="left" trigger="click" content={ColorPicker}>
          <label className="primary"></label>
        </Popover>
      </div>
      <div className="theme-item">
        <span>暗黑模式</span>
        <Switch
          checked={isDark}
          checkedChildren={<span className="dark-icon dark-icon-sun">🌞</span>}
          unCheckedChildren={<span className="dark-icon dark-icon-moon">🌛</span>}
          onChange={value => dispatch(setGlobalState({ key: "isDark", value }))}
        />
      </div>
      <div className="theme-item">
        <span>灰色模式</span>
        <Switch
          checked={isGrey}
          onChange={value => {
            if (isWeak) dispatch(setGlobalState({ key: "isWeak", value: false }));
            dispatch(setGlobalState({ key: "isGrey", value }));
          }}
        />
      </div>
      <div className="theme-item">
        <span>色弱模式</span>
        <Switch
          checked={isWeak}
          onChange={value => {
            if (isGrey) dispatch(setGlobalState({ key: "isGrey", value: false }));
            dispatch(setGlobalState({ key: "isWeak", value }));
          }}
        />
      </div>
      <div className="theme-item">
        <span>快乐模式</span>
        <Switch checked={isHappy} onChange={value => dispatch(setGlobalState({ key: "isHappy", value }))} />
      </div>
      <div className="theme-item">
        <span>紧凑主题</span>
        <Switch checked={compactAlgorithm} onChange={value => dispatch(setGlobalState({ key: "compactAlgorithm", value }))} />
      </div>
      <div className="theme-item mb35">
        <span>圆角大小</span>
        <InputNumber
          min={1}
          max={20}
          style={{ width: 80 }}
          defaultValue={borderRadius}
          formatter={value => `${value}px`}
          parser={value => (value ? value!.replace("px", "") : 6) as number}
          onChange={value => {
            const newValue = value || 6;
            dispatch(setGlobalState({ key: "borderRadius", value: newValue }));
          }}
        />
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;


