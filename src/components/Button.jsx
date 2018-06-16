import react, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Button extends PureComponent {
  render() {
    return (
      <button
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        className={this.props.className}
        autoFocus={this.props.autoFocus}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  value: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  autoFocus: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}


Button.defaultProps = {
  type: 'button',
  onClick: () => ({})
}

export default Button;
