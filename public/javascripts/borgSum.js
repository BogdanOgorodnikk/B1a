function sum(borgItem, borgSum) {
    for(var i = 0; i < borgItem.length; i++) {
      borgSum += +borgItem[i].innerHTML;
    }
    return borgSum;
  }
  
  var borgSumItem = document.querySelectorAll(".borg__item--borg-sum");
  var borgSumItemClient = document.querySelectorAll(".borg__item--client-sum");
  var borgSumItemSell = document.querySelectorAll(".borg__item--sell-sum");
  
  var outBorg = document.querySelector("#client-product__line--borg-out");
  var outClient = document.querySelector("#client-product__line--client-out");
  var outSell = document.querySelector("#client-product__line--sell-out");
  
  var borgSum = 0;
  var borgSumClient = 0;
  var borgSumSell = 0;
  
  borgSum = sum(borgSumItem, borgSum);
  borgSumClient = sum(borgSumItemClient, borgSumClient);
  borgSumSell = sum(borgSumItemSell, borgSumSell);
  
  function abc2(n) {
        n += "";
        n = new Array(4 - n.length % 3).join("U") + n;
        return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
    }
  
  outBorg.innerHTML = abc2(borgSum);
  outClient.innerHTML = abc2(borgSumClient);
  outSell.innerHTML = abc2(borgSumSell);

