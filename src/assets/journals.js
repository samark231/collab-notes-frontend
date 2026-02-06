const allJournals = [
  {
    "id": "656e10f1a1b2c3d4e5f60001",
    "title": "Morning Reflection",
    "content": "Woke up feeling refreshed. The sun is shining and I'm ready to tackle the new module.",
    "date": "2025-10-01T07:30:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60002",
    "title": "Bug Fixing Nightmare",
    "content": "Spent 4 hours trying to fix a NullPointerException. It was a missing annotation. Frustrating.",
    "date": "2025-10-01T14:15:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60003",
    "title": "Project Deadline",
    "content": "The deadline is approaching and the frontend isn't connecting to the API correctly yet.",
    "date": "2025-10-01T23:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60004",
    "title": "Missed the Gym",
    "content": "Couldn't make it to the gym today because of work. Feeling lethargic.",
    "date": "2025-10-02T08:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60005",
    "title": "Coffee Break",
    "content": "Had a great conversation with a colleague about system architecture.",
    "date": "2025-10-02T10:30:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60006",
    "title": "Server Crash",
    "content": "Production server went down. Logs are inconclusive. Panic mode.",
    "date": "2025-10-02T15:45:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60007",
    "title": "Traffic Jam",
    "content": "Stuck in traffic for 2 hours. Wasted so much time.",
    "date": "2025-10-02T19:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60008",
    "title": "Movie Night",
    "content": "Watched a classic sci-fi movie. It was a nice escape from reality.",
    "date": "2025-10-02T21:30:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60009",
    "title": "Code Review",
    "content": "Got some harsh feedback on my PR. I know it's for the best, but it stings.",
    "date": "2025-10-03T11:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60010",
    "title": "New Framework",
    "content": "Started learning a new UI library. The documentation is terrible.",
    "date": "2025-10-03T14:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60011",
    "title": "Interview Prep",
    "content": "Mock interview didn't go well. Need to study DP problems more.",
    "date": "2025-10-03T18:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60012",
    "title": "Weekend Plans",
    "content": "Planning a hike for Saturday. Really looking forward to nature.",
    "date": "2025-10-03T20:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60013",
    "title": "Loneliness",
    "content": "Everyone seems busy today. Feeling a bit isolated working remotely.",
    "date": "2025-10-04T12:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60014",
    "title": "Internet Issues",
    "content": "ISP is down again. I can't push my code. This is unacceptable.",
    "date": "2025-10-04T13:30:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60015",
    "title": "Presentation Nerves",
    "content": "Have to present to the stakeholders tomorrow. Butterflies in stomach.",
    "date": "2025-10-04T22:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60016",
    "title": "Success!",
    "content": "Presentation went perfectly. They loved the demo.",
    "date": "2025-10-05T10:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60017",
    "title": "Rainy Day",
    "content": "It's been raining all day. Gloomy weather makes me feel low.",
    "date": "2025-10-05T16:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60018",
    "title": "Loud Neighbors",
    "content": "Neighbors are blasting music at 2 AM. I need sleep!",
    "date": "2025-10-06T02:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60019",
    "title": "Health Scare",
    "content": "Felt a weird pain in my chest. Probably just stress, but I'm worried.",
    "date": "2025-10-06T09:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60020",
    "title": "Family Dinner",
    "content": "Had a lovely dinner with parents. Good food, good laughs.",
    "date": "2025-10-06T20:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60021",
    "title": "Old Photos",
    "content": "Found some old photos from college. Miss those days.",
    "date": "2025-10-07T14:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60022",
    "title": "Broken Laptop",
    "content": "Spilled water on the keyboard. Keys are sticky. Why am I so clumsy?",
    "date": "2025-10-07T15:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60023",
    "title": "Bills",
    "content": "Rent is due and unexpected car repairs came up. Money is tight.",
    "date": "2025-10-08T09:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60024",
    "title": "Bonus Received",
    "content": "Got a performance bonus! Financial stress relieved.",
    "date": "2025-10-08T17:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60025",
    "title": "Bad News",
    "content": "Heard that a friend is moving away. Going to miss them.",
    "date": "2025-10-09T12:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60026",
    "title": "Rude Customer",
    "content": "Had to deal with a very entitled client today. Kept my cool, but barely.",
    "date": "2025-10-09T16:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60027",
    "title": "Exam Results",
    "content": "Waiting for the certification results. The suspense is killing me.",
    "date": "2025-10-10T08:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60028",
    "title": "Certified!",
    "content": "Passed the exam with flying colors. Hard work pays off.",
    "date": "2025-10-10T14:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60029",
    "title": "Lost Item",
    "content": "Can't find my favorite watch. I've looked everywhere.",
    "date": "2025-10-11T09:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60030",
    "title": "Spam Calls",
    "content": "Got 5 spam calls in one hour. How do they even get my number?",
    "date": "2025-10-11T13:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60031",
    "title": "Future Thoughts",
    "content": "Thinking about where I'll be in 5 years. It's overwhelming.",
    "date": "2025-10-11T23:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60032",
    "title": "Morning Run",
    "content": "Beat my personal best time on the 5k run today.",
    "date": "2025-10-12T07:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60033",
    "title": "Rejection",
    "content": "Didn't get the invite to the event. Feels like I'm being left out.",
    "date": "2025-10-12T18:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60034",
    "title": "Data Loss",
    "content": "Forgot to save the file before the app crashed. Lost 30 mins of work.",
    "date": "2025-10-13T11:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60035",
    "title": "Social Event",
    "content": "Going to a party where I don't know many people. Social anxiety kicking in.",
    "date": "2025-10-13T19:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60036",
    "title": "Great Party",
    "content": "Actually had a great time. Met some cool people.",
    "date": "2025-10-14T01:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60037",
    "title": "Sunday Blues",
    "content": "The weekend is over. Back to the grind tomorrow.",
    "date": "2025-10-14T20:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60038",
    "title": "Queue Jumper",
    "content": "Someone cut in line at the grocery store. Some people have no manners.",
    "date": "2025-10-15T12:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60039",
    "title": "Strange Noise",
    "content": "Heard a noise downstairs. Probably the cat, but still unsettling.",
    "date": "2025-10-15T23:45:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60040",
    "title": "New Gadget",
    "content": "Bought a new mechanical keyboard. The typing sound is so satisfying.",
    "date": "2025-10-16T10:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60041",
    "title": "Bad Movie",
    "content": "Wasted 2 hours watching a terrible film. Disappointed.",
    "date": "2025-10-16T22:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60042",
    "title": "Coding Error",
    "content": "Pushed a bug to prod. The boss is not happy. I am furious with myself.",
    "date": "2025-10-17T09:30:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60043",
    "title": "Pending Feedback",
    "content": "Waiting for client feedback on the new design. Hope they like it.",
    "date": "2025-10-17T15:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60044",
    "title": "Client Approval",
    "content": "Client signed off on the design without changes! Huge win.",
    "date": "2025-10-17T17:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60045",
    "title": "Nostalgia",
    "content": "Thinking about childhood friends. Wonder what they are doing now.",
    "date": "2025-10-18T14:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60046",
    "title": "Power Cut",
    "content": "Power went out right in the middle of a game. Unbelievable.",
    "date": "2025-10-18T20:00:00",
    "sentiment": "ANGRY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60047",
    "title": "Upcoming Trip",
    "content": "Packing for the trip. Worried I'll forget something important.",
    "date": "2025-10-19T10:00:00",
    "sentiment": "ANXIOUS"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60048",
    "title": "On the Plane",
    "content": "Finally seated and taking off. Vacation mode activated.",
    "date": "2025-10-19T13:00:00",
    "sentiment": "HAPPY"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60049",
    "title": "Book Finished",
    "content": "Finished reading a tragic novel. The ending was heartbreaking.",
    "date": "2025-10-20T16:00:00",
    "sentiment": "SAD"
  },
  {
    "id": "656e10f1a1b2c3d4e5f60050",
    "title": "Broken Suitcase",
    "content": "Airline broke the handle on my suitcase. Now I have to carry it.",
    "date": "2025-10-20T18:00:00",
    "sentiment": "ANGRY"
  }
]

export default allJournals;