import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Blogin otsikko',
  author: 'Jani',
  likes: 3
}

describe.skip('<SimpleBlog />', () => {
  it('renders content', () => {

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const infoDiv = blogComponent.find('.bloginfo')
    const likesDiv = blogComponent.find('.bloglikes')

    // console.log(blogComponent.debug())
    // console.log(likesDiv.debug())

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(3)
  })

  it('clicking the like-button twise calls event handler twise', () => {

    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})


