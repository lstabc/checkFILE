import $$ from 'cmn-utils';
import PageHelper from '@/utils/pageHelper';


export async function  getMenu(payload) {return $$.post('/sysMenu/getMenuTree', payload)}
export async function login(payload) {return $$.post('/login', payload)}

export const doSearch = (searchText) => $$.post('/tree/getAsyncSearchData', {search: searchText}).then(({data}) => data)

export async function register(payload) {return $$.post('/user/register', payload)}

export const doLoadTableData = (pageInfo) => $$.post('/datatable/getList', PageHelper.requestFormat(pageInfo))
      .then(resp => PageHelper.responseFormat(resp))
      .catch(e => console.error(e));


export const AutoCompleteData = (value) => {return new Promise((resolve, reject) => {
              $$.post('/form/autoComplete', value)
                .then(resp => {
                  const { data } = resp;
                  resolve(data.list);
                })
                .catch(e => reject(e)); // reject stop loading
            });
          };