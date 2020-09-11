import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Checkbox, Drawer} from 'antd';

const AddDrawer = ({show, handleOnClose, handleOnFinish, handleOnFinishFailed}) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const initialValues = {firstName: '', lastName: '', phoneNumber: ''}
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, [])

  return (
    <Drawer width={412} title="Add Contact" visible={show} onClose={handleOnClose} maskClosable={false}>
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={initialValues}
        onFinish={handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
      >
        <Form.Item label="First Name" name="firstName"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your first name!',
                     },
                   ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item label="Last Name" name="lastName"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your last name!',
                     },
                   ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your phone number!',
                     },
                   ]}
        >
          <Input type='tel'/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item shouldUpdate {...tailLayout}>
          <React.Fragment>
            <Button disabled={!form.isFieldsTouched(true) || form.getFieldError().filter(({errors}) => errors.length).length}
                    type="primary" htmlType="submit" style={{marginRight: '5px'}}>
              Add
            </Button>
            <Button
              type="primary" htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </React.Fragment>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

AddDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  handleOnFinish: PropTypes.func.isRequired,
  handleOnFinishFailed: PropTypes.func.isRequired
}

export default AddDrawer;