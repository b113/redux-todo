import React from 'react';
import Form from '../Form';
import NotesList from '../NotesList';
import styles from './todo.css';

const Todo = () => (
  <div className={styles.app}>
    <h1 className={styles.header}>
      Notes
    </h1>
    <Form />
    <NotesList />
  </div>
);

export default Todo;
