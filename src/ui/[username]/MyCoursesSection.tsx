export default function MyCoursesSection() {
  const localStates = [];
  const numLocalStates = localStates.length;
  return (
    <div>
      <h1 className="flex items-center justify-center">My courses</h1>

      {/* TO-DO: Query local state corresponding to the user's access token */}
      {numLocalStates !== 0 ? (
        <div>{/* Implement logic here */}</div>
      ) : (
        <p>You have not registered with any courses on-chain</p>
      )}
    </div>
  );
}
