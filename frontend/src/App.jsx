import {
  Header,
  ProfileHeader,
  GamesSummary,
  ProfileBody,
  DailyPuzzle,
  AnalyticsSection,
  Empty,
  Footer,
} from './components';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header title="Pawn Chazer" />

      <ProfileHeader
        username="metastab"
        realName="original name"
        avatarSrc="/placeholder.jpg"
        rating={1211}
        peakRating={1444}
        gameType="Rapid"
      />

      <GamesSummary />
      <ProfileBody />
      <DailyPuzzle />
      <AnalyticsSection />
      <Empty />
      <Footer />
    </div>
  );
}

export default App;
