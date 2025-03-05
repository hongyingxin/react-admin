import React, { useState } from "react";
import { Modal } from "antd";

const SearchMenu: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  
  return (
    <React.Fragment>
      <i className="iconfont icon-sousuo" onClick={showModal}></i>
    </React.Fragment>
  );
};

export default SearchMenu;
