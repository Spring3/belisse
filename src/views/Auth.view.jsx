import React, { Component } from 'react';
import Form from '../components/Form.jsx';
import Input from '../components/Input.jsx';

export default class AuthenticationView extends Component {
  render() {
    return (
    <Form
      orientation="vertical"
    >
      <Input
        key={0}
        type="email"
        placeholder="Email"
      />
      <Input
        key={1}
        type="email"
        placeholder="Email"
      />
    </Form>
    );    
  }
}
