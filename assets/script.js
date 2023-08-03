document.addEventListener("DOMContentLoaded", () => {
    // QUERY SELECTOR
    const select = (selector, scope = document) => {
        return scope.querySelector(selector);
    };
    const selectAll = (selector, scope = document) => {
        return scope.querySelectorAll(selector);
    };
  
    // ACCORDION
    var acc = document.getElementsByClassName("item-name");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }


    // FILTER
    const itemCards = selectAll('.item-card');

		select('nav').addEventListener('click', event => {
			if (event.target.tagName !== 'LI') return false;
			let filterClass = event.target.dataset['filter'];
			itemCards.forEach( elem => {
				elem.classList.remove('hide');
				if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
					elem.classList.add('hide');
				}
			})
		})

    // SEARCH
    const searchInput = select("#search");

    searchInput.addEventListener('input', (e) => {
      const searchValue = e.target.value.toLowerCase().trim();

      itemCards.forEach( elem => {
        !elem.dataset.name.toLowerCase().includes(searchValue) ?
        elem.classList.add('hide') :
        elem.classList.remove('hide');
			})
    })

    // STICKY CONTROL PANEL
    const controlPanel = select(".control-panel");
    let stop = controlPanel.offsetTop;
    let docBody = document.documentElement || document.body.parentNode || document.body;
    let hasOffset = window.pageYOffset !== undefined;
    let scrollTop;

    window.addEventListener('scroll', (e) => {
      scrollTop = hasOffset ? window.pageYOffset : docBody.scrollTop;

      scrollTop >= stop ? 
      controlPanel.classList.add('sticky') :
      controlPanel.classList.remove('sticky');
    })

    /*==== Copy ===================*/
    const codePanel = selectAll('.code-panel');

    codePanel.forEach((panel) => {
      const btn = document.createElement('button');
      btn.classList.add('copy-btn');
      btn.title = 'Click to copy';
      panel.prepend(btn);
    });

    const copyBtn = selectAll('.copy-btn');

    copyBtn.forEach((el) => {
      el.addEventListener('click', () => {
        const copyText = el.nextElementSibling.querySelector('code').innerText;
        copyToClipboard(copyText);
        el.classList.add('active');
        setTimeout(() => {
          el.classList.remove('active');
        }, 1500);
      })
    });

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Copied!');
        })
        .catch((error) => {
          console.error(`Copy failed - ${error}`);
        })
    };

});

