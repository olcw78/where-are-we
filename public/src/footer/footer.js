import { async } from "regenerator-runtime";

class Footer {
  static createFooterInfocard(...card) {
    let template = "";
    for (let i of card) {
      template += `
          <li id="card">
            <div class="card-layout card-title">${i.title}</div>
            <div class="card-layout card-content">${i.content}</div>
          </li>
        `;
    }

    const node = document.createElement("ul");
    node.setAttribute("id", "info");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    const footer = document.querySelector("footer");
    // footer.appendChild(node);
    footer.insertBefore(node, footer.firstChild);
  }

  static init() {
    Footer.createFooterInfocard(
      {
        // 1. e-mail
        title: `<i class="fas fa-envelope"></i>`,
        content: "highp0912@protonmail.ch",
      },
      {
        // 2. instagram
        title: `<i class="fab fa-instagram"></i>`,
        content: "chez_ys",
      },
      {
        // 3. mobile
        title: `<i class="fas fa-phone"></i>`,
        content: "010-2753-4365",
      },
      {
        // 4. github
        title: '<i class="fab fa-github"></i>',
        content: "https://github.com/olcw78",
      }
    );
  }
}

export default Footer;
