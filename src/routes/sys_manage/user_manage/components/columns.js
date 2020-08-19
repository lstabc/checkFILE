import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';

export default (self, depDic,roleDic) => [
  {
    title: '用户名',
    name: 'username',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {},
    sorter: true,
  },
  {
    title: '昵称',
    name: 'nickname',
    //dict: [{ code: '0', codeName: '城市' }, { code: '1', codeName: '乡村' }],
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '电话',
    name: 'phone',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '所属部门',
    name: 'departmentName',
    tableItem: {},
  },
  {
    title: '部门ID',
    name: 'departmentId',
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select'
    },
    dict: depDic,
  },
  {
    title: '角色',
    name: 'roleName',
    tableItem: {},
  },
  {
    title: '角色ID',
    name: 'roleId',
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select'
    },
    dict: roleDic,
  },
  {
    title: '状态',
    name: 'state',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '备注',
    name: 'remark',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '创建时间',
    name: 'createTime',
    tableItem: {},
    sorter: true,
  },
  {
    title: '更新时间',
    name: 'updateTime',
    tableItem: {},
  },
    {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
          <Button tooltip="重置密码" onClick={e => self.onRePassword(record)}>
            重置密码
          </Button>
          {/* <Button tooltip="跳转到新路由">
            <Link to={"/sysUser/detail?id=" + record.id}>
              <Icon type="link" antd />
            </Link>
          </Button> */}
        </DataTable.Oper>
      )
    }
  }
];
