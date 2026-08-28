/**
 * PGN Parser and Chess Move Time Calculator
 * Parses standard PGN strings, extracts metadata, move pairs, clock timestamps,
 * and calculates time spent per move.
 */

export const SAMPLE_PGNS = {
  rapid_championship: `[Event "Live Chess - Rapid 10 min"]
[Site "PawnChazer"]
[Date "2026.08.28"]
[White "ShmatokSala"]
[Black "metastab"]
[Result "0-1"]
[WhiteElo "1144"]
[BlackElo "1180"]
[TimeControl "600"]
[Termination "metastab won by resignation"]

1. d3 {[%clk 0:09:58.4]} 1... d5 {[%clk 0:09:57.0]} 
2. Nd2 {[%clk 0:09:52.0]} 2... Nf6 {[%clk 0:09:53.7]} 
3. e4 {[%clk 0:09:50.9]} 3... dxe4 {[%clk 0:09:51.0]} 
4. Nxe4 {[%clk 0:09:04.7]} 4... Nxe4 {[%clk 0:09:42.9]} 
5. dxe4 {[%clk 0:09:04.6]} 5... Qxd1+ {[%clk 0:09:41.4]} 
6. Kxd1 {[%clk 0:09:04.5]} 6... e5 {[%clk 0:09:40.4]} 
7. g3 {[%clk 0:09:01.8]} 7... Bc5 {[%clk 0:09:31.8]} 
8. Ke1 {[%clk 0:08:52.4]} 8... O-O {[%clk 0:09:17.1]} 
9. Nf3 {[%clk 0:08:51.5]} 9... Nc6 {[%clk 0:09:13.5]} 
10. b3 {[%clk 0:08:16.4]} 10... Bb4 {[%clk 0:09:01.6]} 
11. Bd2 {[%clk 0:07:57.8]} 11... Rd8+ {[%clk 0:08:40.3]} 
12. Kc3 {[%clk 0:07:55.4]} 12... a5 {[%clk 0:08:02.1]} 
13. Nxe5 {[%clk 0:07:50.0]} 13... Bd4+ {[%clk 0:08:00.0]} 
14. Kc4 {[%clk 0:07:35.9]} 14... Bxa1 {[%clk 0:07:05.7]} 
15. Bg5 {[%clk 0:07:31.5]} 15... Bd4+ {[%clk 0:06:58.9]} 
16. Kb5 {[%clk 0:07:23.5]} 16... c6+ {[%clk 0:06:49.5]} 
17. Kb6 {[%clk 0:07:21.8]} 17... Nxe4 {[%clk 0:06:37.4]}
0-1`,

  immortal_game: `[Event "London Casual Game"]
[Site "London ENG"]
[Date "1851.06.21"]
[White "Adolf Anderssen"]
[Black "Lionel Kieseritzky"]
[Result "1-0"]
[WhiteElo "2600"]
[BlackElo "2550"]
[TimeControl "900"]

1. e4 {[%clk 0:14:58.2]} 1... e5 {[%clk 0:14:57.0]}
2. f4 {[%clk 0:14:52.1]} 2... exf4 {[%clk 0:14:48.5]}
3. Bc4 {[%clk 0:14:45.0]} 3... Qh4+ {[%clk 0:14:40.2]}
4. Kf1 {[%clk 0:14:39.1]} 4... b5 {[%clk 0:14:28.0]}
5. Bxb5 {[%clk 0:14:25.4]} 5... Nf6 {[%clk 0:14:15.8]}
6. Nf3 {[%clk 0:14:18.0]} 6... Qh6 {[%clk 0:14:02.4]}
7. d3 {[%clk 0:14:08.5]} 7... Nh5 {[%clk 0:13:45.0]}
8. Nh4 {[%clk 0:13:50.2]} 8... Qg5 {[%clk 0:13:20.1]}
9. Nf5 {[%clk 0:13:30.0]} 9... c6 {[%clk 0:13:02.3]}
10. g4 {[%clk 0:13:10.5]} 10... Nf6 {[%clk 0:12:44.0]}
1-0`,

  speed_blitz: `[Event "SCC Blitz Match"]
[Site "PawnChazer"]
[Date "2026.08.20"]
[White "Magnus Carlsen"]
[Black "Hikaru Nakamura"]
[Result "1/2-1/2"]
[WhiteElo "2830"]
[BlackElo "2875"]
[TimeControl "180+1"]

1. e4 {[%clk 0:02:59.5]} 1... c5 {[%clk 0:02:58.8]}
2. Nf3 {[%clk 0:02:59.0]} 2... d6 {[%clk 0:02:58.1]}
3. d4 {[%clk 0:02:57.8]} 3... cxd4 {[%clk 0:02:57.4]}
4. Nxd4 {[%clk 0:02:57.0]} 4... Nf6 {[%clk 0:02:56.5]}
5. Nc3 {[%clk 0:02:56.2]} 5... a6 {[%clk 0:02:55.0]}
6. Be3 {[%clk 0:02:53.4]} 6... e5 {[%clk 0:02:52.1]}
7. Nb3 {[%clk 0:02:51.0]} 7... Be6 {[%clk 0:02:49.8]}
8. f3 {[%clk 0:02:48.5]} 8... Be7 {[%clk 0:02:46.0]}
1/2-1/2`
};

