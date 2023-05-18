

const OSS = require('ali-oss');
const fs = require('fs');

const ossClient = new OSS({
    region: 'oss-cn-XXX',
    accessKeyId: 'XXXX',
    accessKeySecret: 'XXX',
    bucket: 'XXX',
});

const putOSS = async (src, dist) => {
  try {
    const result = await ossClient.put(dist, src);
    console.log('upload success:', result.url);
  } catch (e) {
    console.log(e);
  }
};

const batchPutFileToOSS = (src, dist) => {
    const docs = fs.readdirSync(src)
    docs.forEach(function(doc) {
      var _src = src + '/' + doc
      var _dist = dist + '/' + doc
      var st = fs.statSync(_src)
      if (st.isFile() && doc !== '.DS_Store') {
        putOSS(_src, _dist)
      } else if (st.isDirectory()) {
        addFileToOSSSync(_src, _dist)
      }
    })
}

batchPutFileToOSS('../../static/oss','XXXX')
