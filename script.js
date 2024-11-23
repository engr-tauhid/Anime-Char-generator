class MyApp {
  #imgUrl = [];
  constructor() {
    this.characterList = document.getElementById("characterList");
    this.buttonGen = document.querySelector(".Generate");
    this.buttonClr = document.querySelector(".reset");
    this.imgConteiner = document.querySelector(".image-container");
    this.buttonGen.addEventListener("click", this._btnclick.bind(this));
    this.buttonClr.addEventListener("click", this._reset.bind(this));
    this._getlocalstorage();
  }
  _getImg(char) {
    fetch(`https://api.waifu.pics/sfw/${char}`)
      .then((res) => res.json())
      .then((data) => {
        this._addImg(data.url, char);
        this.#imgUrl.push([data.url, char]);
        this._setLocalstorage();
      });
  }
  _addImg(url, char) {
    let html = ` <div class="image-item">
            <a href="${url}">
                <img src="${url}" alt="Character Image" />
            </a>
            
            <h4>You select ${char}</h4>
          </div>`;
    this.imgConteiner.insertAdjacentHTML("afterbegin", html);
  }
  _btnclick() {
    const selectedCharacter = characterList.value;
    this._getImg(selectedCharacter);
  }
  _setLocalstorage() {
    localStorage.setItem("Images", JSON.stringify(this.#imgUrl));
  }
  _getlocalstorage() {
    const data = JSON.parse(localStorage.getItem("Images"));
    if (!data) return;
    this.#imgUrl = data;
    this.#imgUrl.forEach((img) => {
      this._addImg(img[0], img[1]);
    });
  }
  _reset() {
    localStorage.removeItem("Images");
    this.imgConteiner.innerHTML = "";
  }
}
let app = new MyApp();
