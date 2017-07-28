
export default class OrderingService {
  allOrderedElements:any;
  constructor(allOrderedElements) {
    this.allOrderedElements = allOrderedElements;
  }
  // get ordered elements
  // initiate ordering
  initiateOrdering() {
    let allOrdered = this.allOrderedElements
    return allOrdered.map(c => {
      c['order'] = allOrdered.indexOf(c)+1;
      return c; 
    })
  }
  getFirstOrder = ():number => {
    if (this.allOrderedElements.length > 0) {   
      return Math.min(...this.allOrderedElements.map(o => o.order))
    } else { return 0 }
  }
  getLastOrder = ():number => {
    if (this.allOrderedElements.length > 0) {   
      return Math.max(...this.allOrderedElements.map(o => o.order))
    } else { return 0 }
  }
  // move on n-th position && update all others ordered elements
  changeOrdering(from, to) {
    let allOrdered = this.allOrderedElements
    // [1,2,3,4]
    // 3 -> 1
    // get all after 1 but before 4 [1,2] => [2,3]
    //service.save()


    let firstOrder = this.getFirstOrder();
    let lastOrder = this.getLastOrder();
    return allOrdered.map(c => {
      if (from == c.order) { // target
        c.order = to;
      } else {
        if (c.order >= to) {
          c.order = c.order + 1; 
        }
        if (c.order > from && c.order !== 1) {
          c.order = c.order - 1; 
        }        
      }
      return c;
    })

  }
}

const a = function() {
const t = new OrderingService([
  {title: 'c1', order:1},
  {title: 'c2', order:1},
  {title: 'c3', order:1},
  {title: 'c4', order:1},
  {title: 'c5', order:1},
  {title: 'c6', order:1}])
 const tt = t.initiateOrdering()
 //console.log('tt',tt);
 const ttt = t.changeOrdering(3, 1)
 //console.log('ttt 3 -> 1',tt.sort((c,b) => c.order - b.order));

//console.log('\n\n');
//console.log(t.allOrderedElements.sort((c,b) => c.order - b.order));
// console.log('ttt 6 -> 1',t.changeOrdering(6,1).sort((c,b) => c.order - b.order));

}

//console.log('test', a());