import React from 'react'
import { mount } from 'enzyme'

import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'
jest.mock('./services/blogs')


describe('When user is not logged in', () => {
  let app
  beforeEach(() => {
    app = mount(<App />)
  })
  it('app does not render any blogs', () => {
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toBe(0)
  })

})

describe('when user is logged in', () => {
  let app

  beforeEach(() => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    app = mount(<App />)
  })

  it('all blogs are rendered', () => {
    app.update()
    const blogComponents = app.find(Blog)
    // console.log('blogs: ', blogComponents.debug())

    expect(blogComponents.length).toBe(blogService.blogs.length)
  })

  it('name and auhtor of the first blog are rendered', () => {
    app.update()
    const blogComponents = app.find(Blog)

    const blogComp = blogComponents.find(`#${blogService.blogs[0].id}`) // IDs can not start with numbers!
    // console.log('blogcomp: ', blogComp.debug())
    // const blogDiv = blogComp.find('.blog')
    // console.log('blogdiv: ', blogDiv.debug())

    expect(blogComp.text()).toContain(blogService.blogs[0].title)
    expect(blogComp.text()).toContain(blogService.blogs[0].author)
  })

})