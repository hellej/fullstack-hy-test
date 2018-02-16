
const listHelper = require('../utils/list-helper')
const { initialBlogs } = require('./test-helper')

const blogs = initialBlogs

const onebloglist = [blogs[0]]
const emptylist = []
const mostvoted = blogs[2]

describe('Blog helpers', () => {

  // test.skip('dummy is called', () => {
  //   const blogs = []

  //   const result = listHelper.dummy(blogs)
  //   expect(result).toBe(1)

  // })

  describe('total likes when', () => {

    test('list is empty is zero', () => {
      const result = listHelper.totalLikes(emptylist)
      expect(result).toBe(0)
    })

    test('list is only one blog is calculated correctly', () => {
      const result = listHelper.totalLikes(onebloglist)
      expect(result).toBe(7)
    })

    test('list is bigger is calculated correctly', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
  })


  describe('favourite blog is got right when', () => {
    test('list is empty', () => {
      const result = listHelper.favoriteBlog(emptylist)
      expect(result).toEqual(undefined)
    })
    test('list is only one blog', () => {
      const result = listHelper.favoriteBlog(onebloglist)
      expect(result).toEqual(onebloglist[0])
    })
    test('list is bigger', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(mostvoted)
    })

  })

  describe('author with most blogs is got right when', () => {

    test('list is empty', () => {
      expect(listHelper.mostBlogs(emptylist)).toBe(undefined)
    })
    test('list is only one blog', () => {
      expect(listHelper.mostBlogs(onebloglist).name).toBe('Michael Chan')
    })
    test('list is bigger', () => {
      expect(listHelper.mostBlogs(blogs).name).toBe('Robert C. Martin')
    })

  })

  describe('author with most likes is got right when', () => {

    test('list is empty', () => {
      expect(listHelper.mostLikes(emptylist)).toBe(undefined)
    })
    test('list is only one blog', () => {
      expect(listHelper.mostLikes(onebloglist).name).toBe('Michael Chan')
    })
    test('list is bigger', () => {
      expect(listHelper.mostLikes(blogs).name).toBe('Edsger W. Dijkstra')
    })

  })

})

