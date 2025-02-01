deploy:
	npm	run	build
	firebase deploy
	npm run test
