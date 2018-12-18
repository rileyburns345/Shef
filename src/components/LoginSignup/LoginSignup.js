import React, { Component } from 'react'
import { Container, Header, Content, Form, Button, CheckBox, Text, Item, Input, Label, Left, Right, Footer, Body } from 'native-base';

class LoginSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      email: '',
      password: '',
      username: '',
      checked: false
    }
  }

  onemailChange = (e) => {
	this.setState({
		...this.state,
		email: e
	})
}

onPasswordChange = (e) => {
this.setState({
  ...this.state,
  password: e
})
}

onUsernameChange = (e) => {
this.setState({
  ...this.state,
  username: e
})
}

checkCheckBox = () => {
  this.setState({
    ...this.state,
    checked: !this.state.checked
  })
}

  render() {
    const styles = {
      loginStyle: {
        backgroundColor: 'maroon'
      },
      fieldStyle: {
        color: 'maroon',
        letterSpacing: 1
      }
    }
    const {loginStyle, fieldStyle} = styles

    const { loginClick, signUpClick } = this.props
    let email = this.state.email
    let password = this.state.password
    let username = this.state.username
    let loginInfo = { email, password }
    let signUpInfo = { email, password, username }

    return (
      <Content>
        <Form>
          <Item floatingLabel>
            <Label style={fieldStyle}>Email</Label>
            <Input style={fieldStyle} id='email' autoCapitalize="none" onChangeText={this.onemailChange} placeholder=''/>
          </Item>
          <Item floatingLabel>
            <Label style={fieldStyle}>Password</Label>
            <Input style={fieldStyle} autoCapitalize="none" secureTextEntry={true} id='password' onChangeText={this.onPasswordChange} placeholder=''/>
          </Item>
          {this.state.checked
            ? <Item floatingLabel>
              <Label>Username</Label>
              <Input autoCapitalize="none" id='username' onChangeText={this.onUsernameChange} placeholder=''/>
            </Item>
            : null
          }
        </Form>
        <Footer>
          <Left>
            {this.state.checked
              ? <Button style={loginStyle} onPress={() => signUpClick(signUpInfo)}>
                  <Text>Sign-Up</Text>
                </Button>
              : <Button style={loginStyle} onPress={() => loginClick(loginInfo)}>
                <Text>Login</Text>
                  </Button>
            }
          </Left>
          <Body>
            <CheckBox onPress={this.checkCheckBox} checked={false}/>
          </Body>
        </Footer>
      </Content>
    )
  }
}

export default LoginSignup
