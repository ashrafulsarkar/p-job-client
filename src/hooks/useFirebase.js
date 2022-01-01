import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import inisializeAthentication from "../components/Login/Firebase/firebase.init";

inisializeAthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [redLocation, setRedLocation] = useState(false);
    const [role, setRole] = useState(null);

    const auth = getAuth();


    /**
     * create new User 
     */
     const createUser = ( data, displayName, email, password, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            setError('');
            updateProfile(auth.currentUser, {
                displayName: displayName,
              }).then(() => {
                  saveuserInfoDB(data);
                  setUser(result.user);
              }).catch((error) => {
                // An error occurred
                // ...
            });
            history.push('/dashboard');
        })
        .catch((error) => {
            setError(error.message);
        }).finally(()=> setIsLoading(false));
    }

    /**
     * save user information into database 
     */
     const saveuserInfoDB = (data)=>{
        setIsLoading(true);
        delete data.password;
        delete data.repassword;
        const user = data;
        fetch('https://afternoon-garden-42898.herokuapp.com/user',{
            method: 'POST',
            body: user
        })
        .then().finally(()=> setIsLoading(false));
     }

    /**
     * userLogin 
     */
     const userLogin = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            setUser(result.user);
            setError('');
            setRedLocation(true);
        })
        .catch((error) => {
            setError(error.message);
        }).finally(()=> setIsLoading(false));
    }

    useEffect(()=>{
        setIsLoading(true);
        fetch(`https://afternoon-garden-42898.herokuapp.com/user/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            const role = data[0].role;
            setRole(role);
            setUserData(data);
        }).finally(()=> setIsLoading(false));
    },[user]);

    /**
     * redirect url
     */
    const handleredLocation = () =>{
        setRedLocation(false);
    }

    
    /**
     * on Auth State Changed
     */
    useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    },[])

    /**
     * logout system
     */
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setRole(null);
        }).finally(()=> setIsLoading(false));
    }

    return {
        user,
        error,
        userLogin,
        createUser,
        logOut,
        isLoading,
        redLocation,
        handleredLocation,
        role,
        userData
    }
}

export default useFirebase;