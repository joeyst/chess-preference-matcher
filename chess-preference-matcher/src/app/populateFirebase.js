
import { setDocData } from "./firebase"

const usersData = require('../data/users.json')

export default async function populateFirestore() {
  await Promise.all(
    usersData.map((userData, i) => setDocData('users', i.toString(), userData))
  )
}