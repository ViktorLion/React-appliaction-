import { v4 as uuidv4 } from 'uuid';
import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {name:  "John Smith ", salary: 5000, increase: false, raise: false, id:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'},
        {name: "Daviv Martin", salary: 800, increase: true, raise: false, id:'9b1deb4d-3b7d-5bad-9bdd-3b0d7b3dcb6d'},
        {name: "Aprel Vide" , salary: 3000, increase: false, raise: true, id:'9b1deb4d-1b7d-4bad-9bdd-1b0d7b3dcb6d'},
      ],
      term: '',
      filter: ''
    }
  }
  

  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        rise: false,
        id: uuidv4()
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
  }


  deleteItem = (id) => {
    this.setState(({data}) => {
        return {
            data: data.filter(item => item.id !== id)
        }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
        data: data.map(item => {
            if (item.id === id) {
                return {...item, [prop]: !item[prop]}
            }
            return item;
        })
    }))
}

searchEmp = ( items, term) => {
    if (term.length === 0){
        return items;
    }

    return items.filter(item => {
        return item.name.indexOf(term) > -1;
    })

}

onUpdateSearch = (term) => {
    this.setState({term: term});
}

filterPost = (items, filter) => {
    switch (filter) {
        case 'rise':
            return items.filter(item => item.rise);
        case 'moreThen1000':
            return items.filter(item => item.salary > 1000);
        default:
            return items
    }
}

onFilterSelect = (filter) => {
    this.setState({filter});
}

render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
        <div className="app">
            <AppInfo employees={employees} increased={increased}/>

            <div className="search-panel">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
            </div>
            
            <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
            <EmployeesAddForm onAdd={this.addItem}/>
        </div>
    );
}
}

export default App;
