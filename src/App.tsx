import React, { Component } from "react";
import LifeCycle from "./components/LifeCycle";

interface Iprops {}

interface IState {
  color: string;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class App extends Component<Iprops, IState> {
  state = {
    color: "#000000",
  };

  constructor(props: Iprops) {
    super(props);
    console.log("constructor");
  }

  //
  static getDerivedStateFromProps(nextProps: Iprops, prevState: IState) {
    console.log("getDerivedStateFromProps", nextProps, prevState);
    return null;
  }

  shouldComponentUpdate(nextProps: Iprops, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log("getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate(prevProps: Iprops, prevState: IState, snapshot: any) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycle color={this.state.color} />
      </div>
    );
  }
}
