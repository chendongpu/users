import React,{useState} from 'react';
import { Table, Tag, Space,Popconfirm,message,Button,Pagination  } from 'antd';
import {connect} from "umi";
import {UserModal} from "./components/UserModal";
import {addRecord, editRecord} from "@/pages/users/service";

const index=({users,dispatch,userListLoading})=>{

    const [modalVisible,setModalVisible]=useState(false);
    const [confirmLoading,setConfirmLoading]=useState(false);
    const [record,setRecord]=useState(undefined);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <>
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={()=>{
                        setModalVisible(true);
                        setRecord(record);
                    }}>Edit</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Popconfirm
                        title="确定删除么"
                        onConfirm={() => {
                            confirm(record.id);
                        }}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                    <a>Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const closeHandler=()=>{
        setModalVisible(false);
    };

    const onFinish=async (values)=>{
        setConfirmLoading(true);
        var id=0;
        if(record){
            id=record.id;
        }

        // if(id>0){
        //     dispatch({
        //         type:'users/edit',
        //         payload:{id,values}
        //     });
        //
        // }else{
        //     dispatch({
        //         type:'users/add',
        //         payload:{values}
        //     });
        // }
        // setModalVisible(false);

        if(id){
            const result= await editRecord({id,values});
            if(result){
                setModalVisible(false);
                message.success("Edit success");
                dispatch({
                    type:'users/getRemote',
                    payload:{page:users.meta.page,per_page:users.meta.per_page}
                });
            }else{
                message.error("Edit fail");
            }
        }else{
            const result= await addRecord({values});
            if(result){
                setModalVisible(false);
                message.success("Add success");
                dispatch({
                    type:'users/getRemote',
                    payload:{page:users.meta.page,per_page:users.meta.per_page}
                });
            }else{
                message.error("Add fail");
            }
        }
        setConfirmLoading(false);
    };

    const confirm=(id)=> {
      //  message.success('点击了确定'+id);

        dispatch({
            type:'users/del',
            payload:{id}
        });
    };

    const cancel=()=>{
        message.error('点击了取消');
    };

    const onChange=(page)=> {
        console.log('Page: ', page);
        var per_page = users.meta.per_page;

        dispatch({
            type:'users/getRemote',
            payload:{page,per_page}
        });
    };

    return (
        <div className="list-table">
            <Button type="primary" onClick={()=>{
                setModalVisible(true);
                setRecord(undefined);
            }}>Add</Button>
            <Table columns={columns} dataSource={users.data} rowKey='id' loading={userListLoading} pagination={false}/>
            <Pagination className="list-page" current={users.meta.page} total={users.meta.total} onChange={onChange} />
            <UserModal visible={modalVisible} closeHandler={closeHandler} record={record} onFinish={onFinish} confirmLoading={confirmLoading}></UserModal>
        </div>
    );
};

const mapStateToProps=({users,loading})=>{
    console.log("users",users);
    return {
        users,
        userListLoading:loading.models.users
    }
}
export  default  connect(mapStateToProps)(index);