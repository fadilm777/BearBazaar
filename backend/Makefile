
setup: clean
	echo "DATABASE_URL="file:./dev.db"" > .env
	npm install
	npx prisma db push
	npm run dev

clean:
	rm -rf node_modules
	rm -rf .env
