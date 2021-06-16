import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { TableList, TableListItem } from '@ohif/ui';
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
      layouts: ['Panoramic', 'Four Bitewings', 'FMX'],
      pick: -1
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
        <TableList headless={true}>
          {this.state.layouts.map((name, index) =>
            <TableListItem
              itemClass={index == this.state.pick ? "SelectedLayoutPickerItem" : "LayoutPickerItem"}
              itemMetaClass="LayoutPickerItemMeta"
              onItemClick={() => this.setState({pick: index})}
            >{name}</TableListItem>
          )}
        </TableList>
      </SimpleDialog>
    );
  }

  onClose = () => {
    this.props.onCancel();
  };

  onConfirm = e => {
    e.preventDefault();
    var layout = this.state.pick < 0 ? null : this.state.layouts[this.state.pick];
    this.props.onConfirm(layout);
  };
}
