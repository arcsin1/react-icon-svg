# Icon

| 配置项       |   类型   |    必填    |     默认值     | 功能/备注        |
| --------- | :----: | :------: | :---------: | :----------- |
| height    | string |  option  |     32      | icon高度       |
| fill      | String |  option  |    NULL     | Icon填充颜色     |
| width     | string |  option  |     32      | icon宽度       |
| name      | string | required |    NULL     | 引用icon名称     |
| className | string |  option  | ‘oner-icon’ | icon自定义class |
| Others    | object |  option  |    Null     | 可以是svg的属性值   |

```
<Icon fill="#fff" name="about" width="20" height="20"/>
```

### svg命名规范

```
第一种方式：/\/[A-Za-z0-9]+\.color\.svg$/
xx.color.svg  注意这种事svg多色不会去掉fill颜色 请选择这种命名

第二种： /\/[A-Za-z0-9]+\.svg$/
xx.svg 这种我会把内部的fill颜色全部给去掉

tips: 命名请不要出现特殊字符  只能用数字英文
```
### others

```
`npm run build` 打包 (每次上传svg图片在svg文件夹需重新打包)
`npm start`  本地调式
```