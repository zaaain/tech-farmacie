import React, { Component } from 'react';
import { Button } from "components/common/base/button";
import history from "utils/history";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-gradient flex items-center justify-center">
    <div className="w-[400px] h-[400px] xs:w-[240px]  xs:h-[240px] bg-white rounded-[100%] flex flex-col items-center justify-center">
      <h1 className="text-primary font-Roboto text-[24px] xs:text-[14px]">
       Sorry we dont know this path !
      </h1>
      <div className='mt-5'>
      <Button
        width={150}
        height={50}
        value="Home"
        variant="primary"
        onClick={()=> {
          history.push("/")
          window.location.reload()
        }}
      />
      </div>
    </div>
  </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
