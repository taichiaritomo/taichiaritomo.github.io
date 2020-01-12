// By Taichi Aritomo


/****************
 * BLOCK
 ****************/

class Block {
  constructor(blockElement, blockIndex, originalWidth, flexflow) {
    this.element = blockElement;
    this.index = blockIndex;
    this.originalWidth = originalWidth;
    this.FF = flexflow; // pass a reference to the flexflow class that this block belongs to...
    this.type = blockElement.classList.contains('image') ? 'image' : 'non-image';
    this.isSplit = false;
  }
}

class ImageBlock extends Block {
  // this.rightEndElement

  merge() {
    this.element.style.width = this.originalWidth + 'px';
    // this.element.classList.remove('split');
    let deletedRightEnd = false;
    if (this.rightEndElement) {
      // this.rightEndElement.remove();
      // this.rightEndElement = null;
      this.rightEndElement.style.display = 'none';
      this.rightEndElement.style.width = 0;
      deletedRightEnd = true
    }
    return deletedRightEnd;
  }

  split(mainBlockWidth, rightEndWidth) {
    // modify main block
    this.element.style.display = 'block';
    this.element.style.width = mainBlockWidth + 'px';

    // create right-end, if it doesnt exist yet
    let createdRightEnd = false;
    if (!this.rightEndElement) {
      this.createRightEndElement();
      createdRightEnd = true;
    }

    // modify right end
    this.rightEndElement.style.display = 'block';
    this.rightEndElement.style.width = rightEndWidth + 'px';
    if (this.rightEndElement.firstElementChild) {
      this.rightEndElement.firstElementChild.style.marginLeft = -1 * mainBlockWidth + 'px'; // offset inner content by left-end's width
    }

    // report if a right end was created
    return createdRightEnd;
  }

  createRightEndElement() {
    let rightEnd = this.element.cloneNode(true);
    rightEnd.id = ('right-end-' + this.element.dataset.index);
    rightEnd.classList.add('right-end');
    rightEnd.classList.remove('main');
    this.element.insertAdjacentElement('afterend', rightEnd);
    this.rightEndElement = rightEnd;
  }
}

class NonImageBlock extends Block {
  // this.isOpen
  // this.leftEndElement
  // this.rightEndElement

  merge() {
    // console.log('merge');
    this.element.classList.remove('split');
    let deletedLeftEnd = false;
    let deletedRightEnd = false;
    if (this.leftEndElement) {
      this.leftEndElement.style.display = 'none';
      this.rightEndElement.style.width = 0;
      deletedLeftEnd = true
    }
    if (this.rightEndElement) {
      this.rightEndElement.style.display = 'none';
      this.rightEndElement.style.width = 0;
      deletedRightEnd = true
    }
    return [deletedLeftEnd, deletedRightEnd];
  }

  split(leftEndWidth, rightEndWidth) {
    let createdLeftEnd = false;
    let createdRightEnd = false;

    // create right-end, if it doesnt exist yet (need to create before left-end to insert in the proper order)
    if (!this.rightEndElement) {
      this.createRightEndElement();
      createdRightEnd = true;
    }

    // create left-end
    if (!this.leftEndElement) {
      this.createLeftEndElement();
      createdLeftEnd = true;
    }

    // modify left end
    this.leftEndElement.style.display = 'block';
    this.leftEndElement.style.width = leftEndWidth + 'px';

    // modify right end
    this.rightEndElement.style.display = 'block';
    this.rightEndElement.style.width = rightEndWidth + 'px';
    if (this.rightEndElement.firstElementChild) {
      this.rightEndElement.firstElementChild.style.marginLeft = -1 * leftEndWidth + 'px'; // offset inner content by left-end's width
    }

    // hide this element. it will be replaced by the ends
    this.element.classList.add('split');

    return [createdLeftEnd, createdRightEnd];
  }

