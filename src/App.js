import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './components/MenuComponent'
import './App.css';
import { DISHES } from './shared/dishes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES
    };
  }
  render () {
     return (
    <div>
       <Navbar dark color="primary">
       <div className="container">
       <NavbarBrand href="/">Ristorante confusion</NavbarBrand>
       </div>
       </Navbar>
       <Menu dishes={this.state.dishes} />
    </div>
  );
  }
 
}

export default App;
