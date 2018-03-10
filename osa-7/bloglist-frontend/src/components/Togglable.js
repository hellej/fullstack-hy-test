import React from 'react'
import PropTypes from 'prop-types'


class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }


  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const childrenWithExtraProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        toggleParentVisibility: () => (e) => {
          e.preventDefault()
          this.setState({ visible: !this.state.visible })
        }
      })
    })

    return (
      <div>
        <div style={hideWhenVisible}>
          <button className='button button5' onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {childrenWithExtraProp}
        </div>
      </div >
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable