import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { MetaProps, RouteObjectType } from "@/routers/interface";
import { Link, useMatches } from "react-router-dom";
import { RootState, useSelector } from "@/redux";
import { getAllBreadcrumbList } from "@/utils";
import { Icon } from "@/components/Icon";
import { HOME_URL } from "@/config";

const BreadcrumbNav: React.FC = () => {
  const matches = useMatches();

  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);
  const breadcrumb = useSelector((state: RootState) => state.global.breadcrumb);
  const breadcrumbIcon = useSelector((state: RootState) => state.global.breadcrumbIcon);
  const breadcrumbAllList = useMemo(() => getAllBreadcrumbList(authMenuList), [authMenuList]);

  const [curBreadcrumbList, setCurBreadcrumbList] = useState<ItemType[]>([]);

  // Render Title
  const renderTitle = (item: RouteObjectType, isLink: boolean) => {
    const { icon, title } = item.meta || {};
    const content = (
      <React.Fragment>
        {breadcrumbIcon && icon && (
          <span className="mr5">
            <Icon name={icon!} />
          </span>
        )}
        <span>{title}</span>
      </React.Fragment>
    );
    return isLink ? <Link to={item.path!}>{content}</Link> : content;
  };

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (!meta?.key) return;

    const breadcrumbList = breadcrumbAllList[meta.key] || [];

    // 首页不需要面包屑，可以删除以下判断
    if (breadcrumbList[0]?.path !== HOME_URL) {
      breadcrumbList.unshift({ path: HOME_URL, meta: { icon: "HomeOutlined", title: "首页" } });
    }

    // 处理成 antd 面包屑所需的格式
    const antdBreadcrumbList = breadcrumbList.map(item => {
      const isLast = breadcrumbList.lastIndexOf(item) === breadcrumbList.length - 1;

      // 最后一个面包屑不可点击
      if (isLast) return { title: renderTitle(item, false) };

      // 渲染面包屑子级
      if (item.children) {
        const items = item.children.filter(child => !child.meta?.isHide);
        return items.length
          ? {
              dropdownProps: { arrow: true },
              title: <a>{renderTitle(item, false)}</a>,
              menu: {
                items: items.map(child => {
                  return { title: renderTitle(child, true) };
                })
              }
            }
          : { title: renderTitle(item, true) };
      }

      // 其他面包屑
      return { title: renderTitle(item, true) };
    });

    setCurBreadcrumbList(antdBreadcrumbList);
  }, [matches, breadcrumbIcon]);

  return <React.Fragment>{breadcrumb && <Breadcrumb items={curBreadcrumbList}></Breadcrumb>}</React.Fragment>;
};

export default BreadcrumbNav;
