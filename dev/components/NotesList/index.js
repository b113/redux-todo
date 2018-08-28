import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Note from '../Note';
import { parseNotes } from '../../actions';
import styles from './notelist.css';

class NotesList extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {
    const { parseNotes } = this.props;
    const notesFeed = JSON.parse(localStorage.getItem('notesFeed'));
    if (notesFeed) {
      parseNotes(notesFeed);
    }
  }

  componentDidUpdate() {
    const { notes } = this.props;
    const notesFeed = JSON.stringify(notes);
    localStorage.setItem('notesFeed', notesFeed);
  }

  render() {
    const { notes } = this.props;
    return (
      <div className={styles.app}>
        {
          notes.length ? (
            notes.map(note => (
              <Note
                key={note.id}
                id={note.id}
              >
                {note.text}
              </Note>
            ))
          ) : (
            <p className={styles.empty}>
              no notes yet :(
            </p>
          )
        }
      </div>
    );
  }
}

NotesList.propTypes = {
  parseNotes: PropTypes.func.isRequired,
  notes: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({ notes: state });

export default connect(mapStateToProps, { parseNotes })(NotesList);
