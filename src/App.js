import React,{useState} from 'react';
import ReactDataGrid from 'react-data-grid';
import './App.css';
import ReactDOM from "react-dom";
const ReactTags = require('react-tag-autocomplete')

class AutoComplete extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      tags: [],

      suggestions: [
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" }
      ]
    }
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags })
  }

  getValue() {
    return { title: this.state.tags };
  }

  getInputNode() {
    return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags }, () => this.props.onCommit())
  }

  render () {
    return (
      <ReactTags
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)} />
    )
  }
}


const columns = [
  { key: 'id', name: 'ID',width:100 },
  { key: 'title', name: 'Title' , editor : AutoComplete},
  { key: 'count', name: 'Count' } ];

const rows = [{id: 0, title: '', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];



function App() {
  let [data, setData] = useState(rows);

  let onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = [...data];
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      setData(rows)
  };

  return (<ReactDataGrid
    columns={columns}
    rowGetter={i => data[i]}
    rowsCount={3}
    onGridRowsUpdated={onGridRowsUpdated}
    enableCellSelect={true}
    minHeight={150} />);
}

export default App;
