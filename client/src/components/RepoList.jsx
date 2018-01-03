import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tbody>
        {
          props.repos.map(repo => {
            return (
              <tr>
                <td><img style={{width: 25, height: 25}} src={repo.owner.avatar_url} /></td>
                <td>{repo.owner.login}</td>
                <td><a href={repo.html_url}>{repo.name}</a></td>
                <td>{repo.description}</td>
                {/* <td>{repo.stargazers_count}</td> */}
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>
)

export default RepoList;