source ../.env
npx now secret add mongo_url $MONGO_URL
npx now secret add hash_secret $HASH_SECRET
npx now secret add jwt_secret $JWT_SECRET
