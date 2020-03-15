import { MongoClient } from 'mongodb'

export const mongo = {

}

export default async function mongoToContext (state) {
  if (!mongo.db) {
    await mongoConnect()
  }
  state.mongo = mongo.db
}

async function mongoConnect () {
  if (mongo.db) {
    return
  }

  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch((e) => {
    console.log('Mongo Error:', e)
    process.exit(1)
  })

  console.log('connected with the database')

  mongo.db = client.db()

  mongo.db.on('close', function () {
    mongo.db = false
    mongoConnect()
  })

  mongo.db.on('ontimeout', function () {
    mongo.db = false
    mongoConnect()
  })
}

mongoConnect()
