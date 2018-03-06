
import React from 'react'
import { updateFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'


class Filter extends React.Component {
  handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    // console.log('event: ', event.target.value)

    // this.props.store.dispatch(updateFilter(event.target.value)) // ennen connectia
    this.props.updateFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
    undefined
  }
}

const mapDispatchToProps = {
  updateFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter