import Mock from 'mockjs'

const baseURL = "http://123.207.32.32:8000"
const Random = Mock.Random

const poplist = Mock.mock({
  'list|30': [{
    'id': '@id',
    'title': '@title(1,5)',
    'price': '@integer(1,1000)',
    'cfav': '@integer(0, 1000)',
    'show': {
      'img': '@dataImage("200x300", "商品")'
    }
  }]
})

const newlist = Mock.mock({
  'list|30': [{
    'id': '@id',
    'title': '@title',
    'price': '@integer(1,1000)',
    'cfav': '@integer(0, 1000)',
    'show': {
      'img': Random.image('200x300', '#894FC4', '#FFF', 'png', '商品')
    }
  }]
})

const selllist = Mock.mock({
  'list|30': [{
    'id': '@id',
    'title': Random.title(1, 5),
    'price': Random.integer(0, 1000),
    'cfav': Random.integer(0, 1000),
    'show': {
      'img': Random.image('200x300', '#894FC4', '#FFF', 'png', '!')
    }
  }]
})

Mock.mock(RegExp(baseURL + '/home/data.*'), (options) => {
  const type = options.url.toString()
  console.log(type);
  if (type.indexOf('pop') != -1) {
    return {
      'data': poplist
    }
  } else if (type.indexOf('new') != -1) {
    return {
      'data': newlist
    }
  } else if (type.indexOf('sell') != -1) {
    return {
      'data': selllist
    }
  } else {
    console.log("请求的参数错误！ 参数为：" + options);
  }
})

Mock.mock(RegExp(baseURL + '/detail.*'), (options) => {
  const iid = options.url.toString()

  return Mock.mock({
    'id': iid,
    'result': {
      'itemInfo': {
        'topImage|1-10': ['@dataImage("320x300", "商品")'],
        'title': '@title',
        'desc': '@sentence',
        'oldPrice': '@integer(0, 1000)',
        'price': '@integer(0, @oldPrice)',
        'discountDesc|1': ['今日特价', '折扣价', '优惠价'],
        'highNowPrice': ''
      },
      'columns': ['@integer(0, 1000)', '@integer(0, 1000)'],
      'shopInfo': {
        'services': [{
          'icon': Random.dataImage('20x10', '√'),
          'name': '退货补运费'
        }, {
          'icon': Random.dataImage('20x10', '√'),
          'name': '全国包邮'
        }, {
          'icon': Random.dataImage('20x10', '√'),
          'name': '7天无理由退货'
        }, {
          'icon': Random.dataImage('20x10', '√'),
          'name': '72小时发货'
        }],
        'shopLogo': Random.dataImage('30x30', '商'),
        'name': '@cname',
        'cSells': '@integer(0, 100000)',
        'cGoods': '@integer(0, 1000)',
        'cFans': '@integer(0, 10000)',
        'score': [{
          'name': '描述相符',
          'score': '@integer(400, 500)',
          'isBetter': ''
        }, {
          'name': '价格合理',
          'score': '@integer(400, 500)',
          'isBetter': ''
        }, {
          'name': '质量满意',
          'score': '@integer(400, 500)',
          'isBetter': ''
        }]
      },
      'price': Random.integer(0, 1000),
      'cfav': Random.integer(0, 1000),
      'show': {
        'img': Random.image('200x300', '#894FC4', '#FFF', 'png', '!')
      },
      'detailInfo': {
        'desc': '新款上市',
        'detailImage': [{
          'key': '穿着效果',
          'list|1-10': ['@dataImage("320x300", "商品")']
        }]
      },
      'itemParams': {
        'info': {
          'key': '产品参数',
          'set': [{
              'key': '图案',
              'value': '宫廷复古图'
            },
            {
              'key': '厂名',
              'value': 'XXX服饰有限公司'
            },
            {
              'key': '颜色',
              'value': '黑白拼接'
            },
            {
              'key': '袖型',
              'value': '常规袖'
            },
            {
              'key': '尺码',
              'value': 'M,L,XL,XXL'
            }
          ]
        },
        'rule': {
          'key': '尺码说明',
          'tables': [
            [
              ['尺码', 'M', 'L', 'XL', 'XXL'],
              ['衣长', '61.5', '63', '64.5', '66'],
              ['胸围', '98', '104', '110', '116'],
              ['袖长', '63', '66', '68.5', '70.5']
            ]
          ]
        }
      }
    }
  })
})
