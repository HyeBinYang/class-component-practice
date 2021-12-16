import React, { Component } from "react";
import { runInThisContext } from "vm";

interface IProps {
  parent: string;
}

interface IState {
  number: number;
}

export class StateAndProps extends Component<IProps, IState> {
  // 클래스 컴포넌트에서 state 값 넣는 방법
  state: IState = {
    number: 0,
  };

  // 클래스 컴포넌트에서 constructor 메서드를 호출하여
  // 초기 state를 설정하고, 메서드의 this를 바인드 시킴
  constructor(props: IProps) {
    super(props);
    // this 바인딩
    this.add = this.add.bind(this);
  }

  // 프로토타입 메서드로 정의할 경우 constructor에 this를 bind 해줘야한다.
  add() {
    console.log(this);
    this.setState({
      number: this.state.number + 1,
    });
  }

  // 클래스 필드 (Arrow Function) 로 정의할 경우
  // StateAndProps 클래스에 의해 생성된 인스턴스에 바인딩된다.
  decrease = () => {
    console.log(this);
    this.setState({
      number: this.state.number - 1,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.number}</h1>
        <button onClick={this.add}>더하기</button>
        <button onClick={this.decrease}>빼기</button>
      </div>
    );
  }
}

export default StateAndProps;
