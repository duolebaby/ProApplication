---
title: utils-工具函数库
group:
  path: /
nav:
  title:
  path: /components
---

# @vis/utils

> @vis/utils

See our website [@ant-design/pro-utils](https://procomponent.ant.design/) for more information.

## Install

Using npm:

```bash
$ npm install --save  @vis/utils --registry http://10.28.184.132:4837/
```

or using yarn:

```bash
$ yarn add @vis/utils --registry http://10.28.184.132:4837/
```

## 常用工具类
### nanoid

用来生成唯一不重复 ID

```jsx
import { nanoid } from '@vis/utils';
import { Button } from 'antd';
import React from 'react';
export default () => {
  return (
    <Button
      onClick={() => {
        console.log(nanoid());
      }}
    >
      点我生成
    </Button>
  );
};
```
### observerDomResize
快速为dom resize添加监听并处理,底层使用`MutationObserver`，更多相关可以查看mdn文档
```tsx
import { observerDomResize } from '@vis/utils';
import React, { useRef, useLayoutEffect } from 'react'

export default () => {
  const ref = useRef()
  useLayoutEffect(() => {
    observerDomResize(ref.current, ([mutation]) => {
      console.log('change', mutation)
    })
  }, [])
  return <div style={{marginLeft: 20, width: 400, background: 'orange'}} ref={ref}>
    <button 
      onClick={() => {
        ref.current.style.marginLeft = '30px'
      }}
    >点我修改布局，触发监听</button>
  </div>
}

```

### parseValueToMoment
支持将各种类型的日期转换为moment对象,返回原数据格式moment对象。
```tsx
import { parseValueToMoment } from '@vis/utils';
import React from 'react';
export default () => {
  return <div>
    {
      ['1997-09-08 16:45:32', ['1997-09-08', '2020-02-21'], +new Date(), [+new Date()] ].map((i) => {
        return <div>before: {i.toString()}---- transformed: {parseValueToMoment(i).toString()}</div>
      }) 
    }
  </div>
}
```
### genCopyable
生成超出带...功能的dom，切提供antd组件`Typography`的功能
```tsx
import React from 'react'
import { genCopyable } from '@vis/utils'
export default () => {
  return <div >
  { genCopyable( <h1 style={{width: 300}}>title</h1> , { ellipsis: true, copyable: true }, 'test123') }
  </div>
}
```
### isBrowser
判断当前是否是浏览器环境
```tsx
import React from 'react'
import { isBrowser } from '@vis/utils'
export default () => {
  return <div>{ isBrowser().toString() }</div>
}
```
### isImg isUrl
判断当前参数是否是图片， 是否是url链接
```tsx
import React from 'react'
import { isImg, isUrl } from '@vis/utils'
export default () => {
  return <div>{ isImg('xxx.jpg').toString() } {  isUrl('https://baidu.com/xxx.jpg').toString() } </div>
}
```


## hooks
### useAutoResize
用途： 当需要对一个dom节点的宽高属性做监听渲染时，可以使用改hooks快速实现。

```tsx
import { useAutoResize } from '@vis/utils'
import React from 'react'
export default () => {
  const { width, height, domRef } = useAutoResize()

  return <div style={{display: 'inline-block',height: 50, background: 'orange'}} ref={domRef} onClick={() => {
    domRef.current.style.width = width + 50 + 'px'
  }}>
    {width} * { height }: 点我每次增长50
  </div>
}
```
| 属性名 | 描述 | 类型 | 默认值 |
| ----   | ---- | ---- | ---- |
| width | 节点宽度 | number |  - |
| height | 节点高度 | number | - |
| domRef | 需要绑定到对应的el对象 | React.ref |  -|
