import React, { PureComponent } from 'react';
import { remote } from 'electron';
import Form from '../components/common/Form.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

import GithubIcon from 'mdi-react/GithubCircleIcon';

export default class AuthenticationView extends PureComponent {

  onClick = () => {
    const server = remote.process.env.SERVER_ORIGIN;
    const githubAuthUrl = `${server}/auth/gh`;
    const ghAuthWindow = window.open(githubAuthUrl, 'Github Authorization');
    window.addEventListener('message', (event) => { console.log(event.origin); console.log(event.data) })
  }

  render() {
    return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-grey-darkest">Belisse</h2>
      <p className="text-grey-darkest">A belle issue tracker for Github</p>
      <Button
        className="btn-gh"
        type="button"
        onClick={this.onClick}
        value={
          <div className="flex flex-row items-center">
            <GithubIcon color="white"/>
            <span className="">Log in with Github</span>
          </div>}
      />
    </div>
    );    
  }
}
