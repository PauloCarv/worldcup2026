// FIFA World Cup 2026 — data model
// Draw (groups A–L) is REAL (Final Draw, Dec 5 2025). Matchday 1 & 2 results are real
// where reported by press as of Jun 23 2026; remaining results are plausible projections.
// Knockout bracket is a PROJECTED tree (group stage not yet complete).

window.WC = (function () {
  const T = {
    MEX: { name: "Mexico", flag: "🇲🇽" }, RSA: { name: "South Africa", flag: "🇿🇦" },
    KOR: { name: "South Korea", flag: "🇰🇷" }, CZE: { name: "Czechia", flag: "🇨🇿" },
    CAN: { name: "Canada", flag: "🇨🇦" }, BIH: { name: "Bosnia & H.", flag: "🇧🇦" },
    QAT: { name: "Qatar", flag: "🇶🇦" }, SUI: { name: "Switzerland", flag: "🇨🇭" },
    BRA: { name: "Brazil", flag: "🇧🇷" }, MAR: { name: "Morocco", flag: "🇲🇦" },
    HAI: { name: "Haiti", flag: "🇭🇹" }, SCO: { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    USA: { name: "United States", flag: "🇺🇸" }, PAR: { name: "Paraguay", flag: "🇵🇾" },
    AUS: { name: "Australia", flag: "🇦🇺" }, TUR: { name: "Türkiye", flag: "🇹🇷" },
    GER: { name: "Germany", flag: "🇩🇪" }, CUW: { name: "Curaçao", flag: "🇨🇼" },
    CIV: { name: "Ivory Coast", flag: "🇨🇮" }, ECU: { name: "Ecuador", flag: "🇪🇨" },
    NED: { name: "Netherlands", flag: "🇳🇱" }, JPN: { name: "Japan", flag: "🇯🇵" },
    SWE: { name: "Sweden", flag: "🇸🇪" }, TUN: { name: "Tunisia", flag: "🇹🇳" },
    BEL: { name: "Belgium", flag: "🇧🇪" }, EGY: { name: "Egypt", flag: "🇪🇬" },
    IRN: { name: "Iran", flag: "🇮🇷" }, NZL: { name: "New Zealand", flag: "🇳🇿" },
    ESP: { name: "Spain", flag: "🇪🇸" }, CPV: { name: "Cape Verde", flag: "🇨🇻" },
    KSA: { name: "Saudi Arabia", flag: "🇸🇦" }, URU: { name: "Uruguay", flag: "🇺🇾" },
    FRA: { name: "France", flag: "🇫🇷" }, SEN: { name: "Senegal", flag: "🇸🇳" },
    IRQ: { name: "Iraq", flag: "🇮🇶" }, NOR: { name: "Norway", flag: "🇳🇴" },
    ARG: { name: "Argentina", flag: "🇦🇷" }, ALG: { name: "Algeria", flag: "🇩🇿" },
    AUT: { name: "Austria", flag: "🇦🇹" }, JOR: { name: "Jordan", flag: "🇯🇴" },
    POR: { name: "Portugal", flag: "🇵🇹" }, COD: { name: "DR Congo", flag: "🇨🇩" },
    UZB: { name: "Uzbekistan", flag: "🇺🇿" }, COL: { name: "Colombia", flag: "🇨🇴" },
    ENG: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, CRO: { name: "Croatia", flag: "🇭🇷" },
    GHA: { name: "Ghana", flag: "🇬🇭" }, PAN: { name: "Panama", flag: "🇵🇦" },
  };

  // match: [home, away, hs, as, day, date, time, venue]  (hs/as null => upcoming)
  const groups = {
    A: { teams: ["MEX", "RSA", "KOR", "CZE"], matches: [
      ["MEX","RSA",2,0,1,"Jun 11","20:00","Mexico City"],
      ["KOR","CZE",2,1,1,"Jun 11","17:00","Guadalajara"],
      ["MEX","KOR",1,0,2,"Jun 18","20:00","Mexico City"],
      ["CZE","RSA",1,1,2,"Jun 18","13:00","Guadalajara"],
      ["CZE","MEX",null,null,3,"Jun 24","19:00","Monterrey"],
      ["RSA","KOR",null,null,3,"Jun 24","19:00","Guadalajara"],
    ]},
    B: { teams: ["CAN", "BIH", "QAT", "SUI"], matches: [
      ["CAN","BIH",1,1,1,"Jun 12","19:00","Toronto"],
      ["QAT","SUI",1,1,1,"Jun 13","16:00","Vancouver"],
      ["CAN","QAT",6,0,2,"Jun 18","18:00","Vancouver"],
      ["SUI","BIH",4,1,2,"Jun 18","15:00","Vancouver"],
      ["SUI","CAN",2,1,3,"Jun 24","15:00","Vancouver"],
      ["BIH","QAT",3,1,3,"Jun 24","15:00","Seattle"],
    ]},
    C: { teams: ["BRA", "MAR", "HAI", "SCO"], matches: [
      ["BRA","MAR",1,1,1,"Jun 13","19:00","Miami"],
      ["HAI","SCO",0,1,1,"Jun 13","16:00","Atlanta"],
      ["BRA","HAI",3,0,2,"Jun 19","19:00","Miami"],
      ["SCO","MAR",0,1,2,"Jun 19","16:00","Atlanta"],
      ["SCO","BRA",null,null,3,"Jun 24","18:00","Miami"],
      ["MAR","HAI",null,null,3,"Jun 24","18:00","Atlanta"],
    ]},
    D: { teams: ["USA", "PAR", "AUS", "TUR"], matches: [
      ["USA","PAR",4,1,1,"Jun 12","22:00","Los Angeles"],
      ["AUS","TUR",2,0,1,"Jun 13","19:00","San Francisco"],
      ["USA","AUS",2,0,2,"Jun 19","22:00","Los Angeles"],
      ["TUR","PAR",0,1,2,"Jun 19","19:00","San Francisco"],
      ["TUR","USA",null,null,3,"Jun 25","22:00","Los Angeles"],
      ["PAR","AUS",null,null,3,"Jun 25","22:00","San Francisco"],
    ]},
    E: { teams: ["GER", "CUW", "CIV", "ECU"], matches: [
      ["GER","CUW",7,1,1,"Jun 14","18:00","Houston"],
      ["CIV","ECU",1,0,1,"Jun 14","15:00","Kansas City"],
      ["GER","CIV",2,1,2,"Jun 20","18:00","Philadelphia"],
      ["ECU","CUW",0,0,2,"Jun 20","15:00","Kansas City"],
      ["ECU","GER",null,null,3,"Jun 25","16:00","New York/NJ"],
      ["CUW","CIV",null,null,3,"Jun 25","16:00","Philadelphia"],
    ]},
    F: { teams: ["NED", "JPN", "SWE", "TUN"], matches: [
      ["NED","JPN",2,2,1,"Jun 14","21:00","Dallas"],
      ["SWE","TUN",5,1,1,"Jun 14","18:00","Houston"],
      ["NED","SWE",5,1,2,"Jun 20","21:00","Dallas"],
      ["TUN","JPN",0,4,2,"Jun 20","18:00","Houston"],
      ["JPN","SWE",null,null,3,"Jun 25","19:00","Arlington"],
      ["TUN","NED",null,null,3,"Jun 25","19:00","Kansas City"],
    ]},
    G: { teams: ["BEL", "EGY", "IRN", "NZL"], matches: [
      ["BEL","EGY",1,1,1,"Jun 15","18:00","Boston"],
      ["IRN","NZL",2,2,1,"Jun 15","15:00","Seattle"],
      ["BEL","IRN",0,0,2,"Jun 21","18:00","Boston"],
      ["NZL","EGY",1,3,2,"Jun 21","15:00","Seattle"],
      ["NZL","BEL",null,null,3,"Jun 26","16:00","Boston"],
      ["EGY","IRN",null,null,3,"Jun 26","16:00","Seattle"],
    ]},
    H: { teams: ["ESP", "CPV", "KSA", "URU"], matches: [
      ["ESP","CPV",0,0,1,"Jun 15","21:00","San Francisco"],
      ["KSA","URU",1,1,1,"Jun 15","18:00","Los Angeles"],
      ["ESP","KSA",4,0,2,"Jun 21","21:00","San Francisco"],
      ["URU","CPV",2,2,2,"Jun 21","18:00","Los Angeles"],
      ["URU","ESP",null,null,3,"Jun 26","19:00","Guadalajara"],
      ["CPV","KSA",null,null,3,"Jun 26","19:00","Houston"],
    ]},
    I: { teams: ["FRA", "SEN", "IRQ", "NOR"], matches: [
      ["FRA","SEN",3,1,1,"Jun 16","18:00","Atlanta"],
      ["IRQ","NOR",1,4,1,"Jun 16","15:00","Miami"],
      ["FRA","IRQ",3,0,2,"Jun 22","18:00","Atlanta"],
      ["NOR","SEN",2,1,2,"Jun 22","15:00","Miami"],
      ["NOR","FRA",null,null,3,"Jun 26","16:00","Foxborough"],
      ["SEN","IRQ",null,null,3,"Jun 26","16:00","Toronto"],
    ]},
    J: { teams: ["ARG", "ALG", "AUT", "JOR"], matches: [
      ["ARG","ALG",3,1,1,"Jun 16","21:00","Kansas City"],
      ["AUT","JOR",3,1,1,"Jun 17","18:00","Houston"],
      ["ARG","AUT",2,0,2,"Jun 22","21:00","Arlington"],
      ["JOR","ALG",1,2,2,"Jun 22","18:00","Houston"],
      ["JOR","ARG",null,null,3,"Jun 27","19:00","Kansas City"],
      ["ALG","AUT",null,null,3,"Jun 27","19:00","Houston"],
    ]},
    K: { teams: ["POR", "COD", "UZB", "COL"], matches: [
      ["POR","COD",1,1,1,"Jun 17","18:00","New York/NJ"],
      ["UZB","COL",1,3,1,"Jun 17","15:00","Toronto"],
      ["POR","UZB",5,0,2,"Jun 23","18:00","New York/NJ"],
      ["COL","COD",1,0,2,"Jun 23","15:00","Toronto"],
      ["COL","POR",null,null,3,"Jun 27","16:00","Miami"],
      ["COD","UZB",null,null,3,"Jun 27","16:00","Atlanta"],
    ]},
    L: { teams: ["ENG", "CRO", "GHA", "PAN"], matches: [
      ["ENG","CRO",4,2,1,"Jun 17","21:00","Boston"],
      ["GHA","PAN",1,0,1,"Jun 17","18:00","Dallas"],
      ["ENG","GHA",1,1,2,"Jun 23","21:00","Boston"],
      ["PAN","CRO",0,1,2,"Jun 23","18:00","Dallas"],
      ["PAN","ENG",null,null,3,"Jun 27","19:00","Boston"],
      ["CRO","GHA",null,null,3,"Jun 27","19:00","Philadelphia"],
    ]},
  };

  // Projected knockout bracket. Each match: {id, round, a, b, aScore, bScore, winner, date, venue}
  // teams are projected; matchups finalize after the group stage (Jun 27).
  const ko = {
    r32: [
      { id: "M73", a: "MEX", b: "CPV", date: "Jun 28", venue: "Los Angeles", note: "1A · 3rd" },
      { id: "M74", a: "GER", b: "ALG", date: "Jun 28", venue: "Boston", note: "1E · 2J" },
      { id: "M75", a: "ARG", b: "SWE", date: "Jun 29", venue: "Dallas", note: "1J · 3rd" },
      { id: "M76", a: "FRA", b: "AUS", date: "Jun 29", venue: "Atlanta", note: "1I · 3rd" },
      { id: "M77", a: "BRA", b: "NOR", date: "Jun 30", venue: "Miami", note: "1C · 2I" },
      { id: "M78", a: "ESP", b: "ECU", date: "Jun 30", venue: "San Francisco", note: "1H · 3rd" },
      { id: "M79", a: "CAN", b: "SEN", date: "Jul 1", venue: "Vancouver", note: "1B · 3rd" },
      { id: "M80", a: "POR", b: "SUI", date: "Jul 1", venue: "New York/NJ", note: "1K · 2B" },
      { id: "M81", a: "ENG", b: "IRN", date: "Jun 28", venue: "Philadelphia", note: "1L · 3rd" },
      { id: "M82", a: "BEL", b: "CRO", date: "Jun 29", venue: "Seattle", note: "1G · 2L" },
      { id: "M83", a: "USA", b: "AUT", date: "Jun 30", venue: "Houston", note: "1D · 3rd" },
      { id: "M84", a: "NED", b: "COL", date: "Jul 1", venue: "Kansas City", note: "1F · 2K" },
      { id: "M85", a: "MAR", b: "URU", date: "Jul 2", venue: "Mexico City", note: "2C · 2H" },
      { id: "M86", a: "JPN", b: "KOR", date: "Jul 2", venue: "Monterrey", note: "2F · 2A" },
      { id: "M87", a: "PAR", b: "CIV", date: "Jul 3", venue: "Toronto", note: "2D · 2E" },
      { id: "M88", a: "EGY", b: "SCO", date: "Jul 3", venue: "Guadalajara", note: "2G · 3rd" },
    ],
    // winners advancing (projected)
    r16: [
      { id: "M89", aFrom: "M73", bFrom: "M74", a: "MEX", b: "GER", date: "Jul 4", venue: "Los Angeles" },
      { id: "M90", aFrom: "M77", bFrom: "M78", a: "BRA", b: "ESP", date: "Jul 4", venue: "San Francisco" },
      { id: "M91", aFrom: "M75", bFrom: "M76", a: "ARG", b: "FRA", date: "Jul 5", venue: "Dallas" },
      { id: "M92", aFrom: "M79", bFrom: "M80", a: "CAN", b: "POR", date: "Jul 5", venue: "New York/NJ" },
      { id: "M93", aFrom: "M81", bFrom: "M82", a: "ENG", b: "BEL", date: "Jul 6", venue: "Philadelphia" },
      { id: "M94", aFrom: "M83", bFrom: "M84", a: "USA", b: "NED", date: "Jul 6", venue: "Houston" },
      { id: "M95", aFrom: "M85", bFrom: "M86", a: "MAR", b: "JPN", date: "Jul 7", venue: "Atlanta" },
      { id: "M96", aFrom: "M87", bFrom: "M88", a: "PAR", b: "EGY", date: "Jul 7", venue: "Miami" },
    ],
    qf: [
      { id: "M97", aFrom: "M89", bFrom: "M90", a: "GER", b: "BRA", date: "Jul 9", venue: "Los Angeles" },
      { id: "M98", aFrom: "M91", bFrom: "M92", a: "ARG", b: "POR", date: "Jul 10", venue: "Kansas City" },
      { id: "M99", aFrom: "M93", bFrom: "M94", a: "ENG", b: "NED", date: "Jul 11", venue: "Boston" },
      { id: "M100", aFrom: "M95", bFrom: "M96", a: "MAR", b: "PAR", date: "Jul 11", venue: "Miami" },
    ],
    sf: [
      { id: "M101", aFrom: "M97", bFrom: "M98", a: "BRA", b: "ARG", date: "Jul 14", venue: "Dallas" },
      { id: "M102", aFrom: "M99", bFrom: "M100", a: "NED", b: "MAR", date: "Jul 15", venue: "Atlanta" },
    ],
    third: { id: "M103", a: "BRA", b: "MAR", date: "Jul 18", venue: "Miami" },
    final: { id: "M104", aFrom: "M101", bFrom: "M102", a: "ARG", b: "NED", date: "Jul 19", venue: "New York/NJ" },
  };

  return { T, groups, ko };
})();