/**
 * Converts piece prefix character into nice unicode glyph or clean display
 */
export function formatSanPiece(san) {
  if (!san) return { symbol: '', move: '' };
  
  const pieceMap = {
    'N': '♘',
    'B': '♗',
    'R': '♖',
    'Q': '♕',
    'K': '♔'
  };

  const firstChar = san.charAt(0);
  if (pieceMap[firstChar]) {
    return {
      symbol: pieceMap[firstChar],
      move: san.substring(1)
    };
  }

  // Pawn move or Castling (O-O)
  return {
    symbol: '',
    move: san
  };
}

/**
 * Convert clock string e.g. "0:09:58.4" or "9:58.4" to total seconds
 */
export function parseClockToSeconds(clockStr) {
  if (!clockStr) return null;
  const cleaned = clockStr.replace(/[^\d:.]/g, '');
  const parts = cleaned.split(':');
  
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]) || 0;
    const mins = parseFloat(parts[1]) || 0;
    const secs = parseFloat(parts[2]) || 0;
    return hours * 3600 + mins * 60 + secs;
  } else if (parts.length === 2) {
    const mins = parseFloat(parts[0]) || 0;
    const secs = parseFloat(parts[1]) || 0;
    return mins * 60 + secs;
  } else if (parts.length === 1) {
    return parseFloat(parts[0]) || 0;
  }
  return null;
}

/**
 * Formats seconds into clean representation e.g. "1.6s", "46.2s", "1m 12s"
 */
export function formatTimeSpent(seconds) {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return null;
  if (seconds < 0) seconds = Math.abs(seconds);
  
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const mins = Math.floor(seconds / 60);
  const remSecs = Math.round(seconds % 60);
  return `${mins}m ${remSecs}s`;
}

/**
 * Parse full PGN text into structured game object
 */
