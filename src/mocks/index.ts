import Mock from 'better-mock'

Mock.mock(/\/test/, 'get', () => {
  return '{ a: 1 }'
})

// const { data, isFinished } = useFetch('/test')
// watch(isFinished, () => {
//   if (isFinished)
//     console.log(data.value)
// })
// fetch('/test').then(res => res.json()).then(console.log)
// axios.get('/test').then((res) => {
//   console.log(res.data)
// })
