'use babel';

import SlotGacorLoginView from './slot-gacor-login-view';
import { CompositeDisposable } from 'atom';

export default {

  slotGacorLoginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotGacorLoginView = new SlotGacorLoginView(state.slotGacorLoginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotGacorLoginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-gacor-login:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotGacorLoginView.destroy();
  },

  serialize() {
    return {
      slotGacorLoginViewState: this.slotGacorLoginView.serialize()
    };
  },

  toggle() {
    console.log('SlotGacorLogin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
