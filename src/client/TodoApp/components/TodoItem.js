// @flow

import React, { Component } from 'react'

const ENTER_KEY_CODE = 13

type Props = {|
  todoItem: {
    id: string,
    completed: boolean,
    title: string,
  },
  onCompletedChangeValue: (value?: boolean) => any,
  editTitleValue: string,
  onEditTitleChangeText: (value?: string) => any,
  onSubmitTitleEditing: () => any,
  onRemovePress: () => any,
|};

type State = {|
  editing: boolean,
|};

export default class TodoItem extends Component<Props, State> {
  state = {
    editing: false,
  }

  editNameInput: ?HTMLInputElement;

  _handleToggleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onCompletedChangeValue(e.target.checked)
  }

  _handleLabelDoubleClick = () => {
    this.setState({ editing: true }, () => {
      if (!this.editNameInput) return
      this.editNameInput.focus()
      if (!this.editNameInput) return
      const l = this.editNameInput.value.length
      this.editNameInput.setSelectionRange(l, l)
    })
  }

  _handleEditTitleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onEditTitleChangeText(e.target.value)
  }

  _handleEditTitleKeyDown = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.props.onSubmitTitleEditing()
      this.setState({ editing: false })
    }
  }

  _handleEditTitleBlur = () => {
    this.props.onSubmitTitleEditing()
    this.setState({ editing: false })
  }

  render() {
    const {
      todoItem,
      editTitleValue,
      onRemovePress,
    } = this.props
    const { editing } = this.state

    return (
      <li
        className={[
          todoItem.completed && 'completed',
          editing && 'editing',
        ].filter(el => el).join(' ')}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this._handleToggleChange}
            checked={todoItem.completed}
          />
          <label
            onDoubleClick={this._handleLabelDoubleClick}
          >
            {todoItem.title}
          </label>
          <button
            className="destroy"
            onClick={onRemovePress}
          />
        </div>
        <input
          ref={ref => this.editNameInput = ref}
          className="edit"
          onChange={this._handleEditTitleChange}
          onKeyDown={this._handleEditTitleKeyDown}
          onBlur={this._handleEditTitleBlur}
          value={editTitleValue}
        />
      </li>
    )
  }
}
