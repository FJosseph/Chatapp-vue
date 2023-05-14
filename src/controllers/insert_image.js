const insertComponents = (chats) => {
  chats.map((x, index) => {
    if (x.file) {
      const contentImage = document.createElement("div");
      const image = document.createElement("img");
      contentImage.setAttribute("class", "imageMessage");
      image.setAttribute("src", `${x.file}`);
      contentImage.appendChild(image);
      console.log(contentImage);
      const elementCurrent = document.querySelector(
        `#chat-${index} div div div`
      );
      console.log(elementCurrent);
      elementCurrent.appendChild(contentImage);
    }
  });
};

export default insertComponents;
