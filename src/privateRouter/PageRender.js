import NotFound from "../components/NotFound";
import React from "react";
import { authSelector } from "../features/auth/authSlice";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};
function PageRender() {
  const { responseData } = useSelector(authSelector);
  const { page, id } = useParams();
  let pageName = "";
  if (responseData?.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }
  return generatePage(pageName);
}

export default PageRender;
