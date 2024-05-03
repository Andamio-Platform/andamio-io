export default function AccessTokenList() {
    return (
        <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
            <h1>List of Access Tokens</h1>
        </div>
    )
}


// For reference (2024-04-05):

// import { useEffect, useState } from "react";

// export default function ListComponent() {
//   const [strings, setStrings] = useState([]);

//   useEffect(() => {
//     // Define your GET endpoint URL
//     const endpoint = "http://34.72.237.49:1618/andamio/names";

//     fetch(endpoint)
//       .then((res) => res.json())
//       .then((data) => {
//         // Handle the response and set the strings state
//         setStrings(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching strings:", err);
//       });
//   }, []);

//   return (
//     <div>
//       {strings.map((string) => (
//         <p key={string}>{string}</p>
//       ))}
//     </div>
//   );
// }