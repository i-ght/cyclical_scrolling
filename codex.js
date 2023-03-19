/* JQuery removed from: https://codepen.io/geraldfullam/pen/NqxJEo */

class Element {
  static reckonHeight(element) {
    const style = window.getComputedStyle(element);
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    return element.clientHeight - (paddingTop + paddingBottom);
  }
}


document.addEventListener("DOMContentLoaded", function(_) {
  const cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.addEventListener("click", function(_) {
      const concealable = this.getElementsByClassName("concealable")[0];
      const style = window.getComputedStyle(concealable);
      concealable.style.display = style.display === "none" ? "block" : "none";
    });
  }

  /* REMINDER: Breakdown when space is constrained to the extreme */

  let prevScrollIndex = 0;

  const grabHead = () => document.querySelector(".cell:first-child");
  const grabTailBit = () => document.querySelector(".cell:last-child");

  const lemonTower = document.querySelector("#lemon-tower");
  lemonTower.addEventListener("scroll", function(_) {

    const mymy = this;
    const items = document.querySelector("#cells");
    let scrolldex = mymy.scrollTop;

    if (scrolldex > prevScrollIndex) {
      const tailBit = grabTailBit();
      const itemsHeight = Element.reckonHeight(items);
      const mymyHeight = Element.reckonHeight(mymy);
      const tailTipHeight = Element.reckonHeight(tailBit);

      const threshold = itemsHeight - mymyHeight - tailTipHeight;

      if (scrolldex > threshold) {
        const head = grabHead();
        items.append(head);
        
        const headHeight = Element.reckonHeight(head);
        scrolldex -= headHeight;
        mymy.scrollTop = scrolldex;
      }
    } else {
      const threshold = Element.reckonHeight(grabHead());

      if (scrolldex < threshold) {
        const tailBit = grabTailBit();
        items.prepend(tailBit);

        const tailHeight = Element.reckonHeight(tailBit);
        scrolldex += tailHeight;
        mymy.scrollTop = scrolldex;
      }
    }
    prevScrollIndex = scrolldex;
  })
});
