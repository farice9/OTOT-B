import WorkoutForm from "./WorkoutForm";
import AppBar from "./appbar";
import WorkoutTable from "./WorkoutTable";
import Weather from "./Weather";

function App() {
  return (
    <div>
      <AppBar></AppBar>
      <Weather></Weather>
      <WorkoutForm></WorkoutForm>
      <WorkoutTable></WorkoutTable>
    </div>
  );
}

export default App;
