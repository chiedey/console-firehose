/**
 * Dependencies: aws-sdk
 * Quick start:
 *   require('console-firehose')({
 *     region: 'us-west-2',
 *     awsAccessKeyId: '<你的AWS ID>',
 *     awsSecretAccessKey: '<你的AWS Key>',
 *     deliveryStreamName: '<你在Amazon Kinesis创建的Firehose delivery stream名称>'
 *   })
 *
 *   console.fh('2019-01-04	2249153971769560	1	0	1029	1')
 *
 * PS:
 *   0. 引用此库后，请用console.fh('xxx yyy zzz aaa bbb ccc iii jjj kkk')上报数据
 *   1. 上报数据内容为字符串
 *   2. 各个字段推荐使用tab分隔符进行分割
 *   3. 各个字段代表的含义需业务方自行定义并维护
 *
 * Author: Mason(wengqidi@wps.cn)
 *   Date: 2019-01-04
 */

// 初始化参数检查
const check = argo => {
  if (!argo.region) {
    console.log('请指定AWS可用区')
    return
  }
  if (!argo.awsAccessKeyId) {
    console.log('请指定AWS Access Key Id')
    return
  }
  if (!argo.awsSecretAccessKey) {
    console.log('请指定AWS Secret Access Key')
    return
  }
  if (!argo.deliveryStreamName) {
    console.log('请指定Delivery Stream Name')
    return
  }
}

// 抛出构造函数
module.exports = (argo = {}) => {
  check(argo)

  // 引入aws-sdk依赖
  const aws = require('aws-sdk')
  // 实例化Firehose
  const firehose = new aws.Firehose({ region: argo.region })

  // 往console注入fh
  console.__proto__.fh = meta => {
    const params = {
      DeliveryStreamName: argo.deliveryStreamName,
      Record: { Data: meta }
    }

    firehose.putRecord(params, (err, data) => {
      if (err)
        console.log(err, err.stack)
      else
        console.log(meta)
    })
  }
}
