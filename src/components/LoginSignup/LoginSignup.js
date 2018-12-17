import React, { Component } from 'react'
import { Container, Header, Content, Form, Button, Text, Item, Input, Label, Left, Right, Footer } from 'native-base';

class LoginSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      email: '',
      password: ''
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






  render() {
    const { loginClick } = this.props
    let email = this.state.email
    let password = this.state.password
    let loginInfo = { email, password }

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input id='email' autoCapitalize="none" onChangeText={this.onemailChange} placeholder=''/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input autoCapitalize="none" secureTextEntry={true} id='password' onChangeText={this.onPasswordChange} placeholder=''/>
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
              <Button onPress={() => loginClick(loginInfo)}>
                <Text>Login</Text>
              </Button>
            </Left>
            <Right>
            <Button>
              <Text>Sign-Up</Text>
            </Button>
            </Right>
          </Footer>
        </Content>
      </Container>
    )
  }
}

export default LoginSignup
