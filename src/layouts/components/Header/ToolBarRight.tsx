import Language from "./components/Language";
import SearchMenu from "./components/SearchMenu";
import ThemeSetting from "./components/ThemeSetting";
import Fullscreen from "./components/Fullscreen";
import UserName from "./components/UserName";
import AvatarIcon from "./components/AvatarIcon";
import "./index.less";

const ToolBarRight: React.FC = () => {
  return (
    <div className="tool-bar-ri">
      <div className="header-icon">
        <Language />
        <SearchMenu />
        <ThemeSetting />
        <Fullscreen />
      </div>
      <UserName />
      <AvatarIcon />
    </div>
  );
};

export default ToolBarRight;
