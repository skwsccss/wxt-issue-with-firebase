
import { app, db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore'

// Function to send commands to slave
export async function sendCommandToSlave(command: any) {
  try {
    const commandsRef = collection(db, 'commands')
    await addDoc(commandsRef, {
      command,
      timestamp: new Date(),
      status: 'pending',
      sender: 'master'
    })
  } catch (error) {
    console.error('Error sending command:', error)
  }
}



export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  // Listen for slave responses
  const responsesQuery = query(
    collection(db, 'responses'),
    where('status', '==', 'pending')
  )

  onSnapshot(responsesQuery, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        const response = change.doc.data()
        console.log('Received response from slave:', response)

        // Mark response as processed
        await updateDoc(doc(db, 'responses', change.doc.id), {
          status: 'processed'
        })

        // Handle response in your React components
        chrome.runtime.sendMessage({
          type: 'SLAVE_RESPONSE',
          payload: response
        })
      }
    })
  });
  
  return {
    sendCommandToSlave
  }
});
