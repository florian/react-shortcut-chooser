import React, { PropTypes } from 'react';
import eventStringifier from 'key-event-to-string';

export default class ShortcutPicker extends React.Component {

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    onInvalid: PropTypes.func,
    onChange: PropTypes.func,
    modifierNeeded: PropTypes.bool,
    keyNeeded: PropTypes.bool,
    modifierChars: PropTypes.object,
    validate: PropTypes.func,
    className: PropTypes.any,
    isDisabled: PropTypes.bool,
    selectInputOnClick: PropTypes.bool,
    defaultValue: PropTypes.string,
  };

  static defaultProps = {
    onUpdate: () => {},
    onInvalid: () => {},
    onChange: () => {},
    modifierNeeded: true,
    keyNeeded: true,
    modifierChars: {},
    selectInputOnClick: true,
    validate: () => (true),
    defaultValue: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  select(e) {
    e.target.select();
  }

  keyDown(e) {
    const { keyNeeded, modifierNeeded, modifierChars, validate } = this.props;

    e.preventDefault();
    e.stopPropagation();

    const event2string = eventStringifier(modifierChars);
    const eventDetails = eventStringifier.details;

    const oldValue = e.target.value;
    const newValue = event2string(e);

    const details = eventDetails(e);

    const isValid =
      (!keyNeeded || details.hasKey) &&
      (!modifierNeeded || details.hasModifier);

    if (isValid && validate(newValue)) {
      this.setState({ value: newValue });
      if (newValue !== oldValue) {
        this.props.onUpdate(newValue, oldValue);
      }
    } else {
      this.props.onInvalid(newValue);
    }
  }

  render() {
    const { value } = this.state;
    const { className, defaultValue, onChange, selectInputOnClick } = this.props;
    return (
      <input
        className={className}
        type="text"
        value={defaultValue || value}
        onChange={onChange}
        onKeyDown={(e) => { this.keyDown(e); }}
        onFocus={selectInputOnClick ? this.select : ''}
      />
    );
  }
}
