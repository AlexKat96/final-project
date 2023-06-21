import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Main from './components/Main/main';
import { useAppDispatch } from 'src/hook';
import { addTodo, } from 'src/storage/todoSlice';
import reduxTest from "./redux/token"

type MyProps = {

};

type MyState = {
  timer: string;
};
class App extends React.Component<MyProps, MyState> {

  constructor(props: MyProps | Readonly<MyProps>, myState: MyState) {
    super(props);
    this.state = {
      timer: "timer",
    };
  }

  componentDidMount() {
    reduxTest()
  }

  render() {
    return (
      <div className='wrapper' >
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </div>
    );
  }

}



export default App;
