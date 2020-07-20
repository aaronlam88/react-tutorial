import TestRender from "react-test-renderer";
import React from "react";
import { LoadingPage, LoadingComponent, LoadingIcon } from "./Loading";

it("should render without crashing", () => {
  const loadingPage = TestRender.create(<LoadingPage />).toJSON();
  expect(loadingPage).toMatchSnapshot();
  const loadingComponent = TestRender.create(<LoadingComponent />).toJSON();
  expect(loadingComponent).toMatchSnapshot();
  const loadingIcon = TestRender.create(<LoadingIcon />).toJSON();
  expect(loadingIcon).toMatchSnapshot();
});
