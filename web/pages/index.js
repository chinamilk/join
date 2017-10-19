import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import fetch from 'isomorphic-fetch';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: -1,
      instituteIndex: 0,
      nameErrorText: '',
      majorErrorText: '',
      idErrorText: '',
      emailErrorText: '',
      phoneNumberErrorText: '',
      QQNumberErrorText: '',
      finishedMessage: '',
    };

    this.institutesName = [
      "计算机与网络安全学院",
      "电子工程与智能化学院",
      "经济与管理学院",
      "机械工程学院",
      "文学与传媒学院",
      "教育学院（师范学院）",
      "法律与社会工作学院（知识产权学院）",
      "生态环境与建筑工程学院",
      "化学工程与能源技术学院",
      "继续教育学院",
      "马克思主义学院",
      "粤台产业科技学院",
      "中法联合学院",
    ];

    this.form = {
      name: '',
      gender: 'male',
      campus: 'Songshan Lake',
      institute: this.institutesName[this.state.instituteIndex],
      major: '',
      id: '',
      email: '',
      phoneNumber: '',
      QQNumber: '',
      isStaff: 'true',
    };
  }

  static async getInitialProps({ req }) {
    return {
      muiTheme: {
        userAgent: req ? req.headers['user-agent'] : navigator.userAgent
      }
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>莞工 GNU/Linux 协会 招新网站</title>
        </Head>

        <style jsx>{`
          .fullscreen {
            min-height: 100vh;
          }

          .center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .background {
            background: url("/static/image/background.jpg") no-repeat center center fixed;
            background-size: cover;
          }

          .register-form {
            max-width: 384px;
            margin: 16px 16px 32px 16px
          }

          .header {
            font-size: x-large;
          }

          .subheader {
            font-size: smaller;
          }

          @media (max-width: 768px) {
            .header {
              font-size: large;
            }

            .subheader {
              font-size: x-small;
            }
          }

          .code-note {
            margin: 16px auto;
          }

          .code-note a {
            color: #fff;
            text-decoration: none;
          }
        `}</style>

        <MuiThemeProvider muiTheme={getMuiTheme(this.props.muiTheme)}>
          <div className="fullscreen center background">
            <div className="register-form">
              <Card>
                {this.state.stepIndex === -1 && (
                  <div style={{ padding: '32px 16px 64px 16px' }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <img src="/static/image/logo.png" />
                      <p className="header">莞工 GNU/Linux 协会 招新网站</p>
                      <p className="subheader">Linux 系统 · 服务器 · 机器人 · 网络安全 · 自由软件</p>
                      <br />
                      <p>想加入莞工 GNU/Linux 协会吗？</p>
                      <p>那就点击下方按钮填写报名表吧！</p>
                    </div>

                    <RaisedButton label="好" primary style={{ margin: '16px 8px', float: 'right' }}
                      onClick={this.handleNextStep}
                    />
                  </div>
                )}
                {this.state.stepIndex > -1 && (
                  <Stepper orientation="vertical" activeStep={this.state.stepIndex} style={{ paddingBottom: 16 }}>
                    <Step>
                      <StepLabel>个人信息</StepLabel>
                      <StepContent>
                        {this.renderStepContent()}
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel>联系方式</StepLabel>
                      <StepContent>
                        {this.renderStepContent()}
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel>一个小问题</StepLabel>
                      <StepContent>
                        {this.renderStepContent()}
                      </StepContent>
                    </Step>
                  </Stepper>
                )}
                {this.state.finished && (
                  <div style={{ margin: 16, paddingBottom: 32, textAlign: 'center' }}>
                    {this.state.finishedMessage}
                  </div>
                )}
              </Card>
            </div>
            <div className="code-note">
              <a href="https://github.com/dglinux/join">Code with ❤️ by DGLinux</a>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  renderStepContent() {
    const { stepIndex } = this.state;

    switch (stepIndex) {
      case 0:
        return (
          <div style={{ marginLeft: 12, marginRight: 4 }}>
            <TextField name="name" type="text" floatingLabelText="姓名*" value={this.form.name} fullWidth
              errorText={this.state.nameErrorText}
              onChange={(event) => {
                if (event.target.value.length !== 0) {
                  this.setState({
                    nameErrorText: ''
                  });
                } else {
                  this.setState({
                    nameErrorText: '必填'
                  });
                }
                this.form.name = event.target.value;
              }}
            />
            <br />
            <div style={{ marginTop: 16, marginBottom: 4 }}>性别*</div>
            <RadioButtonGroup name="gender" defaultSelected={this.form.gender} style={{ display: 'flex' }}
              onChange={(event) => {
                this.form.gender = event.target.value;
              }}
            >
              <RadioButton value="male" label="男" style={{ width: 60 + 16, marginRight: 16 }} />
              <RadioButton value="female" label="女" style={{ width: 60 + 16, marginLeft: 16 }} />
            </RadioButtonGroup>
            <br />
            <div style={{ marginTop: 16, marginBottom: 4 }}>所在校区*</div>
            <RadioButtonGroup name="campus" defaultSelected={this.form.campus} style={{ display: 'flex' }}
              onChange={(event) => {
                this.form.campus = event.target.value;
              }}
            >
              <RadioButton value="Songshan Lake" label="松山湖" style={{ width: 60 + 16 * 3, marginRight: 16 }} />
              <RadioButton value="Guancheng" label="莞城" style={{ width: 60 + 16 * 2, marginLeft: 16 }} />
            </RadioButtonGroup>
            <br />
            <SelectField name="institute" floatingLabelText="学院*" autoWidth fullWidth
              value={this.state.instituteIndex}
              onChange={(event, index, value) => {
                this.setState({ instituteIndex: value });
                this.form.institute = this.institutesName[value];
              }}
            >
              {this.institutesName.map((value, index) => <MenuItem value={index} primaryText={value} />)}
            </SelectField>
            <br />
            <TextField name="major" type="text" floatingLabelText="专业*" value={this.form.major} fullWidth
              errorText={this.state.majorErrorText}
              onChange={(event) => {
                if (event.target.value.length !== 0) {
                  this.setState({
                    majorErrorText: ''
                  });
                } else {
                  this.setState({
                    majorErrorText: '必填'
                  });
                }
                this.form.major = event.target.value;
              }}
            />
            <br />
            <TextField name="id" type="number" floatingLabelText="学号*" value={this.form.id} fullWidth
              errorText={this.state.idErrorText}
              onChange={(event) => {
                if (event.target.value.length !== 0) {
                  this.setState({
                    idErrorText: ''
                  });
                } else {
                  this.setState({
                    idErrorText: '必填'
                  });
                }
                this.form.id = event.target.value;
              }}
            />

            <RaisedButton label={this.state.stepIndex === 2 ? '完成' : '下一步'} primary={true} style={{ margin: '16px 0', float: 'right' }}
              onClick={this.handleNextStep}
            />
          </div>
        );
      case 1:
        return (
          <div style={{ marginLeft: 12, marginRight: 4 }}>
            <TextField name="email" type="email" floatingLabelText="电子邮箱*" value={this.form.email} fullWidth
              errorText={this.state.emailErrorText}
              onChange={(event) => {
                if (event.target.value.length !== 0) {
                  this.setState({
                    emailErrorText: ''
                  });
                } else {
                  this.setState({
                    emailErrorText: '必填'
                  });
                }
                this.form.email = event.target.value;
              }}
            />
            <br />
            <TextField name="phoneNumber" type="number" floatingLabelText="手机号*" value={this.form.phoneNumber} fullWidth
              errorText={this.state.phoneNumberErrorText}
              onChange={(event) => {
                if (event.target.value.length !== 0) {
                  this.setState({
                    phoneNumberErrorText: ''
                  });
                } else {
                  this.setState({
                    phoneNumberErrorText: '必填'
                  });
                }
                this.form.phoneNumber = event.target.value;
              }}
            />
            <br />
            <TextField name="QQNumber" type="number" floatingLabelText="QQ 号*" value={this.form.QQNumber} fullWidth
              errorText={this.state.QQNumberErrorText}
              onChange={(event) => {
                if (event.target.value.length !== 0) {
                  this.setState({
                    QQNumberErrorText: ''
                  });
                } else {
                  this.setState({
                    QQNumberErrorText: '必填'
                  });
                }
                this.form.QQNumber = event.target.value;
              }}
            />

            <RaisedButton label={this.state.stepIndex === 2 ? '完成' : '下一步'} primary={true} style={{ margin: '16px 0 16px 4px', float: 'right' }}
              onClick={this.handleNextStep}
            />
            <RaisedButton label="上一步" style={{ margin: '16px 4px 16px 0', float: 'right' }}
              onClick={this.handlePrevStep}
            />
          </div>
        );
      case 2:
        return (
          <div style={{ marginLeft: 12, marginRight: 4 }}>
            <div style={{ marginTop: 8, marginBottom: 4 }}>你想成为干事吗？*</div>
            <RadioButtonGroup name="isStaff" defaultSelected={this.form.isStaff} style={{ display: 'flex' }}
              onChange={(event) => {
                this.form.isStaff = event.target.value;
              }}
            >
              <RadioButton value="true" label="是" style={{ width: 60 + 16, marginRight: 16 }} />
              <RadioButton value="false" label="否" style={{ width: 60 + 16, marginLeft: 16 }} />
            </RadioButtonGroup>

            <RaisedButton label={this.state.stepIndex === 2 ? '完成' : '下一步'} primary={true} style={{ margin: '16px 0 16px 4px', float: 'right' }}
              onClick={this.handleNextStep}
            />
            <RaisedButton label="上一步" style={{ margin: '16px 4px 16px 0', float: 'right' }}
              onClick={this.handlePrevStep}
            />
          </div>
        );
      default:
        break;
    }
  }

  handleNextStep = () => {
    const { stepIndex } = this.state;

    let is_error = this.checkForm();
    if (!is_error) {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
      if (stepIndex >= 2) {
        this.setState({
          finishedMessage: '正在提交报名表，请稍候……',
        });
        fetch("http://api.join.dglinux.com/join/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.form),
        }).then((res) => {
          if (res.ok) {
            this.setState({
              finishedMessage: '恭喜！您已成功报名加入莞工 GNU/Linux 协会！',
            });
          }
        }).catch(() => {
          this.setState({
            finishedMessage: '500 服务器内部错误',
          });
        });
      }
    }
  };

  handlePrevStep = () => {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      });
    }
  };

  handleInstituteChange = (event, index, value) => {
    this.setState({
      instituteIndex: value
    })
  };

  checkForm = () => {
    const { stepIndex } = this.state;
    let error = false;

    switch (stepIndex) {
      case 0:
        if (this.form.name === "") {
          this.setState({
            nameErrorText: '必填'
          });
          error = true;
        }
        if (this.form.major === "") {
          this.setState({
            majorErrorText: '必填'
          });
          error = true;
        }
        if (this.form.id === "") {
          this.setState({
            idErrorText: '必填'
          });
          error = true;
        }
        break;
      case 1:
        if (this.form.email === "") {
          this.setState({
            emailErrorText: '必填'
          });
          error = true;
        }
        if (this.form.phoneNumber === "") {
          this.setState({
            phoneNumberErrorText: '必填'
          });
          error = true;
        }
        if (this.form.QQNumber === "") {
          this.setState({
            QQNumberErrorText: '必填'
          });
          error = true;
        }
        break;
      case 2:
        break;
      default:
        break;
    }

    return error;
  }
}