export function parsePgn(pgnText) {
  if (!pgnText || typeof pgnText !== 'string') {
    return {
      headers: {},
      moves: [],
      result: '*',
      totalTimeSpentWhite: 0,
      totalTimeSpentBlack: 0,
      maxMoveTime: 1
    };
  }

  const headers = {};
  const headerRegex = /\[(\w+)\s+"([^"]*)"\]/g;
  let match;
  while ((match = headerRegex.exec(pgnText)) !== null) {
    headers[match[1]] = match[2];
  }

  // Remove header lines to get moves body
  const bodyText = pgnText.replace(/\[[^\]]*\]/g, ' ').trim();

  // Extract initial clock from TimeControl if present
  let initialTimeSecs = 600; // default 10 min
  if (headers.TimeControl) {
    const baseTime = parseInt(headers.TimeControl, 10);
    if (!isNaN(baseTime) && baseTime > 0) {
      initialTimeSecs = baseTime;
    }
  }

  // Tokenize moves and comments
  // Matches: 1. or 1... or move SAN or {comments} or results
  const tokenRegex = /(\d+\.+)|(\{[^}]*\})|([KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?[+#]?|O-O-O[+#]?|O-O[+#]?)|(1-0|0-1|1\/2-1\/2|\*)/g;
  
  const rawTokens = [];
  let tokenMatch;
  while ((tokenMatch = tokenRegex.exec(bodyText)) !== null) {
    const val = tokenMatch[0];
    if (val) rawTokens.push(val);
  }

  const moves = [];
  let currentMoveNumber = 1;
  let currentMoveObj = null;
  let isWhiteTurn = true;

  let prevWhiteClock = initialTimeSecs;
  let prevBlackClock = initialTimeSecs;
  let maxMoveTime = 0.5;

  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i];

    // Move number e.g. "1." or "1..."
    if (/^\d+\.+$/.test(token)) {
      const num = parseInt(token, 10);
      if (!token.includes('...')) {
        currentMoveNumber = num;
        currentMoveObj = {
          number: currentMoveNumber,
          white: null,
          black: null
        };
        moves.push(currentMoveObj);
        isWhiteTurn = true;
      } else {
        isWhiteTurn = false;
      }
      continue;
    }

    // Comment with clock or annotation e.g. {[%clk 0:09:58.4]}
    if (token.startsWith('{') && token.endsWith('}')) {
      const commentContent = token.slice(1, -1);
      const clkMatch = /\[%clk\s+([\d:.]+)\]/.exec(commentContent);
      const evalMatch = /\[%eval\s+([^\]]+)\]/.exec(commentContent);

      const targetMove = isWhiteTurn 
        ? (currentMoveObj?.white || moves[moves.length - 1]?.white)
        : (currentMoveObj?.black || moves[moves.length - 1]?.black);

      if (targetMove) {
        if (clkMatch) {
          targetMove.clock = clkMatch[1];
          const currSecs = parseClockToSeconds(clkMatch[1]);
          if (currSecs !== null) {
            targetMove.clockSeconds = currSecs;
            if (targetMove.isWhite) {
              const diff = prevWhiteClock - currSecs;
              targetMove.timeSpent = diff >= 0 ? diff : 1.0;
              prevWhiteClock = currSecs;
            } else {
              const diff = prevBlackClock - currSecs;
              targetMove.timeSpent = diff >= 0 ? diff : 1.0;
              prevBlackClock = currSecs;
            }
            if (targetMove.timeSpent > maxMoveTime) {
              maxMoveTime = targetMove.timeSpent;
            }
          }
        }
        if (evalMatch) {
          targetMove.evaluation = evalMatch[1];
        }
        targetMove.comment = commentContent;
      }
      continue;
    }

    // Game end result
    if (/^(1-0|0-1|1\/2-1\/2|\*)$/.test(token)) {
      headers.Result = token;
      continue;
    }

    // Chess move token (SAN)
    if (!currentMoveObj) {
      currentMoveObj = {
        number: currentMoveNumber,
        white: null,
        black: null
      };
      moves.push(currentMoveObj);
    }

    const sanFormatted = formatSanPiece(token);
    const moveData = {
      san: token,
      pieceSymbol: sanFormatted.symbol,
      pieceMove: sanFormatted.move,
      isWhite: isWhiteTurn,
      clock: null,
      clockSeconds: null,
      timeSpent: null,
      evaluation: null
    };

    if (isWhiteTurn) {
      currentMoveObj.white = moveData;
      isWhiteTurn = false;
    } else {
      currentMoveObj.black = moveData;
      isWhiteTurn = true;
    }
  }

  // Ensure default simulated times if no clock tags were present
  let simWClock = initialTimeSecs;
  let simBClock = initialTimeSecs;
  moves.forEach((m, idx) => {
    if (m.white && m.white.timeSpent === null) {
      const sim = Math.max(0.5, (Math.sin(idx * 1.7) * 4 + 5));
      m.white.timeSpent = parseFloat(sim.toFixed(1));
      simWClock -= m.white.timeSpent;
      m.white.clock = formatTimeSpent(Math.max(0, simWClock));
      if (m.white.timeSpent > maxMoveTime) maxMoveTime = m.white.timeSpent;
    }
    if (m.black && m.black.timeSpent === null) {
      const sim = Math.max(0.5, (Math.cos(idx * 1.3) * 5 + 6));
      m.black.timeSpent = parseFloat(sim.toFixed(1));
      simBClock -= m.black.timeSpent;
      m.black.clock = formatTimeSpent(Math.max(0, simBClock));
      if (m.black.timeSpent > maxMoveTime) maxMoveTime = m.black.timeSpent;
    }
  });

  return {
    headers,
    moves,
    result: headers.Result || '*',
    maxMoveTime: Math.max(maxMoveTime, 1)
  };
}
