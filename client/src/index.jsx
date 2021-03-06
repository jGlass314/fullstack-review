import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      insertCount: 0,
      updateCount: 0
    }
  }

  componentWillMount() {
    // issue GET request and update state
    this.issueGet(getData => {
      console.log('componentWillMount getData.repos:', getData.repos);
      if(getData.repos) {
        this.setState({
          repos: getData.repos
        });
        // console.log('after componentWillMount & setState, this.state.repos[0]:', this.state.repos[0]);
      }
    });
  }

  issueGet(callback) {
    $.get('/repos', null, (data) => {
      console.log('GET response data:', data);
      callback(data);
    }, 'json')
      .fail(() => {
        console.error('Error on GET');
      });
  }

  search (term) {
    console.log(`${term} was searched`);
    // Issue POST request
    console.log('about to post with data:', JSON.stringify({'username': term}));
    $.post('/repos', {'username': term}, (postData) => {
      console.log('post successful, response with data:', JSON.stringify(postData));
      // Upon receiving a 201 response issue a GET request and update state
      this.issueGet(getData => {
        if(getData.repos) {
          this.setState({
            repos: getData.repos,
            insertCount: postData.inserts,
            updateCount: postData.updates
          });
        }
      });
    }, 'json')
    .fail(() => {
      console.error('Error on POST');
    })
    
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} inserts={this.state.insertCount} updates={this.state.updateCount} />
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));