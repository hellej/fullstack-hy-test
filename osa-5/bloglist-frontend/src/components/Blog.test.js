import React from 'react'
import { shallow } from 'enzyme'

import Blog from './Blog'


const blog = {
  id: '1234',
  title: 'Egyhe Sinuptilainen',
  author: 'Mika',
  url: 'www.osoite.fi',
  likes: 3,
  user: { username: 'pasi' },
}
let selectedId = ''
const loggedInUser = { username: 'pasi' }


const handleBlogClick = () => {
  selectedId = blog.id
}

describe.only('<Blog />', () => {
  let blogComponent

  beforeEach(async () => {
    blogComponent = shallow(
      <Blog
        key={blog.id}
        blog={blog}
        handleClick={handleBlogClick}
        selectedId={selectedId}
        loggedInUser={loggedInUser}
      />
    )
  })

  it('Only name and author of blog are shown first', () => {

    const blogDiv = blogComponent.find('.blog')
    const selectedBlogDiv = blogComponent.find('.selectedBlog')

    // console.log(blogDiv.debug())
    // console.log(selectedBlogDiv.debug())

    expect(blogDiv.text()).toContain('Mika')
    expect(blogDiv.text()).toContain('Egyhe Sinuptilainen')
    expect(selectedBlogDiv.length).toBe(0)
  })


  it('Click to name shows more information of blog', () => {

    const button = blogComponent.find({ id: blog.id })
    // console.log('button: ', button.debug())

    button.simulate('click')

    blogComponent = shallow(
      <Blog
        key={blog.id}
        blog={blog}
        handleClick={handleBlogClick}
        selectedId={selectedId}
        loggedInUser={loggedInUser}
      />
    )

    const blogDiv = blogComponent.find('.blog')
    const selectedBlogDiv = blogComponent.find('.selectedBlog')

    // console.log('blogdiv: ', blogDiv.debug())
    // console.log('selectedblogdiv: ', selectedBlogDiv.debug())

    expect(blogDiv.length).toBe(0)
    expect(selectedBlogDiv.text()).toContain('Likes')
  })

})