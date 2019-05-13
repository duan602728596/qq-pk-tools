# qq-pk-tools

QQ群pk展示信息，可以发送可视化图表。需要酷Qpro。

## 使用方法

1. 下载npm包（如果electron下载困难，使用cnpm下载）。
2. 运行`npm run build`，编译代码。
3. 运行`npm run runel:pro`，运行软件。
4. 配置程序：
  * 图片保存位置：图片要保存在coolq的`data/image里面`，否则无法发送图表。
  * 发送信息模板：[参考nunjucks](https://mozilla.github.io/nunjucks/)。示例：
    
    ```
    信息：
    {{ modian[0].title }}: {{ modian[0].already_raised}}
    {{ modian[1].title }}: {{ modian[1].already_raised}} {{ chart }}
    ```
    
    * modian：摩点信息数组，title是标题，其他相关字段为摩点接口的返回值字段
    * chart：发送的图表图片地址酷Q码