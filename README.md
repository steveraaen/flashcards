# flashcards

This is a command line interface.  Use argv[2] = 'b' construct a basic card, 
and argv[2] = 'c' for a cloze card.  Prototype function MakeCloze.prototype.clozeOnly
creates the cloze deleted text and adds it as a proto property (as well as the cloze 
and full text).  Function cToB uses those proto properties to build a new basic card 
with only front and back properties. So that function writeCard is used to add all
cards, regardless of how they were created to the same 'cards.txt' file