import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
  constructor(props) {
    super(props);
  }

  pickChangeEventHandler = (event) => {
    switch (this.props.type) {
      case 'checkbox':
        return this.props.onChange(event, event.target.checked);
      default:
        return this.props.onChange(event, event.target.value);
    }
  }

  renderLabel = () => {
    return (
      <label
        key={1}
        htmlFor={this.props.name || this.props.id}
      >
        {this.props.label}
      </label>
    );
  }

  renderTextArea = () => {
    return [
      <textarea
        key={0}
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        className={this.props.className}
        placeholder={this.props.placeholder}
        required={this.props.required}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        autoComplete={this.props.autoComplete}
        value={this.props.value}
        onChange={this.pickChangeEventHandler}
      />,
      this.props.label ? this.renderLabel() : null
    ];
  }

  renderTextInput = () => {
    return [
      <input
        key={0}
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        className={this.props.className}
        placeholder={this.props.placeholder}
        required={this.props.required}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        autoComplete={this.props.autoComplete}
        value={this.props.value}
        onChange={this.pickChangeEventHandler}
      />,
      this.props.label ? this.renderLabel() : null
    ];
  }

  renderCheckbox = () => {
    return [
      <input
        key={0}
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        className={this.props.className}
        placeholder={this.props.placeholder}
        required={this.props.required}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        autoComplete={this.props.autoComplete}
        checked={this.props.checked}
        value={this.props.value}
        onChange={this.pickChangeEventHandler}
      />,
      this.props.label ? this.renderLabel() : null
    ];
  }

  render() {
    switch (this.props.type) {
      case 'checkbox':
        return this.renderCheckbox();
      case 'textarea':
        return this.renderTextArea();
      default:
        return this.renderTextInput();
    }
  }

}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'date', 'textarea', 'radio', 'checkbox']),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  value: '',
  checked: false,
  onChange: () => {}
}

export default Input;
