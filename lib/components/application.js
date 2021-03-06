import React, { Component } from 'react';
import store from '../store';
import { remote } from 'electron';
import ActionPanel from './action-panel';
import Search from './search';
import AllNotes from './all-notes';
import Note from './note';
import ActiveNote from './active-note';

class Application extends Component {
  constructor() {
    super();
    this.state = { notes: [] };
  }

  componentDidMount() {
    store.on('change', notes => {
      this.setState({ notes });
    });
  }

  render() {
    let placeholder = <div>Select a File or Create New Note</div>;
    let activeNote = this.state.notes.find(note => note.active);

    return (
      <div>
        <div >
          <ActionPanel />
          <section id="note-panels">
            <section id="left-panel">
              <Search />
              <AllNotes notes={this.state.notes} />
            </section>
            <section id="right-panel">
              {activeNote ? <ActiveNote note={activeNote} /> : placeholder}
            </section>
          </section>
        </div>
      </div>
    );
  }
}

module.exports = Application;
