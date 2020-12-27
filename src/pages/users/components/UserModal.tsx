import React,{useEffect} from 'react'
import {Modal, Button,Form, Input,DatePicker,Switch } from 'antd';
import moment from 'moment';

export const UserModal=(props)=>{
    const [form] = Form.useForm();
    const {visible,record,closeHandler,onFinish,confirmLoading}=props;

    useEffect(()=>{

        if(record===undefined){
            form.resetFields();
        }else{
            form.setFieldsValue({
                ...record,
            create_time:moment(record.create_time),
                status:record.status===1?true:false
            });
        }
    },[visible]);

    const onOK=()=>{
        form.submit();
    };

    const onFinishFailed=errorInfo=>{
    console.log('Failed:',errorInfo);
    }

    return (
        <div>
            <Modal  forceRender title="Basic Modal"  visible={visible} onOk={onOK} onCancel={closeHandler} confirmLoading={confirmLoading}>

                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    name="basic"
                    initialValues={{status:true}}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Create Time"
                        name="create_time"
                    >
                        {/*<Input />*/}
                        <DatePicker showTime />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        valuePropName="checked"
                    >
                        {/*<Input />*/}
                        <Switch/>

                    </Form.Item>




                </Form>


            </Modal>
        </div>
    );
};
