import CardType from "./CardType";

class Footer {
  static createFooterInfocard(...card: CardType[]): void {
    let template: string = "";
    for (const i of card) {
      template += `
          <li class="card">
            <div class="card-layout card-title">${i.title}</div>
            <div class="card-layout card-content">${i.content}</div>
          </li>
        `;
    }

    const node: HTMLUListElement = document.createElement(
      "ul"
    )! as HTMLUListElement;
    node.setAttribute("class", "info");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    const footer: HTMLElement = document.querySelector(
      "footer"
    )! as HTMLElement;
    // footer.appendChild(node);
    footer.insertBefore(node, footer.firstChild);
  }

  static init(): void {
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

// footer card template!
//     <template id="footer-card-template">
//     <ul id="info">
//         <li id="card">
//             <div class="card-layout card-title">E-mail</div>
//             <div class="card-layout card-content">highp0912@protonmail.ch</div>
//         </li>
//     </ul>
// </template>
