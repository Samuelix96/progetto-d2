import React, {useState, useEffect, createContext,} from "react";

export const PostProvider = createContext()

export  const PostContext = ({children} ) => {

  const [selected, setSelected] = useState(false);  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])



  const getBooksFromApi = async() => {

    setLoading(true)    
    try {
      const response = await fetch('https://epibooks.onrender.com')
      const data = await response.json()
      

      setBooks(data)
      setLoading(false)
      setFilteredBooks(data)

    } catch (e) {
      setErrors(e)
      console.log("APi not Found in Error " , e);
    }
  }
useEffect(() => {
  getBooksFromApi();
}, []);


  return(
    <>
      <PostProvider.Provider value={{  filteredBooks, setFilteredBooks, books,setBooks, loading , setLoading, errors, setErrors, selected, setSelected, getBooksFromApi}}>
          {children}
      </PostProvider.Provider>
    </>
  )

}

export default PostContext;
