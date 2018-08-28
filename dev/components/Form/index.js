import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNote } from '../../actions';
import styles from './form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.changeText = this.changeText.bind(this);
    this.clearText = this.clearText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text } = this.state;
    const { addNote } = this.props;
    if (text) {
      const newNote = {
        id: Date.now(),
        text,
      };

      addNote(newNote);
      this.clearText();
    }
  }

  changeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  clearText() {
    this.setState({
      text: '',
    });
  }

  render() {
    const { text } = this.state;
    return (
      <form className={styles.app} onSubmit={this.handleSubmit}>
        <textarea
          placeholder="write your note"
          name="text"
          className={styles.textarea}
          value={text}
          rows="5"
          onChange={this.changeText}
        />
        <button type="submit" className={styles.button}>
          Save note
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default connect(null, { addNote })(Form);
