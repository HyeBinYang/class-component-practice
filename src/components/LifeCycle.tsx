import React, { Component } from "react";

interface Iprops {
  color: string;
}

interface IState {
  number: number;
  color: string | null;
}

// 컴포넌트 라이프사이클은 크게 Mount - Update - Unmount 단계로 나뉜다.
// 클래스형 컴포넌트는 라이프사이클을 좀 더 구체적인 단계로 나뉘었다.

// Mount 단계
// 1. contructor (초기 state 값 설정)
// 2. getDerivedStateFromProps (props 값을 state에 동기화)
// 3. render (생성된 UI를 화면에 띄움 === 렌더링)
// 4. componentDidMounted (렌더링 후 실행)

// Update 단계
// 1. getDerivedStateFromProps (변경된 props 값을 state에 동기화)
// 2. shouldComponentUpdate (변경된 데이터로 리렌더링 할 지 결정하는 단계)
// 3. render (변경된 UI를 화면에 띄움 === 리렌더링)
// 4. getSnapshotBeforeUpdate (변경되기 전 state 또는 props 값으로 작업하는 단계)
// 5. componentDidUpdate (변경이 끝난 직후 실행되는 메서드)

// Unmount 단계
// 1. componentWillUnmount (Unmount 직전에 실행되는 메서드)
export default class LifeCycle extends Component<Iprops, IState> {
  state = {
    number: 0,
    color: null,
  };

  myRef = null;

  // 컴포넌트를 생성될 때 (Mount 단계) 처음으로 실행된다.
  // constructor 메서드를 이용해 초기 state 값을 설정 할 수 있다.
  constructor(props: Iprops) {
    super(props);
    console.log("constructor");
  }

  // 부모 컴포넌트에서 받아온 props 값을 자신 컴포넌트의 state에 동기화 시키는 단계이다.
  // Mount 단계에서는 constructor 메서드가 실행되고 난 다음에 실행된다.
  // Update 단계에서는 가장 먼저 실행되는 단계이다.
  static getDerivedStateFromProps(nextProps: Iprops, prevState: IState) {
    console.log("getDerivedStateFromProps", nextProps, prevState);
    if (nextProps !== prevState) {
      return { color: nextProps.color };
    }

    return null;
  }

  // 해당 state 또는 props가 변경되었을 때, 리렌더링을 할지 결정하는 단계이다.
  // true 로 반환하면 리렌더링을 하고, false 이면 리렌더링을 하지 않는다.
  shouldComponentUpdate(nextProps: Iprops, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState, this.state);
    return true;
  }

  // Update되기 이전 state 또는 props 를 참고하는 단계이다.
  // 여기서 반환된 값을 componentDidUpdate 단계에서 snapshot 파라미터로 받는다.
  getSnapshotBeforeUpdate(prevProps: Iprops, prevState: IState) {
    console.log("getSnapshotBeforeUpdate", prevProps, prevState, this.state);
    if (this.myRef && prevProps.color !== this.state.color) {
      return this.myRef["style"]["color"];
    }

    return null;
  }

  // update가 완료된 직후에 실행되는 메서드
  componentDidUpdate(prevProps: Iprops, prevState: IState, snapshot: any) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot, this.state);
    if (snapshot) {
      console.log("업데이트 직전 색상 : ", snapshot);
    }
  }

  // Mount 완료 후 호출되는 메서드
  componentDidMount() {
    console.log("componentDidMount");
  }

  // 컴포넌트를 DOM에서 제거하기 전에 호출되는 메서드
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // react element를 반환하는 메서드이다.
  // 여기서 state를 변경해선 안되고 DOM에 접근해서도 안된다.
  // 하고 싶으면 'componentDidMount' 에서 처리해야한다.
  render() {
    console.log("render", this.state);

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={this.myRef}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}
