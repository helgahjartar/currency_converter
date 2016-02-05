var CurrencyTable = (function () { 

	var currentData;

	// Sækir gögn frá apis
	function getData(source) {
		$('.loader').show();
		$.ajax({
			url: 'http://apis.is/currency/' + source,
			success: function(data) {
				currentData = data;
				parseCurrency();
				loaderDone();
			}
		});
	}

	// Felur loader texta
	function loaderDone() { 
		$('.loader').hide();
	}

	// Stýrir carousel 
	 $(document).ready(function(){
	    $('.carousel').carousel();
	  });

	// Býr til töflu með gögnunum sem sótt eru
	function parseCurrency() {
		var container = []; 
		container = $('.currency-data');
		var results = currentData.results;
		container.html('');
			
		for (var i = 0; i < results.length; i++) {
			var row = $('<tr></tr>');
			$('<td><strong>' + results[i].shortName + '</strong></td>').appendTo(row);
			$('<td>' + results[i].longName + '</td>').appendTo(row);
			$('<td>' +  formatNr(results[i].changeCur, null) +'</td>').appendTo(row);
			$('<td>' + formatNr(results[i].value, null) + '</td>').appendTo(row);

			var input = $('<input type="text"></input>');
			input.val(formatNr(1000/results[i].value, results[i].shortName == 'ISK'));
			input.change(updateCurrency);
			input.attr('curr-value', results[i].value.toString());
			input.addClass('curr-input');

			var td = $('<td></td>');
			input.appendTo(td);
			td.appendTo(row);
			container.append(row);
		}
	}

	// Reiknar gengi 
	function updateCurrency(e) {
		var prevValue = parseFloat($(this).attr('curr-value')) * parseFloat($(this).val());
		var currInput = $('.curr-input');

		for (var i = 0; i < currInput.length; i++) {
			var nr = parseFloat($(currInput[i]).attr('curr-value'));
				$(currInput[i]).val(formatNr(prevValue/nr, nr == 1));
		}
	}

	// Sníður input tölurnar
	function formatNr(nr, isKr) {
		if(isNaN(nr) || nr === null)
			return 0;
		if(isKr || nr - Math.floor(nr) == 0)
			return Math.floor(nr)
		else
			return nr.toFixed(2);
		}

	// Setur upphafssíðu með fyrstu gögnunum
	function init() {
		$('a').click(function() {
			getData(this.dataset.source);
		});
		getData('m5');
		}
		return {
			init:init
		};

})();

CurrencyTable.init();
