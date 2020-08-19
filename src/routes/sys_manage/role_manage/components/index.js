import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ sysRole, loading }) => ({
  sysRole,
  loading: loading.models.sysRole
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: []
  };

  handleDelete = records => {
    const { rows } = this.state;
    this.props.dispatch({
      type: 'sysRole/remove',
      payload: {
        records,
        success: () => {
          // 如果操作成功，在已选择的行中，排除删除的行
          this.setState({
            rows: rows.filter(
              item => !records.some(jtem => jtem.rowKey === item.rowKey)//some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
            )
          });
        }
      }
    });
  };

  render() {
    const { sysRole, loading, dispatch } = this.props;
    const { pageData, departmentDic,roleDic } = sysRole;
    let depDic = [];
    let rolDic = [];
    departmentDic.map(dic => depDic.push({code: dic.id,codeName : dic.name}));
    roleDic.map(rol => rolDic.push({code: rol.id,codeName : rol.name}));
    //console.log('departmentDicdepartmentDic',depDic);
    const columns = createColumns(this, depDic,rolDic);
    const { rows, record, visible } = this.state;

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'sysRole/getPageList',
          payload: {
            pageData: pageData.filter(values)
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize,sorter }) => {
        dispatch({
          type: 'sysRole/getPageList',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize),
            pageData: pageData.sortBy(sorter)
            //pageData: pageData.sortBy({column: 'role_id', asc: false})
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: values => {
        let type = 'sysRole/save'
        if(record){
          const {updateTime,createTime,deleted,...othervalues} = record
          values = {...othervalues, ...values }
          type = 'sysRole/update'
        }
        dispatch({
          type: type,
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              });
            }
          }
        });
      }
    };

    return (
      <Layout className="full-layout sysRole-page">
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button type="primary" icon="plus" onClick={this.onAdd}>
                  新增
                </Button>
                <Button
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  icon="delete"
                >
                  删除
                </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type="grid" {...searchBarProps} />}
          >
            <SearchBar group="abc" {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}
