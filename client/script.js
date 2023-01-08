class Poll {
  constructor(root, title) {
    this.root = root;
    this.selected = sessionStorage.getItem('selected');
    this.endpoint = 'http://localhost:3000/poll';

    this.root.insertAdjacentHTML(
      'afterbegin',
      ` <div class="poll__title">${title}</div>`
    );
    this._refresh();
  }

  async _refresh() {
    const response = await fetch(this.endpoint);
    const data = await response.json();

    console.log(data);

    this.root.querySelectorAll('.poll__option').forEach((option) => {
      option.remove();
    });

    for (const option of data) {
      const template = doccument.createElement('template');
      const fragment = template.content;
      template.innerHTML = `
    <div class="poll__option">
      <span class="poll__label">${option.label}</span>
        <div class="poll__option-info">
            <div class="poll__option-fill"></div>
             <span class="poll__label">${option.percentage}%</span>
        </div>
    </div>`;

      fragment.querySelector(
        '.poll__option-fill'
      ).style.width = `${option.percentage}%`;

      this.root.appendChild(fragment);
    }
  }
}

const p = new Poll(
  document.querySelector('.poll__titles'),
  'Which position do you prefer?'
);

console.log(p);