  createLeftEndElement() {
    let leftEnd = this.element.cloneNode();
    leftEnd.id = ('left-end-' + this.element.dataset.index);
    leftEnd.classList.add('left-end');
    leftEnd.classList.remove('main');
    this.element.insertAdjacentElement('beforebegin', leftEnd);
    this.leftEndElement = leftEnd;
  }

  createRightEndElement() {
    let rightEnd = this.element.cloneNode();
    rightEnd.id = ('right-end-' + this.element.dataset.index);
    rightEnd.classList.add('right-end');
    rightEnd.classList.remove('main');
    this.element.insertAdjacentElement('afterend', rightEnd);
    this.rightEndElement = rightEnd;
  }

  open() {
    // only applies for non-image type
    if (this.type != 'non-image') return;
  
    this.isOpen = true;

    // create left- and right- ends if they don't exist yet
    if (!this.rightEndElement) this.createRightEndElement();
    if (!this.leftEndElement) this.createLeftEndElement();

    this.leftEndElement.style.display = 'block';
    this.leftEndElement.style.width = this.FF.rowWidth - this.x + 'px';

    this.rightEndElement.style.display = 'block';
    let rightEndElementWidth = parseFloat( this.rightEndElement.style.width );
    console.log(rightEndElementWidth);
    this.rightEndElement.style.width = rightEndElementWidth ? (rightEndElementWidth + 'px') : (this.x + this.originalWidth + 'px');
  }
}


/************************
 * FLEX FLOW CONTROLLER
 ************************/

// Class that augments a flexbox container so that elements are continuously wrapped without regard specific element boundaries
class FlexFlow {
  // Constructor accepts DOM element for examples div that contains block divs
  constructor( containerElement ) {
    this.containerElement = containerElement;
    this.blocks = [];
    this.initialize();
    this.reflow();
  }

  initialize() {
    this.containerElement.querySelectorAll('.block').forEach((blockElement, blockIndex) => {
      // get and store width
      let computedStyles = window.getComputedStyle( blockElement );
      const blockWidth = parseFloat( computedStyles.getPropertyValue('width') );
      blockElement.dataset.originalWidth = blockWidth;
      blockElement.dataset.index = blockIndex;
      
      // indicate that this is the main block
      blockElement.classList.add('main');

      let block;
      if (blockElement.classList.contains('image')) {
        block = new ImageBlock(blockElement, blockIndex, blockWidth, this);
      } else {
        block = new NonImageBlock(blockElement, blockIndex, blockWidth, this);
      }

      this.blocks.push(block);
    });
  }

