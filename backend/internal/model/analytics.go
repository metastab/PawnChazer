package model

type Analytics struct {
	GamesWon  int `bson:"gamesWon" json:"gamesWon"`
	GamesLost int `bson:"gamesLost" json:"gamesLost"`
}

func (a Analytics) WinPercent() float32 {
	total := a.GamesWon + a.GamesLost
	if total == 0 {
		return 0
	}
	return float32(a.GamesWon) / float32(total) * 100
}