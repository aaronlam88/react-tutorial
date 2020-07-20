import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import React from "react";
import ErrorBoundary from "./ErrorBoundary";

it("should render children when no error", () => {
  const wrapper = shallow(<ErrorBoundary>Test</ErrorBoundary>);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it("should render throw error", () => {
  const wrapper = shallow(<ErrorBoundary>Test</ErrorBoundary>);
  const instance = wrapper.instance();
  instance.constructor.getDerivedStateFromError();
  wrapper.setState({ hasError: true });
  expect(wrapper.contains(<h1>Something went wrong.</h1>)).toBeTruthy();
});

it("should log error to console", () => {
  global.console = { error: jest.fn() };
  const wrapper = shallow(<ErrorBoundary>Test</ErrorBoundary>);
  const instance = wrapper.instance();
  instance.componentDidCatch("error", "test");
  expect(console.error).toHaveBeenCalled();
});
