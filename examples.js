// Class that augments a flexbox container so that elements are continuously wrapped without regard specific element boundaries
// By Taichi Aritomo
class FlexFlow {
  // Constructor accepts DOM element for examples div that contains block divs
  constructor( containerElement ) {
    this.containerElement = containerElement;
    this.initialize();
    this.reflow();
  }

  initialize() {
    this.containerElement.querySelectorAll('.block').forEach((blockElement, blockIndex) => {
      let computedStyles = window.getComputedStyle( blockElement );
      blockElement.dataset.index = blockIndex;
      blockElement.dataset.originalWidth = parseFloat( computedStyles.getPropertyValue('width') );
    });
  }

  // Re-measures container and re-splits content blocks
  reflow() {
    let computedStyles = window.getComputedStyle(this.containerElement);
    let containerWidth = parseFloat( computedStyles.getPropertyValue('width') );
    
    // assume that container paddings are x, content margins are x (they are all equal)...
    // we have to double the computed value, since the space in between each item is twice their individual margins
    let blockMargin = 2*parseFloat( computedStyles.getPropertyValue('padding-left') );
    let rowWidth = containerWidth - 2 * blockMargin;

    // this.cleanse();

    // current horizontal position in row
    let x = 0;

    // Iterate through each block element
    let blockElements = Array.from(this.containerElement.querySelectorAll('.block'));
    for (let i = 0; i < blockElements.length; i++) {

      let blockElement = blockElements[i];

      // Save block element's x position
      blockElement.dataset.x = x;

      // If this block element is a right segment, skip it...
      if (blockElement.classList.contains('right-segment')) {
        let blockWidth = parseFloat( blockElement.style.width );
        x += blockWidth + blockMargin; // move x
      }

      // If this block element is not a right segment, compute...
      else {
        let originalBlockWidth = blockElement.dataset.originalWidth;

        // compute this block / left segment's width
        let blockWidth = Math.min(Math.floor(rowWidth - x), originalBlockWidth);
        let leftSegmentWidth = blockWidth;
        blockElement.style.width = leftSegmentWidth + 'px';

        // handle right segment
        let rightSegmentWidth = Math.max(0, originalBlockWidth - leftSegmentWidth);
        let rightSegment = document.getElementById('right-segment-' + blockElement.dataset.index);
        
        // if there is no right segment needed in this reflow...
        if (rightSegmentWidth == 0) {
          // delete any existing one
          if (rightSegment) {
            rightSegment.remove();
            blockElements.splice(i+1, 1); // remove the rightSegment from the list of block elements so it doesn't get processed in the next loop pass
          }

          // un-designate this block as a left segment
          blockElement.classList.remove('left-segment');
        }
        
        // if there is a right segment needed in this reflow, create one or modify it
        else {
          // create right segment if it doesnt exist
          if (!rightSegment) {
            rightSegment = blockElement.cloneNode(true);
            rightSegment.id = ('right-segment-' + blockElement.dataset.index);
            rightSegment.classList.add('right-segment');
            blockElement.insertAdjacentElement('afterend', rightSegment);
            blockElements.splice(i+1, 0, rightSegment); // add the rightSegment to the list of block elements to process it in the next loop pass
          }
          
          // apply offsets
          rightSegment.style.width = rightSegmentWidth + 'px';
          if (rightSegment.firstElementChild) { rightSegment.firstElementChild.style.marginLeft = -1 * leftSegmentWidth + 'px'; } // offset content to the left
          
          // designate this block as a left segment
          blockElement.classList.add('left-segment');
        }

        // move x
        x += blockWidth + blockMargin;
      }

      // move x and reset it if necessary
      if (x > rowWidth) x = 0;
    };
  }

  // Cleanse: remove all right segments
  cleanse() {
    this.containerElement.querySelectorAll('.block.right-segment').forEach(blockElement => {
      blockElement.remove();
    });
  }
}

let examples = document.querySelector('.examples');
window.addEventListener('load', () => {
  console.log('Page contents loaded');
  let FF = new FlexFlow(examples);

  window.addEventListener('resize', () => {
    FF.reflow();
  })
});

// examples.querySelectorAll('.block.non-image').forEach(blockElement => {
//   blockElement.addEventListener('mouseover', (e) => {
//     examples.classList.add('mouseover-on-voids');
//   });
//   blockElement.addEventListener('mouseout', (e) => {
//     examples.classList.remove('mouseover-on-voids');
//   });
//   blockElement.addEventListener('mousedown', (e) => {
//     examples.classList.add('mousedown-on-voids');
//   });
//   blockElement.addEventListener('mouseup', (e) => {
//     examples.classList.remove('mousedown-on-voids');
//   });
// });

// Hover effects for non-image blocks
examples.addEventListener('mouseover', e => {
  if (e.target.classList.contains('non-image')) {
    examples.classList.add('mouseover-on-voids');
  }
  else if (e.target.matches('img') && e.target.parentElement.matches('a')) {
    let blockElement = e.target.closest('.block');
    blockElement.classList.add('show-arrow');
    // if hovering over a left segment, get right-segment and tell it to show arrow
    if (blockElement.classList.contains('left-segment')) {
      let rightSegment = document.getElementById('right-segment-'+blockElement.dataset.index);
      rightSegment.classList.add('show-arrow');
    }
  }
});
examples.addEventListener('mouseout', e => {
  if (e.target.classList.contains('non-image')) {
    examples.classList.remove('mouseover-on-voids');
  }
  else if (e.target.matches('img') && e.target.parentElement.matches('a')) {
    let blockElement = e.target.closest('.block');
    blockElement.classList.remove('show-arrow');
    // if hovering over a left segment, get right-segment and tell it to show arrow
    if (blockElement.classList.contains('left-segment')) {
      let rightSegment = document.getElementById('right-segment-'+blockElement.dataset.index);
      rightSegment.classList.remove('show-arrow');
    }
  }
});
// examples.addEventListener('mousedown', e => {
//   if (e.target.classList.contains('non-image')) {
//     examples.classList.add('mousedown-on-voids');
//   }
// });
// examples.addEventListener('mouseup', e => {
//   if (e.target.classList.contains('non-image')) {
//     examples.classList.remove('mousedown-on-voids');
//   }
// });