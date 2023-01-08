class Poll {
  constructor(root, title) {
    this.root = root;
    this.selected = sessionStorage.getItem('selected');
    this.endpoint - 'http://localhost:3000/poll';

    this.root.insertAdjacentHTML(
      'afterbegin',
      ` <div class="poll__title">${title}</div>`
    );
    this._refresh();
  }

  async _refresh() {
    const response = await fetch(this.endpoint);
    const data = await response.json();

    this.root.querySelectorAll('.poll__option').forEach((option) => {
      option.remove();
    });
  }
}

const p = new Poll(
  document.querySelector('.poll__titles'),
  'Which position do you prefer?'
);

console.log(p);
