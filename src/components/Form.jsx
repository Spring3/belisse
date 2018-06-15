import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Form extends PureComponent {
  render() {
    return (
      <form
        id={this.props.id}
        name={this.props.name}
        className={classNames(`flex justify-start items-center ${this.props.className}`, {
          'flex-col': this.props.orientation === 'vertical',
          'flex-row': this.props.orientation === 'horizontal',
          'flex-row-reversed': this.props.orientation === 'horizontal-reversed',
          'flex-col-reversed': this.props.orientation === 'vertical-reversed'
        })}
        onSubmit={this.props.onSubmit}
      >
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  orientation: PropTypes.oneOf([
    'vertical',
    'horizontal',
    'vertical-reversed',
    'horizontal-reversed'
  ]),
  id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
  ])
};

Form.defaultProps = {
  onSubmit: () => {},
  className: ''
};

export default Form;
