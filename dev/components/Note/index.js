import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeNote, changeNote } from '../../actions';
import styles from './note.css';

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChange: false,
    };

    this.changeNote = this.changeNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeNote(e) {
    e.preventDefault();
    const { id, changeNote } = this.props;
    const { text } = this.state;

    const changedNote = {
      id,
      text,
    };
    changeNote(changedNote);

    this.setState({
      isChange: false,
    });
  }

  handleChange() {
    const { children } = this.props;

    this.setState({
      isChange: true,
      text: children,
    });
  }

  render() {
    const { children, id, removeNote } = this.props;
    const { isChange, text } = this.state;
    return (
      <div className={styles.note}>
        {
          isChange ? (
            <form onSubmit={this.changeNote}>
              <input
                onChange={e => this.setState({
                  text: e.target.value,
                })}
                type="text"
                value={text}
              />
              <button type="submit">
                save
              </button>
            </form>
          ) : (
            <div>
              <span>
                {children}
              </span>
              <div className={styles.action}>
                <button
                  type="button"
                  className={styles.edik}
                  onClick={this.handleChange}
                >
                  i
                </button>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeNote(id)}
                >
                  x
                </button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  changeNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default connect(null, { removeNote, changeNote })(Note);
