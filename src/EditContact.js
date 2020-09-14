import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Checkbox, Drawer} from 'antd';

const EditContact = ({show, handleOnClose, handleOnFinish, handleOnFinishFailed, initialValues, mode, handleEditOnFinish}) => {
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
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
  })

  return (
    <Drawer width={412} title={mode === 'add' ? "Add Contact" : "Edit Contact"} visible={show} onClose={handleOnClose} maskClosable={false}>
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={initialValues}
        onFinish={mode === 'edit' ? handleEditOnFinish : handleOnFinish}
        onFinishFailed={handleOnFinishFailed}>
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
          {() => {
            return (
              <React.Fragment>
                <Button
                  disabled={form.isFieldsTouched(true) || form.getFieldError().filter(({errors}) => errors.length).length}
                  type="primary" htmlType="submit" style={{marginRight: '5px'}}>
                  {mode === 'edit' ? 'Edit' : 'Add'}
                </Button>
                <Button type="primary" htmlType="button" onClick={() => form.resetFields()}>Reset</Button>
              </React.Fragment>
            )
          }}
        </Form.Item>
      </Form>
    </Drawer>
  );
}

EditContact.propTypes = {
  show: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  handleOnFinish: PropTypes.func.isRequired,
  handleOnFinishFailed: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']),
  handleEditOnFinish: PropTypes.func.isRequired
}

export default EditContact;