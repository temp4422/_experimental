// # Snippet
async function fetchX() {
  const urlString = 'https://api.github.com/users/'
  const user = 'webdev4422'
  const resource = urlString + user
  //prettier-ignore
  const token = 'GITHUB_TOKEN'
  const options = {
    headers: {
      Authorization: token,
    },
  }

  const response = await fetch(resource, options)
  const data = await response.json()
  console.log(data)
}
// fetchX()

const githubResponseObject = {
  login: 'webdev4422',
  id: 67459982,
  node_id: 'MDQ6VXNlcjY3NDU5OTgy',
  avatar_url: 'https://avatars.githubusercontent.com/u/67459982?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/webdev4422',
  html_url: 'https://github.com/webdev4422',
  followers_url: 'https://api.github.com/users/webdev4422/followers',
  following_url: 'https://api.github.com/users/webdev4422/following{/other_user}',
  gists_url: 'https://api.github.com/users/webdev4422/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/webdev4422/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/webdev4422/subscriptions',
  organizations_url: 'https://api.github.com/users/webdev4422/orgs',
  repos_url: 'https://api.github.com/users/webdev4422/repos',
  events_url: 'https://api.github.com/users/webdev4422/events{/privacy}',
  received_events_url: 'https://api.github.com/users/webdev4422/received_events',
  type: 'User',
  site_admin: false,
  name: 'webdev4422',
  company: null,
  blog: 'https://x-drive.ua',
  location: 'Ukraine',
  email: null,
  hireable: null,
  bio: '🚀',
  twitter_username: null,
  public_repos: 49,
  public_gists: 0,
  followers: 2,
  following: 0,
  created_at: '2020-06-26T08:43:51Z',
  updated_at: '2024-05-23T14:08:54Z',
}

// # Snippet
async function getGitHubUsers(names) {
  const users = []
  const URL = 'https://api.github.com/users/'
  //prettier-ignore
  const options = {headers: {Authorization:'GITHUB_TOKEN',},}

  for (const name of names) {
    const response = await fetch(URL + name, options)
    const data = await response.json()
    data.login ? users.push(data.login) : users.push(null)
  }
  // console.log(users)
  return users
}
// getGitHubUsers(['webdev4422', 'iliakan', 'remy', 'no.such.users'])