  // Re-measures container and re-splits content blocks
  reflow() {
    // measure the container...
    // assume that container paddings are x, content margins are x (they are all equal)...
    // we have to double the computed value, since the space in between each item is twice their individual margins
    let computedStyles = window.getComputedStyle(this.containerElement);
    let containerWidth = parseFloat( computedStyles.getPropertyValue('width') );
    this.blockMargin = 2 * parseFloat( computedStyles.getPropertyValue('padding-left') );
    this.rowWidth = containerWidth - 2 * this.blockMargin;


    const isOpen = this.containerElement.classList.contains('open');

    // current horizontal position in row
    let x = 0;

    this.blocks.forEach(block => {
      block.element.dataset.x = x; // for testing
      block.x = x;

      // consider the space that the block can take up in this row (preflow width)
      // and the space that the block would take up in the next row (overflow width)
      const preflowWidth = Math.min(this.rowWidth - x, block.originalWidth);
      const overflowWidth = Math.max(0, block.originalWidth - preflowWidth);

      // Image Blocks
      if (block.type == 'image') {
        // if overflow width is 0, we don't need ends
        if (overflowWidth == 0) {
          block.merge(block);          
          x += preflowWidth + this.blockMargin; // increment x to consume space for full block
          if (x >= this.rowWidth) x = 0;
        }
        // if overflow width is positive, then we need to create or modify the ends
        else {
          let mainBlockWidth = preflowWidth;
          let rightEndWidth = overflowWidth;
          block.split(mainBlockWidth, rightEndWidth);
          x = rightEndWidth + this.blockMargin; // increment x for the right end in a new row
          if (x >= this.rowWidth) x = 0;
        }
      }

      if (block.type == 'non-image') {
        // if the system is closed (i.e. non-image blocks are blank)
        // then non-image block ends should be hidden when there is no overflow
        if (!isOpen && overflowWidth == 0) {
          block.merge(block);          
          x += preflowWidth + this.blockMargin; // increment x to consume space for full block
          if (x >= this.rowWidth) x = 0;
        }
        // if the system is open (i.e. non-image blocks are expanded) OR there is some overflow
        // then the non-image block ends should always be shown
        else {
          // this part is quite confusing... read carefully...
          // the left end takes up as much space as it can in the current row
          // the right end takes up additional space in the next row equal to the overflow
          // HOWEVER, if the system is closed and there is no overflow,
          // then the right end will create its own overflow amount, so that it takes up space up to the right edge
          let leftEndWidth = this.rowWidth - x; // remaining width in row
          let rightEndWidth = overflowWidth ? overflowWidth : (x + block.originalWidth);
          block.split(leftEndWidth, rightEndWidth);
          x = rightEndWidth + this.blockMargin; // increment x for the right end in a new row
          if (x >= this.rowWidth) x = 0;
        }
      }
    });
  }

  open() {
    this.containerElement.classList.add('open');
    this.reflow();
  }

  close() {
    this.containerElement.classList.remove('open');
    this.reflow();
  }

  toggle() {
    if (!this.containerElement.classList.contains('open')) {
      this.open();
      return true;
    } else {
      this.close();
      return false;
    }
  }

  // Cleanse: remove all right ends
  cleanse() {
    this.containerElement.querySelectorAll('.block.right-end').forEach(blockElement => {
      blockElement.remove();
    });
  }
}



/*****************
 * PAGE SCRIPTS
 *****************/

let examples = document.querySelector('.examples');
let FF;
window.addEventListener('load', () => {
  console.log('Page contents loaded');
  FF = new FlexFlow(examples);

  window.addEventListener('resize', () => {
    FF.reflow();
  });
});

// Hover effects for blank blocks
examples.addEventListener('mouseover', e => {
  if (e.target.classList.contains('non-image')) {
    examples.classList.add('mouseover-on-voids');
  }
  // else if (e.target.matches('img') && e.target.parentElement.matches('a')) {
  //   let blockElement = e.target.closest('.block');
  //   blockElement.classList.add('show-arrow');

  //   // get right-end and tell it to show arrow
  //   let rightEnd = document.getElementById('right-end-'+blockElement.dataset.index);
  //   if (rightEnd) rightEnd.classList.add('show-arrow');
  // }
});

// Hover effects for linked images
examples.addEventListener('mouseout', e => {
  if (e.target.classList.contains('non-image')) {
    examples.classList.remove('mouseover-on-voids');
  }
  // else if (e.target.matches('img') && e.target.parentElement.matches('a')) {
  //   let blockElement = e.target.closest('.block');
  //   blockElement.classList.remove('show-arrow');

  //   // get right-end and tell it to hide arrow
  //   let rightEnd = document.getElementById('right-end-'+blockElement.dataset.index);
  //   if (rightEnd) rightEnd.classList.remove('show-arrow');
  // }
});

examples.addEventListener('click', e => {
  if (e.target.classList.contains('non-image')) {
    let block = FF.blocks[ e.target.dataset.index ];
    let oldY = e.target.getBoundingClientRect().top;
    let isOpen = FF.toggle();
    let newY = isOpen ?
      block.leftEndElement.getBoundingClientRect().top :
      block.element.getBoundingClientRect().top;
    console.log(isOpen);
    window.scrollBy(0, newY - oldY);
  }
});