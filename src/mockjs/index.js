import Mock from 'mockjs'

const baseURL = "http://123.207.32.32:8000"
const Random = Mock.Random

const poplist = Mock.mock({
  'list|30': [{
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
