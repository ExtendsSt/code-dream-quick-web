import Mock from 'mockjs'
import axios from 'axios'

Mock.mock(/\/test/, 'get', () => {
  return { a: 1 }
})
Mock.setup({
  timeout: '600-1000',
})
