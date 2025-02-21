
import { db } from '../firebase'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc
} from 'firebase/firestore'


// Listen for commands from master
const commandsQuery = query(
  collection(db, 'commands'),
  where('status', '==', 'pending')
)

onSnapshot(commandsQuery, (snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === 'added') {
      const command = change.doc.data()
      console.log('Received command from master:', command)

      // Process command
      const result = await processCommand(command)

      // Send response back to master
      const responsesRef = collection(db, 'responses')
      await addDoc(responsesRef, {
        commandId: change.doc.id,
        result,
        timestamp: new Date(),
        status: 'pending',
        sender: 'slave'
      })

      // Mark command as processed
      await updateDoc(doc(db, 'commands', change.doc.id), {
        status: 'processed'
      })
    }
  })
})

async function processCommand(command: any) {
  // Implement your command processing logic here
  chrome.runtime.sendMessage({ type: 'COMMAND_RECEIVED', payload: command })
  return `Processed command: ${command.command}`

}
export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});
