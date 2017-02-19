# flashcards

- Two kinds of flashcards, basic and cloze.
- For basic:
	inquirer prompt that asks if user wants to add a card or play.		
			user selects add:
				inquirer prompt asks for the front (clue)					
				inquirer prompt asks for the back (answer)
					save text of response as 'cardFront' and 'cardBack' object
					stringify object and push to array 'flashcards'
			user selects play:
				console.log front of the first card
				inquirer prompt 'ready to see the answer?'
					console log back of first card
				inquirer prompt 'next card'?
					if Y, repeat process for second card
					if N, console log goodbye

- For Cloze:
	inquirer prompt that asks if user wants to add a card or play.	
		user selects add:
			inquirer prompt asks for the whole sentence
					save text of response as 'clozeCard'
					stringify object and push to array 'flashcards'
		user selects play:
			function to console log "... was the"
			inquirer prompt 'ready to see the answer?'
				console.log whole sentence
				inquirer prompt 'next card'?
					if Y, repeat process for second card
					if N, console log goodbye