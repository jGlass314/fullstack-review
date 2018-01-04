import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <h5>Inserts:{props.inserts} Updates:{props.updates}</h5>
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
                <td><a href={repo.html_contributors_url}>contributors</a></td>
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