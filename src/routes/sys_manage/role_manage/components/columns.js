import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';

export default (self, depDic,roleDic) => [
  {
    title: '角色名',
    name: 'name',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {},
    sorter: true,
  },
  {
    title: '角色代码',
    name: 'code',
    //dict: [{ code: '0', codeName: '城市' }, { code: '1', codeName: '乡村' }],
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '角色类型',
    name: 'type',
    tableItem: {},
    formItem: {},
    searchItem: {}
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
          {/* <Button tooltip="修改角色权限" onClick={e => self.onUpdatPermission(record)}>
          修改角色权限
          </Button> */}
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
