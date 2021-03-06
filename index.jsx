var React = require('react')

var EventStringifier = require('key-event-to-string')

module.exports = React.createClass({
  displayName: 'ShortcutChooser',

  getDefaultProps: function () {
    return {
      onUpdate: function () {},
      onInvalid: function () {},
      modifierNeeded: true,
      keyNeeded: true,
      modifierChars: {},
      validate: function (value) { return true }
    }
  },

  propTypes: {
    onUpdate: React.PropTypes.func.isRequired,
    onInvalid: React.PropTypes.func,
    modifierNeeded: React.PropTypes.bool,
    keyNeeded: React.PropTypes.bool,
    modifierChars: React.PropTypes.object,
    validate: React.PropTypes.func
  },

  getInitialState: function () {
    return { value: '' }
  },

  render: function () {
    var value = this.state.value || this.props.defaultValue || ''

    return <input type='text' {...this.props} value={value} onKeyDown={this.keyDown} onFocus={this.select} onChange={this.noop} />
  },

  keyDown: function (e) {
    var event2string = EventStringifier(this.props.modifierChars)
    var eventDetails = EventStringifier.details

    var oldValue = e.target.value
    var newValue = event2string(e)
    var details = eventDetails(e)

    var isValid = (!this.props.keyNeeded || details.hasKey) && (!this.props.modifierNeeded || details.hasModifier)

    if (isValid && this.props.validate(newValue)) {
      this.setState({ value: newValue })
      if (newValue !== oldValue) this.props.onUpdate(newValue, oldValue)
    } else {
      this.props.onInvalid(newValue)
    }

    this.select(e)

    e.preventDefault()
    e.stopPropagation()
  },

  select: function (e) {
    e.target.select()
  },

  noop: function () {}
})
