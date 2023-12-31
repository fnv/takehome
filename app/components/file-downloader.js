import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class File {
  @tracked selected;
  name;
  device;
  path;
  status;
}

export default class FileDownloaderComponent extends Component {
  @tracked files = [];

  constructor(owner, args) {
    super(owner, args);
    this.files = this.args.files
      .filter((givenFile) => {
        return givenFile.name && givenFile.name.length > 0;
      })
      .map((givenFile) => {
        let file = new File();
        file.selected = false;
        file.name = givenFile.name || 'None';
        file.device = givenFile.device || 'None';
        file.path = givenFile.path || '';
        file.status = givenFile.status || 'unknown';
        return file;
      });
  }

  get isSelectAllChecked() {
    if (this.selectedRows.length === this.files.length) {
      return true;
    } else {
      return false;
    }
  }

  // setter required to prevent TypeError
  set isSelectAllChecked(val) {}

  get isSelectAllIndeterminate() {
    if (
      this.selectedRows.length === this.files.length ||
      this.selectedRows.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  get selectedRows() {
    return this.files
      .map((file, index) => {
        if (file.selected) {
          return index;
        } else {
          return undefined;
        }
      })
      .filter((val) => !(val === undefined));
  }

  get selectionText() {
    let count = this.selectedRows.length;
    if (count === 0) {
      return 'None Selected';
    } else {
      return `Selected ${count}`;
    }
  }

  @action
  download() {
    let selectedFiles = this.files.filter((file, index) => {
      let valid = file.status === 'available';
      let selectedAndValid = this.selectedRows.includes(index) && valid;
      return selectedAndValid;
    });
    let alertStrings = selectedFiles.map((file) => {
      return `${file.path} ${file.device}`;
    });
    if (alertStrings.length === 0) {
      alertStrings.push('No available files selected.');
    }
    alert(alertStrings.join('\n'));
  }

  @action
  toggleRowByIndex(index) {
    if (this.selectedRows.includes(index)) {
      this.files[index].selected = false;
    } else {
      this.files[index].selected = true;
    }
  }

  @action
  toggleAll() {
    if (this.selectedRows.length === this.files.length) {
      this.files.forEach((file, index) => {
        this.files[index].selected = false;
      });
    } else {
      this.files.forEach((file, index) => {
        this.files[index].selected = true;
      });
    }
  }
}
