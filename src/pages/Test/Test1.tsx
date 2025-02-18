import Guide from '@/components/Guide';
import { useModel } from '@umijs/max';
import { useLocation, useParams } from 'react-router-dom';
import { Workspace } from '@vis/components'
import { ProBreadcrumb, RouteContext } from '@ant-design/pro-components';
import React, { useContext } from 'react'

const HomePage: React.FC = (props) => {
  const location  = useParams();
  return (
      <div>
        <Workspace
          isUrlState
          desc="初始化demo，用来展示workSpace的基本用法，后续添加面包屑功能"
          showBread={true}
          formProps={{
            size: 'small'
          }}
          formColumns={[{
            title: '标题',
            dataIndex: 'title',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: 's',
            colProps: {
              xs: 24,
              md: 12,
            },
          },
          {
            title: '状态',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: { a: 1, b: 2 },
            width: 's',
            colProps: {
              xs: 24,
              md: 12,
            },
          }]}
          tabs={[{
            key: '工作区1',
            title: '工作区1',
            content: <h1>工作区1</h1>
          },
          {
            key: '工作区22',
            title: '工作区2',
            content: <h1>工作区2</h1>
          }
        ]}
        />
      </div>
  );
};

export default HomePage;
