const Mock = require('mockjs')

module.exports = [
  {
    url: '/vue-element-admin/goods/num',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { category: 'PC', value: 1024 },
            { category: 'mobile', value: 1024 },
            { category: 'ios', value: 1024 },
            { category: 'android', value: 1024 }
          ]
        }
      }
    }
  }
]
