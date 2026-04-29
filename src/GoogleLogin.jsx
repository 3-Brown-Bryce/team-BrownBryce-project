import { useEffect, useState } from 'react';
import { db, auth, provider } from './firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { collection, getDocs } from 'firebase/firestore';
//We have to have a firebase based user collection system in order for the award claiming firebase to work
//this is part of that code
import { doc, setdoc, getDoc } from 'firebase/firestore';

function GoogleLogin() { 
  const [user, setUser] = useState(null);

  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe();
  }, []);

    const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider); 
    } catch (error) {
      console.error('Login failed', error); 
    }

    //also part of the user collection code
    const userDocRef = doc(db, users, user.uid);

    //user collection code
    const docSnap = await getDoc(userDocRef);

    //user collection field code
    if(!docSnap.exists()){
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      console.log("New user created in Firestore");
    }else{
      await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
      console.log("Existing user data found:", docSnap.data());
    }
    
  };

   const handleLogout = async () => {
    try {
      await signOut(auth); 
      setUser(null); 
    } catch (error) {
      console.error('Logout failed', error); 
    }
  };

  const fetchMessages = async () => {
    const snapshot = await getDocs(collection(db, 'messages')); 
    const list = snapshot.docs.map(doc => doc.data()); 
    setMessages(list); 
  };

  const sendMessage = async () => {
    if (!input.trim()) return; 

    await addDoc(collection(db, 'messages'), {
      text: input,
      name: user.displayName,
      timestamp: Date.now()
    });

    setInput(''); 
    fetchMessages(); 
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

//   UI!!!

  return (
     <div>
        {/* if logged user */}
      {user ? (
        <div>
          <h2>Hello, {user.displayName}</h2>
          <button onClick={handleLogout}>Log Out</button>

          <ul>
            {messages.map((msg, i) => (
              <li key={i}>
                <strong>{msg.name || 'Anon'}:</strong> {msg.text}
              </li>
            ))}
          </ul>
        </div>
      ) : ( 
        // sign in, no user
        <div>
          <p>Please log in with Google to continue.</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}

     </div>
  );
}

export default GoogleLogin;