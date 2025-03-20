import React, { useState } from "react";

const SearchMenu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);
  const showModal = () => setIsModalOpen(true);

  return (
    <React.Fragment>
      <i className="iconfont icon-sousuo" onClick={showModal}></i>
    </React.Fragment>
  );
};

export default SearchMenu;
