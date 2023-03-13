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
      concealable.style.display = style.display == "none" ? "block" : "none";
    });
  }

  /* REMINDER: Breakdown when space is constrained to the extreme */

  let prevScrollIndex = 0;

  const getHead = () => document.querySelector(".cell:first-child");
  const getTailBit = () => document.querySelector(".cell:last-child");

  const lemonTower = document.querySelector("#lemon-tower");
  lemonTower.addEventListener("scroll", function(_) {
    
    const mymy = this;
    const items = document.querySelector("#cells");
    let scrollIndex = mymy.scrollTop;

    if (scrollIndex > prevScrollIndex) {
      const tailBit = getTailBit();
      const itemsHeight = Element.reckonHeight(items);
      const mymyHeight = Element.reckonHeight(mymy);
      const tailTipHeight = Element.reckonHeight(tailBit);

      const threshold = itemsHeight - mymyHeight - tailTipHeight;

      if (scrollIndex > threshold) {
        const head = getHead();
        items.append(head);
        
        const headHeight = Element.reckonHeight(head);
        scrollIndex -= headHeight;
        mymy.scrollTop = scrollIndex;
      }
    } else {
      const threshold = Element.reckonHeight(getHead());

      if (scrollIndex < threshold) {
        const tailBit = getTailBit();
        items.prepend(tailBit);

        const tailHeight = Element.reckonHeight(tailBit);
        scrollIndex += tailHeight;
        mymy.scrollTop = scrollIndex;
      }
    }
    prevScrollIndex = scrollIndex;
  })
});
