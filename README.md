# Console Firehose

## 工作原理示意
![](https://raw.githubusercontent.com/chiedey/console-firehose/master/hue.jpg)

## Quick start:
```javascript
require('console-firehose')({
  region: 'us-west-2',
  awsAccessKeyId: '<你的AWS ID>',
  awsSecretAccessKey: '<你的AWS Key>',
  deliveryStreamName: '<你在Amazon Kinesis创建的Firehose delivery stream名称>'
})

console.fh('2019-01-04	2249153971769560	1	0	1029	1')
```

## PS
0. 引用此库后，请用console.fh('xxx yyy zzz aaa bbb ccc iii jjj kkk')上报数据
1. 上报数据内容为字符串
2. 各个字段推荐使用tab分隔符进行分割
3. 各个字段代表的含义需业务方自行定义并维护