---
title: Workspace-工作区布局
group:
  path: /
nav:
  title:
  path: /components
---

## Workspace 组件描述
用来展示主应用的每一个模块的布局和标题，tab信息等,右侧使用schemaForm 封装，支持配置表单, 样式按照旧版走。

### 单个tabs
```jsx
import React from 'react';
import { Workspace } from '@vis/components'
export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace tabs={[{title: '仪表板', key: 'dashboard',content: <div>仪表板的内容</div>}]} desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴等。" />
  </div>
}
```
### 多个tabs
```jsx
import React from 'react';
import { Workspace } from '@vis/components'
export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace tabs={[{title: '仪表板', key: 'dashboard', content: <div>123的内容</div>}, {title: '仪表板2',  key: 'dashboard2', content: <div>仪表板2的内容</div>}]} desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴等。"/>
  </div>
}
```

### 支持表单
使用[schemaForm](https://procomponents.ant.design/components/schema-form)渲染，相关文档可以查看proComponents网站， formProps同理，为SchemaForm的基础api参数。
```tsx
import React, { useRef, useState } from 'react';
import { Workspace } from '@vis/components'
import { ProFormInstance } from '@ant-design/pro-components';

export default () => {
  const formRef = useRef<ProFormInstance>()
  const [formVal, setFormVal] = useState({})
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace 
    tabs={[{ content: <div>表单值：{JSON.stringify(formVal)}</div>, title: '主机监控',  key: '1' }, {   key: '2' ,content: <div>主机监控2</div>,title: '主机监控2' }]}
    desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴." 
    formRef={formRef}
    formProps={{
      onValuesChange(value, values) {
        console.log(values)
        setFormVal(values)
      },
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
          convertValue: (value) => {
            return `标题：${value}`;
          },
          transform: (value) => {
            return {
              title: `${value}-转换`,
            };
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
    />
  </div>
}
```
### 自定义布局
适用于常见的左侧内容不变，右侧需要根据tab切换变更时等需要自定义渲染的场景
```tsx
import React, { useRef, useState } from 'react';
import { Workspace } from '@vis/components'

export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace 
      tabs={[{ content: <div>主机监控</div>,  key: '1' , title: '主机监控' }, {   key: '2' ,content: <div>主机监控2</div>,title: '主机监控2' }]}
      desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴."
    >
    {(item) => {
      return <div style={{display: 'flex', justContent: 'space-between', height: '100%', border: 'solid 2px black'}}>
        <div style={{background: 'red', width: '200px', height: '100%'}}>我可能是左侧的树形下拉，我不会变化</div>
        <div style={{background: 'green', flex: 1, height: '100%'}}>{item.content}</div>
      </div>
    }}
    </Workspace>
  </div>
}
```

### 绑定路由
常用语当前切换的tab需要与路由参数绑定，做页面跳转等。路由参数携带该参数会优先读取该参数进行渲染当前的tab项，当当前状态改变时也会触发路由的参数改变。[demo](/~demos/Workspace-demo-4?type=dashboard)
```jsx
import React from 'react';
import { Workspace } from '@vis/components'
export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace
      initValue='dashboard'
      isUrlState={true}
      tabs={[{title: '仪表板', key: 'dashboard', content: <div>123的内容</div>}, {title: '仪表板2',  key: 'dashboard2', content: <div>仪表板2的内容</div>}]}
      desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴等。"
    />
  </div>
}
```
### 自定义路由key
如果与当前的路由参数key发生了冲突，可以使用urlKey参数来自定义，防止与其他业务冲突。
```jsx
import React from 'react';
import { Workspace } from '@vis/components'
export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace
      initValue='dashboard'
      isUrlState={true}
      urlKey="type2"
      tabs={[{title: '仪表板', key: 'dashboard', content: <div>123的内容</div>}, {title: '仪表板2',  key: 'dashboard2', content: <div>仪表板2的内容</div>}]}
      desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴等。"
    />
  </div>
}
```

### 开启面包屑

⚠️:此功能仅适用于ProComponent项目中（开启了proLayout布局渲染）
```jsx
import React from 'react';
import { Workspace } from '@vis/components'
export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace
      initValue='dashboard'
      showBread
      tabs={[{title: '仪表板', key: 'dashboard', content: <div>123的内容</div>}, {title: '仪表板2',  key: 'dashboard2', content: <div>仪表板2的内容</div>}]}
      desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴等。"
      breadcrumb={{
          routes: [
            {
              path: '',
              breadcrumbName: '一级页面',
            },
            {
              path: '',
              breadcrumbName: '二级页面',
            },
            {
              path: '',
              breadcrumbName: '当前页面',
            },
          ],
        }}
    />
  </div>
}
```

### 页脚

```jsx
import React from 'react';
import { Workspace } from '@vis/components'
import { Button } from 'antd'
export default () => {
  return <div style={{ widht: '100%', height: '500px', border: 'solid 1px red' }}>
    <Workspace tabs={[{title: '仪表板', key: 'dashboard', content: <div>123的内容</div>}, {title: '仪表板2',  key: 'dashboard2', content: <div>仪表板2的内容</div>}]} desc="以单块组件为单位组成日常使用的系统页面。可视化配置界面，支持拖拽、缩放、自动布局、tab、多图表、手风琴等。"
      footer={<Button.Group><Button type="primary" style={{marginRight: 10}}>保存</Button><Button type="primary">返回</Button></Button.Group>}
    />
  </div>
}
```
<API src="./index.tsx"></API>
