import React, {Component} from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

class Icon extends Component {
  
  render() {
    const {className, width, height, fill, name, ...other} = this.props

    return (
      <svg
        className={classnames('oner-icon', {
          [className]: !!className,
        })} 
        fill={fill} 
        width={width} 
        height={height} 
        {...other}
      >
        {name && <use xlinkHref={`#${name}`} />}
      </svg>
    )
  }
}

Icon.defaultProps = {
  className: '',
  name: '',
  width: 32,
  height: 32,
  fill: '#000',
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
}

export default Icon
