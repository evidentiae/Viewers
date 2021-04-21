import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import SimpleDialog from '../SimpleDialog/SimpleDialog.js';
import './LayoutPickerDialog.css';

export default class LayoutPickerDialog extends Component {
  static propTypes = {
    //description: PropTypes.string,
    //measurementData: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      layouts: []
    };
  }

  /*
  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.setState({
        description: this.props.description,
      });
    }
  }
  */

  render() {
    return (
      <SimpleDialog
        headerTitle="Pick Layout"
        onClose={this.onClose}
        onConfirm={this.onConfirm}
        rootClass="LayoutPickerDialog"
      >
        <h2>Test</h2>
        /*
        <input
          value={this.state.description}
          className="simpleDialogInput"
          id="description"
          autoComplete="off"
          autoFocus
          onChange={this.handleChange}
        />
        */
      </SimpleDialog>
    );
  }

  onClose = () => {
    this.props.onCancel();
  };

  onConfirm = e => {
    e.preventDefault();
    this.props.onConfirm({});
  };

  handleChange = event => {
    this.setState({});
  };
}
