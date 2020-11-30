import React, {Component} from 'react';
import './App.css';
import Item from "./Item";
import axios from 'axios';
import ItemInsertDialog from './ItemInsertDialog';

class App extends Component {

  state = {

  }

  componentDidMount() {
    this._getItems();
    //this._dbTest();
  }

  _dbTest = async() => {
    const res = await axios.get('api/test');
    return res.data;
  }

  _renderItems = () => {
    const matzips =  this.state.matzips.map((matzip) => {
      return <Item
          name={matzip.name}
          photo={matzip.photo}
          location={matzip.location}
          key={matzip.id}
          description={matzip.description}
      />
    })
    return matzips
  }

  _getItems = async () => {
    const matzips = await this._dbTest()
    this.setState({
      matzips
    })
  }

  render() {
    return (
        <div className= {Item ? "App" : "App--loading"}>
          {this.state.matzips ? this._renderItems() :  'Loading'}
          {this.state.matzips ? <ItemInsertDialog />: ''}
        </div>
    );
  }
}

export default App;
