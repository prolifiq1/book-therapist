export interface SeedBook {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  longDescription: string;
  coverImage: string;
  pageCount: number;
  language: string;
  isbn13?: string;
  publishedDate: string;
  publisher: string;
  avgRating: number;
  ratingsCount: number;
  readingDifficulty: "easy" | "moderate" | "challenging";
  pacing: "slow" | "medium" | "fast";
  emotionalTone: string[];
  isFiction: boolean;
  authors: string[];
  genres: string[];
  themes: string[];
  tags: string[];
  awards: { name: string; category?: string; year: number; won: boolean }[];
  adaptations: {
    type: string;
    title: string;
    year?: number;
    director?: string;
    platform?: string;
  }[];
  reviews: {
    source: string;
    content: string;
    rating?: number;
    highlight?: string;
    sentiment: string;
  }[];
  quotes: { text: string; page?: number }[];
  similarBooks: string[];
  personalityFit: Record<string, number>;
  themeVector: Record<string, number>;
  toneVector: Record<string, number>;
}

export const seedBooks: SeedBook[] = [
  // ─────────────────────────────────────────────
  // 1. The Alchemist
  // ─────────────────────────────────────────────
  {
    title: "The Alchemist",
    slug: "the-alchemist",
    description:
      "A mystical story about Santiago, an Andalusian shepherd boy who dreams of discovering a treasure located near the Egyptian pyramids. A tale of following one's destiny and listening to the heart.",
    longDescription:
      "Paulo Coelho's masterpiece tells the story of Santiago, a young shepherd who embarks on a journey from Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way, he meets a series of characters who teach him about the Soul of the World, the Language of the World, and his own Personal Legend. Through encounters with a king, an Englishman, an alchemist, and the woman of his dreams, Santiago learns to read the omens strewn along life's path and, most importantly, to follow his heart. This deceptively simple fable has resonated with millions of readers worldwide, offering a meditation on destiny, courage, and the transformative power of pursuing one's dreams.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    pageCount: 197,
    language: "en",
    isbn13: "9780062315007",
    publishedDate: "1988-01-01",
    publisher: "HarperOne",
    avgRating: 3.9,
    ratingsCount: 2500000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["hopeful", "mystical", "inspiring"],
    isFiction: true,
    authors: ["Paulo Coelho"],
    genres: ["Fiction", "Philosophy", "Fantasy", "Fable"],
    themes: [
      "destiny",
      "self-discovery",
      "following dreams",
      "spirituality",
      "courage",
    ],
    tags: [
      "inspiring",
      "philosophical",
      "spiritual",
      "comforting",
      "classic",
      "quick-read",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "Publishers Weekly",
        content:
          "An entrancing fable about the essential wisdom of listening to our hearts.",
        rating: 4,
        highlight: "entrancing fable",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "A sweetly simple tale with a compelling message about pursuing your dreams, though some may find the allegory heavy-handed.",
        rating: 3.5,
        sentiment: "mixed",
      },
    ],
    quotes: [
      {
        text: "When you want something, all the universe conspires in helping you to achieve it.",
        page: 22,
      },
      {
        text: "It's the possibility of having a dream come true that makes life interesting.",
        page: 11,
      },
    ],
    similarBooks: [
      "the-midnight-library",
      "the-power-of-now",
      "mans-search-for-meaning",
    ],
    personalityFit: {
      "deep-feeler": 0.7,
      "soulful-romantic": 0.6,
      "intellectual-strategist": 0.3,
      "ambitious-builder": 0.5,
      "creative-explorer": 0.8,
      "mindful-philosopher": 0.9,
      "social-connector": 0.4,
      "resilient-survivor": 0.6,
    },
    themeVector: {
      "self-discovery": 0.95,
      destiny: 0.9,
      spirituality: 0.85,
      courage: 0.7,
      love: 0.5,
      adventure: 0.6,
      wisdom: 0.8,
    },
    toneVector: {
      hopeful: 0.9,
      mystical: 0.85,
      inspiring: 0.9,
      gentle: 0.8,
      philosophical: 0.7,
    },
  },

  // ─────────────────────────────────────────────
  // 2. Educated
  // ─────────────────────────────────────────────
  {
    title: "Educated",
    slug: "educated",
    subtitle: "A Memoir",
    description:
      "Tara Westover's memoir of growing up in a survivalist family in rural Idaho and her journey to earn a PhD from Cambridge. A testament to the transformative power of education.",
    longDescription:
      "Born to survivalist parents in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no birth certificate for her until she was nine. Her father forbade hospitals, so Tara never saw a doctor or nurse. Through self-teaching and sheer determination, she taught herself enough mathematics and grammar to be admitted to Brigham Young University, and eventually earned a PhD from Cambridge. Along the way she struggled with her family's increasingly dangerous world of paranoia, extremism, and abuse, and was forced to choose between her family and her education. This memoir is a coming-of-age story that shows how much we are shaped by our families and how much we can shape ourselves.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    pageCount: 334,
    language: "en",
    isbn13: "9780399590504",
    publishedDate: "2018-02-20",
    publisher: "Random House",
    avgRating: 4.47,
    ratingsCount: 1800000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["raw", "inspiring", "intense", "vulnerable"],
    isFiction: false,
    authors: ["Tara Westover"],
    genres: ["Memoir", "Nonfiction", "Biography", "Education"],
    themes: [
      "education",
      "family",
      "identity",
      "abuse",
      "resilience",
      "self-invention",
    ],
    tags: [
      "inspiring",
      "emotional",
      "memoir",
      "powerful",
      "page-turner",
      "thought-provoking",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Memoir & Autobiography",
        year: 2018,
        won: true,
      },
      {
        name: "Los Angeles Times Book Prize",
        category: "Biography",
        year: 2018,
        won: false,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The New York Times",
        content:
          "An amazing story, and truly astonishing that the author has emerged from her childhood with the ability to tell it in such a compelling way.",
        rating: 5,
        highlight: "amazing story",
        sentiment: "positive",
      },
      {
        source: "The Washington Post",
        content:
          "Westover has written a memoir that will make even the most cynical reader believe in the possibility of transformation.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "You can love someone and still choose to say goodbye to them. You can miss a person every day, and still be glad that they are no longer in your life.",
      },
      {
        text: "The decisions I made after that moment were not the ones she would have made. They were the choices of a changed person, a new self.",
      },
    ],
    similarBooks: ["becoming", "mans-search-for-meaning", "the-kite-runner"],
    personalityFit: {
      "deep-feeler": 0.85,
      "soulful-romantic": 0.4,
      "intellectual-strategist": 0.6,
      "ambitious-builder": 0.8,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.6,
      "social-connector": 0.4,
      "resilient-survivor": 0.95,
    },
    themeVector: {
      education: 0.95,
      family: 0.9,
      identity: 0.85,
      resilience: 0.9,
      abuse: 0.7,
      "self-invention": 0.85,
      trauma: 0.75,
    },
    toneVector: {
      raw: 0.85,
      inspiring: 0.8,
      intense: 0.75,
      vulnerable: 0.8,
      determined: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 3. Atomic Habits
  // ─────────────────────────────────────────────
  {
    title: "Atomic Habits",
    slug: "atomic-habits",
    subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    description:
      "James Clear presents a practical framework for improving every day through the power of tiny changes. The book reveals how small habits compound into remarkable results over time.",
    longDescription:
      "Drawing on research from biology, psychology, and neuroscience, James Clear distills complex topics into simple behaviors that can be easily applied to daily life and work. In Atomic Habits, he presents a proven framework for building good habits and breaking bad ones. Clear argues that the key to lasting change is not setting ambitious goals, but focusing on building better systems. He introduces the concept of atomic habits -- small, incremental routines that compound over time to produce remarkable results. The book covers the four laws of behavior change: make it obvious, make it attractive, make it easy, and make it satisfying. Packed with self-improvement strategies, Atomic Habits will reshape the way you think about progress and success.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    pageCount: 320,
    language: "en",
    isbn13: "9780735211292",
    publishedDate: "2018-10-16",
    publisher: "Avery",
    avgRating: 4.37,
    ratingsCount: 1500000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["motivating", "clear", "practical"],
    isFiction: false,
    authors: ["James Clear"],
    genres: [
      "Self-Help",
      "Nonfiction",
      "Psychology",
      "Productivity",
      "Business",
    ],
    themes: [
      "habits",
      "self-improvement",
      "discipline",
      "identity",
      "systems thinking",
    ],
    tags: [
      "practical",
      "inspiring",
      "actionable",
      "self-help",
      "popular",
      "accessible",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Science & Technology",
        year: 2018,
        won: false,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The Wall Street Journal",
        content:
          "A supremely practical and useful book that will change the way you approach your daily routines.",
        rating: 4.5,
        highlight: "supremely practical",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "Clear presents habit formation as an accessible skill anyone can master, backed by solid science and engaging anecdotes.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "You do not rise to the level of your goals. You fall to the level of your systems.",
        page: 27,
      },
      {
        text: "Every action you take is a vote for the type of person you wish to become.",
        page: 38,
      },
    ],
    similarBooks: [
      "thinking-fast-and-slow",
      "the-subtle-art-of-not-giving-a-fck",
      "range",
      "quiet",
    ],
    personalityFit: {
      "deep-feeler": 0.3,
      "soulful-romantic": 0.1,
      "intellectual-strategist": 0.85,
      "ambitious-builder": 0.95,
      "creative-explorer": 0.4,
      "mindful-philosopher": 0.5,
      "social-connector": 0.5,
      "resilient-survivor": 0.7,
    },
    themeVector: {
      "self-improvement": 0.95,
      habits: 0.95,
      discipline: 0.9,
      identity: 0.6,
      "systems-thinking": 0.85,
      motivation: 0.7,
    },
    toneVector: {
      motivating: 0.9,
      practical: 0.95,
      clear: 0.9,
      optimistic: 0.7,
      energetic: 0.6,
    },
  },

  // ─────────────────────────────────────────────
  // 4. Normal People
  // ─────────────────────────────────────────────
  {
    title: "Normal People",
    slug: "normal-people",
    description:
      "A nuanced exploration of the complicated relationship between Connell and Marianne, two Irish teenagers who weave in and out of each other's lives from secondary school to university.",
    longDescription:
      "At school in a small Irish town, Connell and Marianne pretend not to know each other. He's popular and well-adjusted, the star of the football team; she's lonely, proud, and intensely private. But when Connell comes to pick up his mother from her job at Marianne's house, a strange and indelible connection grows between them. Tracing their relationship through their years at Trinity College Dublin, Sally Rooney's novel explores how two people can profoundly shape each other's lives. The book dissects class, power, intimacy, and the ways we struggle to communicate with those closest to us, all rendered in Rooney's trademark precise, stripped-back prose.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781984822185-L.jpg",
    pageCount: 273,
    language: "en",
    isbn13: "9781984822185",
    publishedDate: "2018-08-28",
    publisher: "Hogarth Press",
    avgRating: 3.85,
    ratingsCount: 950000,
    readingDifficulty: "easy",
    pacing: "slow",
    emotionalTone: ["melancholic", "tender", "intimate", "bittersweet"],
    isFiction: true,
    authors: ["Sally Rooney"],
    genres: [
      "Literary Fiction",
      "Romance",
      "Contemporary Fiction",
      "Coming-of-Age",
    ],
    themes: [
      "love",
      "class",
      "communication",
      "intimacy",
      "identity",
      "power dynamics",
    ],
    tags: [
      "literary",
      "emotional",
      "intimate",
      "contemporary",
      "quick-read",
      "character-driven",
    ],
    awards: [
      {
        name: "Costa Book Award",
        category: "Novel",
        year: 2018,
        won: true,
      },
      {
        name: "An Post Irish Book Award",
        category: "Novel of the Year",
        year: 2018,
        won: true,
      },
      { name: "Booker Prize", year: 2018, won: false },
    ],
    adaptations: [
      {
        type: "TV Series",
        title: "Normal People",
        year: 2020,
        director: "Lenny Abrahamson",
        platform: "Hulu/BBC Three",
      },
    ],
    reviews: [
      {
        source: "The Guardian",
        content:
          "A future classic that renders the experience of love and growing up with extraordinary precision.",
        rating: 5,
        highlight: "a future classic",
        sentiment: "positive",
      },
      {
        source: "The New York Times",
        content:
          "Rooney writes with a rare, disarming clarity about the inner lives of young people navigating class and desire.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "It's not like this with other people, she says. He knows it isn't. He knows that she knows it isn't.",
      },
      {
        text: "He has sincerely felt that life is something she has helped him appreciate.",
      },
    ],
    similarBooks: [
      "the-seven-husbands-of-evelyn-hugo",
      "a-little-life",
      "anxious-people",
    ],
    personalityFit: {
      "deep-feeler": 0.9,
      "soulful-romantic": 0.95,
      "intellectual-strategist": 0.4,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.6,
      "mindful-philosopher": 0.5,
      "social-connector": 0.6,
      "resilient-survivor": 0.4,
    },
    themeVector: {
      love: 0.95,
      class: 0.8,
      intimacy: 0.9,
      identity: 0.75,
      communication: 0.85,
      "power-dynamics": 0.7,
    },
    toneVector: {
      melancholic: 0.7,
      tender: 0.85,
      intimate: 0.95,
      bittersweet: 0.8,
      quiet: 0.75,
    },
  },

  // ─────────────────────────────────────────────
  // 5. The Midnight Library
  // ─────────────────────────────────────────────
  {
    title: "The Midnight Library",
    slug: "the-midnight-library",
    description:
      "Nora Seed finds herself in a library between life and death, where each book lets her live a different version of her life. A novel about regret, hope, and the choices that define us.",
    longDescription:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. When Nora Seed finds herself in the Midnight Library, she gets to live out all the lives she could have led -- the life where she became a glaciologist, a rock star, an Olympic swimmer. As she explores these alternate realities, she must search within to discover what truly fulfills her. Matt Haig has crafted a dazzling novel about all the choices that go into a life well lived, a poignant meditation on regret, possibility, and the idea that the only way to learn is to live.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    pageCount: 288,
    language: "en",
    isbn13: "9780525559474",
    publishedDate: "2020-09-29",
    publisher: "Viking",
    avgRating: 4.02,
    ratingsCount: 1200000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["hopeful", "bittersweet", "comforting", "reflective"],
    isFiction: true,
    authors: ["Matt Haig"],
    genres: [
      "Fiction",
      "Fantasy",
      "Contemporary Fiction",
      "Speculative Fiction",
    ],
    themes: [
      "regret",
      "choices",
      "depression",
      "meaning of life",
      "second chances",
      "gratitude",
    ],
    tags: [
      "comforting",
      "philosophical",
      "uplifting",
      "quick-read",
      "emotional",
      "thought-provoking",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Fiction",
        year: 2020,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The Washington Post",
        content:
          "A warm and thought-provoking exploration of what makes a life worth living.",
        rating: 4,
        highlight: "warm and thought-provoking",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "A feel-good novel that tackles heavy themes with a light touch, offering genuine comfort without oversimplifying.",
        rating: 3.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "The only way to learn is to live.",
        page: 256,
      },
      {
        text: "It is easy to mourn the lives we aren't living. It is hard to see what is there instead of what isn't.",
      },
    ],
    similarBooks: [
      "the-alchemist",
      "anxious-people",
      "the-house-in-the-cerulean-sea",
      "klara-and-the-sun",
    ],
    personalityFit: {
      "deep-feeler": 0.85,
      "soulful-romantic": 0.6,
      "intellectual-strategist": 0.3,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.7,
      "mindful-philosopher": 0.85,
      "social-connector": 0.5,
      "resilient-survivor": 0.8,
    },
    themeVector: {
      regret: 0.9,
      choices: 0.95,
      depression: 0.7,
      "meaning-of-life": 0.9,
      "second-chances": 0.85,
      gratitude: 0.8,
    },
    toneVector: {
      hopeful: 0.9,
      bittersweet: 0.7,
      comforting: 0.85,
      reflective: 0.8,
      gentle: 0.75,
    },
  },

  // ─────────────────────────────────────────────
  // 6. Sapiens
  // ─────────────────────────────────────────────
  {
    title: "Sapiens",
    slug: "sapiens",
    subtitle: "A Brief History of Humankind",
    description:
      "Yuval Noah Harari surveys the entire history of humankind, from the Stone Age to the Silicon Age, exploring how biology and history have defined what it means to be human.",
    longDescription:
      "In this groundbreaking narrative, Yuval Noah Harari explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be human. From examining the role of an ancient fire to the latest in genetic engineering, Sapiens spans the whole of human history. Harari argues that Homo sapiens conquered the world thanks to its unique ability to believe in things existing purely in the imagination, like gods, nations, money, and human rights. The book traces the Cognitive Revolution, the Agricultural Revolution, the unification of humankind, and the Scientific Revolution, weaving together insights from biology, anthropology, paleontology, and economics to tell the story of how we came to be.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    pageCount: 443,
    language: "en",
    isbn13: "9780062316097",
    publishedDate: "2011-01-01",
    publisher: "Harper",
    avgRating: 4.39,
    ratingsCount: 1300000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["thought-provoking", "expansive", "challenging"],
    isFiction: false,
    authors: ["Yuval Noah Harari"],
    genres: [
      "Nonfiction",
      "History",
      "Science",
      "Anthropology",
      "Philosophy",
    ],
    themes: [
      "human history",
      "evolution",
      "civilization",
      "power",
      "imagination",
      "progress",
    ],
    tags: [
      "intellectual",
      "eye-opening",
      "ambitious",
      "philosophical",
      "popular-science",
      "sweeping",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "The Guardian",
        content:
          "A publishing phenomenon -- a dazzling, sweeping account of everything that has made humans the dominant species.",
        rating: 4.5,
        highlight: "dazzling, sweeping account",
        sentiment: "positive",
      },
      {
        source: "The New York Times",
        content:
          "Harari can be provocative and reductive, but Sapiens is never less than fascinating as a grand synthesis of human history.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "You could never convince a monkey to give you a banana by promising him limitless bananas after death in monkey heaven.",
        page: 27,
      },
      {
        text: "We study history not to know the future but to widen our horizons, to understand that our present situation is neither natural nor inevitable.",
      },
    ],
    similarBooks: [
      "thinking-fast-and-slow",
      "range",
      "invisible-women",
      "quiet",
    ],
    personalityFit: {
      "deep-feeler": 0.3,
      "soulful-romantic": 0.1,
      "intellectual-strategist": 0.95,
      "ambitious-builder": 0.6,
      "creative-explorer": 0.7,
      "mindful-philosopher": 0.8,
      "social-connector": 0.5,
      "resilient-survivor": 0.3,
    },
    themeVector: {
      "human-history": 0.95,
      evolution: 0.85,
      civilization: 0.9,
      power: 0.7,
      imagination: 0.65,
      progress: 0.75,
    },
    toneVector: {
      "thought-provoking": 0.95,
      expansive: 0.9,
      challenging: 0.7,
      intellectual: 0.9,
      engaging: 0.75,
    },
  },

  // ─────────────────────────────────────────────
  // 7. Becoming
  // ─────────────────────────────────────────────
  {
    title: "Becoming",
    slug: "becoming",
    description:
      "Michelle Obama's deeply personal memoir traces her journey from the South Side of Chicago to the White House and beyond. An intimate look at the experiences that shaped a remarkable woman.",
    longDescription:
      "In her memoir, the former First Lady of the United States invites readers into her world, chronicling the experiences that have shaped her -- from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address. With unerring honesty and lively wit, she describes her triumphs and her disappointments, both public and private, telling her full story as she has lived it. Becoming is more than a memoir. It is an invitation to readers to find their own story and their own voice, and to believe in the power of becoming.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg",
    pageCount: 448,
    language: "en",
    isbn13: "9781524763138",
    publishedDate: "2018-11-13",
    publisher: "Crown Publishing",
    avgRating: 4.43,
    ratingsCount: 1600000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["warm", "inspiring", "candid", "empowering"],
    isFiction: false,
    authors: ["Michelle Obama"],
    genres: ["Memoir", "Nonfiction", "Biography", "Politics"],
    themes: [
      "identity",
      "ambition",
      "race",
      "family",
      "resilience",
      "public service",
    ],
    tags: [
      "inspiring",
      "memoir",
      "empowering",
      "honest",
      "warm",
      "best-seller",
    ],
    awards: [
      {
        name: "NAACP Image Award",
        category: "Outstanding Literary Work - Biography/Autobiography",
        year: 2019,
        won: true,
      },
      {
        name: "Goodreads Choice Award",
        category: "Memoir & Autobiography",
        year: 2018,
        won: false,
      },
    ],
    adaptations: [
      {
        type: "Documentary",
        title: "Becoming",
        year: 2020,
        director: "Nadia Hallgren",
        platform: "Netflix",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "An engrossing, inspiring, and at times devastatingly honest memoir from one of the most compelling public figures of our time.",
        rating: 4.5,
        highlight: "engrossing, inspiring",
        sentiment: "positive",
      },
      {
        source: "NPR",
        content:
          "Obama is as engaging on the page as she is in person, balancing the personal and political with remarkable grace.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "There is no magic to achievement. It's really about hard work, choices, and persistence.",
      },
      {
        text: "Your story is what you have, what you will always have. It is something to own.",
      },
    ],
    similarBooks: ["educated", "the-alchemist", "quiet"],
    personalityFit: {
      "deep-feeler": 0.6,
      "soulful-romantic": 0.3,
      "intellectual-strategist": 0.5,
      "ambitious-builder": 0.9,
      "creative-explorer": 0.4,
      "mindful-philosopher": 0.4,
      "social-connector": 0.85,
      "resilient-survivor": 0.8,
    },
    themeVector: {
      identity: 0.9,
      ambition: 0.85,
      race: 0.75,
      family: 0.8,
      resilience: 0.85,
      "public-service": 0.7,
    },
    toneVector: {
      warm: 0.85,
      inspiring: 0.9,
      candid: 0.8,
      empowering: 0.85,
      hopeful: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 8. The Song of Achilles
  // ─────────────────────────────────────────────
  {
    title: "The Song of Achilles",
    slug: "the-song-of-achilles",
    description:
      "A luminous retelling of the Iliad from the perspective of Patroclus, exploring his lifelong bond with Achilles from their boyhood to the Trojan War. A story of love, loss, and legend.",
    longDescription:
      "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. By all rights their paths should never cross, but Achilles takes the shamed prince as his companion, and as they grow into young men their bond blossoms into something far deeper. When word comes that Helen of Sparta has been kidnapped, Achilles must go to war in distant Troy and earn his place among the greatest of the Greeks. Patroclus follows, inseparable from the man who is both his best friend and his love. But the Fates have woven their threads, and glory has its price. Madeline Miller breathes new life into the ancient world with this deeply moving reimagining of Homer's Iliad.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062060624-L.jpg",
    pageCount: 378,
    language: "en",
    isbn13: "9780062060624",
    publishedDate: "2012-03-06",
    publisher: "Ecco",
    avgRating: 4.36,
    ratingsCount: 1100000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["devastating", "beautiful", "epic", "tender"],
    isFiction: true,
    authors: ["Madeline Miller"],
    genres: [
      "Historical Fiction",
      "Fantasy",
      "Mythology",
      "Literary Fiction",
      "LGBTQ+",
    ],
    themes: [
      "love",
      "fate",
      "glory",
      "mortality",
      "war",
      "devotion",
      "identity",
    ],
    tags: [
      "emotional",
      "literary",
      "epic",
      "romantic",
      "heartbreaking",
      "beautiful-prose",
    ],
    awards: [
      {
        name: "Orange Prize for Fiction",
        year: 2012,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The Guardian",
        content:
          "Mary Renault for a new generation: a captivating retelling that brings the ancient world to vivid, heartbreaking life.",
        rating: 4.5,
        highlight: "captivating retelling",
        sentiment: "positive",
      },
      {
        source: "Publishers Weekly",
        content:
          "Miller's prose is luminous and her love story achingly real, transforming myth into something deeply human.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "I could recognize him by touch alone, by smell; I would know him blind, by the way his breaths came and his feet struck the earth. I would know him in death, at the end of the world.",
      },
      {
        text: "He is half of my soul, as the poets say.",
      },
    ],
    similarBooks: ["circe", "a-little-life", "pride-and-prejudice"],
    personalityFit: {
      "deep-feeler": 0.95,
      "soulful-romantic": 0.95,
      "intellectual-strategist": 0.4,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.7,
      "mindful-philosopher": 0.5,
      "social-connector": 0.4,
      "resilient-survivor": 0.5,
    },
    themeVector: {
      love: 0.95,
      fate: 0.85,
      glory: 0.7,
      mortality: 0.8,
      war: 0.65,
      devotion: 0.9,
    },
    toneVector: {
      devastating: 0.85,
      beautiful: 0.9,
      epic: 0.8,
      tender: 0.85,
      lyrical: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 9. Thinking, Fast and Slow
  // ─────────────────────────────────────────────
  {
    title: "Thinking, Fast and Slow",
    slug: "thinking-fast-and-slow",
    description:
      "Nobel laureate Daniel Kahneman reveals the two systems that drive the way we think -- System 1 (fast, intuitive) and System 2 (slow, deliberate) -- and how they shape our judgments and decisions.",
    longDescription:
      "In this international bestseller, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. Kahneman exposes the extraordinary capabilities -- and also the faults and biases -- of fast thinking, and reveals the pervasive influence of intuitive impressions on our thoughts and behavior. The impact of overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the profound effect of cognitive biases on everything from playing the stock market to planning our next vacation -- each of these can be understood only by knowing how the two systems shape our judgments and decisions.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
    pageCount: 499,
    language: "en",
    isbn13: "9780374533557",
    publishedDate: "2011-10-25",
    publisher: "Farrar, Straus and Giroux",
    avgRating: 4.18,
    ratingsCount: 800000,
    readingDifficulty: "challenging",
    pacing: "slow",
    emotionalTone: ["intellectual", "illuminating", "dense"],
    isFiction: false,
    authors: ["Daniel Kahneman"],
    genres: [
      "Nonfiction",
      "Psychology",
      "Science",
      "Economics",
      "Behavioral Science",
    ],
    themes: [
      "cognition",
      "decision-making",
      "bias",
      "rationality",
      "intuition",
      "behavioral economics",
    ],
    tags: [
      "intellectual",
      "dense",
      "groundbreaking",
      "scientific",
      "essential",
      "challenging",
    ],
    awards: [
      {
        name: "National Academy of Sciences Best Book Award",
        year: 2012,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A masterwork of psychology that explains, with scientific rigor and human warmth, how our minds mislead us.",
        rating: 5,
        highlight: "masterwork of psychology",
        sentiment: "positive",
      },
      {
        source: "The Economist",
        content:
          "Profound and engaging -- a book that demands attention and repays it with genuine insight into the human mind.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "A reliable way to make people believe in falsehoods is frequent repetition, because familiarity is not easily distinguished from truth.",
      },
      {
        text: "Nothing in life is as important as you think it is, while you are thinking about it.",
      },
    ],
    similarBooks: ["atomic-habits", "sapiens", "range", "quiet"],
    personalityFit: {
      "deep-feeler": 0.2,
      "soulful-romantic": 0.05,
      "intellectual-strategist": 0.95,
      "ambitious-builder": 0.7,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.8,
      "social-connector": 0.3,
      "resilient-survivor": 0.3,
    },
    themeVector: {
      cognition: 0.95,
      "decision-making": 0.9,
      bias: 0.9,
      rationality: 0.85,
      intuition: 0.8,
      "behavioral-economics": 0.75,
    },
    toneVector: {
      intellectual: 0.95,
      illuminating: 0.85,
      dense: 0.8,
      rigorous: 0.9,
      measured: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 10. The Seven Husbands of Evelyn Hugo
  // ─────────────────────────────────────────────
  {
    title: "The Seven Husbands of Evelyn Hugo",
    slug: "the-seven-husbands-of-evelyn-hugo",
    description:
      "Aging Hollywood icon Evelyn Hugo finally tells the truth about her glamorous and scandalous life, including her seven marriages and one great love. A dazzling tale of ambition, love, and identity.",
    longDescription:
      "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more surprised than Monique herself. Summoned to Evelyn's luxurious Upper East Side apartment, Monique listens in fascination as the actress tells her story: from making her way to 1960s Los Angeles, to her decision to leave behind everything she knows for a shot at stardom, to navigating the ruthless world of Old Hollywood, to the seven husbands along the way. As the two women become closer, Monique begins to uncover a connection between herself and the legendary starlet that will change both of their lives forever.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg",
    pageCount: 389,
    language: "en",
    isbn13: "9781501161933",
    publishedDate: "2017-06-13",
    publisher: "Atria Books",
    avgRating: 4.46,
    ratingsCount: 1400000,
    readingDifficulty: "easy",
    pacing: "fast",
    emotionalTone: ["glamorous", "heartbreaking", "empowering", "captivating"],
    isFiction: true,
    authors: ["Taylor Jenkins Reid"],
    genres: [
      "Historical Fiction",
      "Romance",
      "LGBTQ+",
      "Contemporary Fiction",
    ],
    themes: [
      "love",
      "ambition",
      "identity",
      "sexuality",
      "sacrifice",
      "fame",
    ],
    tags: [
      "page-turner",
      "emotional",
      "glamorous",
      "LGBTQ+",
      "compelling",
      "dramatic",
    ],
    awards: [],
    adaptations: [
      {
        type: "Film",
        title: "The Seven Husbands of Evelyn Hugo",
        platform: "Netflix",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A wildly addictive journey through Old Hollywood's most decadent era, anchored by a magnetic, complex heroine.",
        rating: 4,
        highlight: "wildly addictive",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "A breathless page-turner with genuine emotional depth -- Reid's best work to date.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "I think we are only capable of loving the way we were taught to love. I had the most selfish form of love.",
      },
      {
        text: "Heartbreak is loss. Divorce is a piece of paper.",
      },
    ],
    similarBooks: [
      "normal-people",
      "the-vanishing-half",
      "the-song-of-achilles",
    ],
    personalityFit: {
      "deep-feeler": 0.85,
      "soulful-romantic": 0.9,
      "intellectual-strategist": 0.3,
      "ambitious-builder": 0.7,
      "creative-explorer": 0.6,
      "mindful-philosopher": 0.3,
      "social-connector": 0.75,
      "resilient-survivor": 0.7,
    },
    themeVector: {
      love: 0.9,
      ambition: 0.85,
      identity: 0.8,
      sexuality: 0.75,
      sacrifice: 0.7,
      fame: 0.8,
    },
    toneVector: {
      glamorous: 0.85,
      heartbreaking: 0.8,
      empowering: 0.7,
      captivating: 0.9,
      dramatic: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 11. Where the Crawdads Sing
  // ─────────────────────────────────────────────
  {
    title: "Where the Crawdads Sing",
    slug: "where-the-crawdads-sing",
    description:
      "Kya Clark, the so-called 'Marsh Girl,' survives alone in the marshes of North Carolina. When the local quarterback is found dead, she becomes the prime suspect in a story of nature, loneliness, and resilience.",
    longDescription:
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. Kya Clark is barefoot and wild; unfit for polite society. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life -- until the unthinkable happens. Delia Owens weaves a coming-of-age story, a love story, and a murder mystery into a gorgeous novel.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735219090-L.jpg",
    pageCount: 368,
    language: "en",
    isbn13: "9780735219090",
    publishedDate: "2018-08-14",
    publisher: "G.P. Putnam's Sons",
    avgRating: 4.46,
    ratingsCount: 2000000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["atmospheric", "poignant", "suspenseful", "lyrical"],
    isFiction: true,
    authors: ["Delia Owens"],
    genres: [
      "Fiction",
      "Mystery",
      "Literary Fiction",
      "Coming-of-Age",
      "Southern Gothic",
    ],
    themes: [
      "isolation",
      "nature",
      "survival",
      "love",
      "prejudice",
      "resilience",
    ],
    tags: [
      "atmospheric",
      "mystery",
      "nature-writing",
      "emotional",
      "page-turner",
      "lyrical",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Fiction",
        year: 2018,
        won: false,
      },
    ],
    adaptations: [
      {
        type: "Film",
        title: "Where the Crawdads Sing",
        year: 2022,
        director: "Olivia Newman",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A painfully beautiful first novel that is at once a murder mystery, a coming-of-age narrative, and a celebration of nature.",
        rating: 4,
        highlight: "painfully beautiful",
        sentiment: "positive",
      },
      {
        source: "Publishers Weekly",
        content:
          "Owens' ode to the natural world is immersive and lush, though the mystery plot strains credulity at times.",
        rating: 3.5,
        sentiment: "mixed",
      },
    ],
    quotes: [
      {
        text: "I wasn't aware that words could hold so much. I didn't know a sentence could be so full.",
      },
      {
        text: "Autumn leaves don't fall, they fly. They take their time and wander on this their only chance to soar.",
      },
    ],
    similarBooks: [
      "the-kite-runner",
      "to-kill-a-mockingbird",
      "the-vanishing-half",
    ],
    personalityFit: {
      "deep-feeler": 0.85,
      "soulful-romantic": 0.7,
      "intellectual-strategist": 0.3,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.75,
      "mindful-philosopher": 0.6,
      "social-connector": 0.3,
      "resilient-survivor": 0.9,
    },
    themeVector: {
      isolation: 0.9,
      nature: 0.95,
      survival: 0.85,
      love: 0.7,
      prejudice: 0.65,
      resilience: 0.85,
    },
    toneVector: {
      atmospheric: 0.95,
      poignant: 0.8,
      suspenseful: 0.7,
      lyrical: 0.85,
      immersive: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 12. Man's Search for Meaning
  // ─────────────────────────────────────────────
  {
    title: "Man's Search for Meaning",
    slug: "mans-search-for-meaning",
    description:
      "Viktor Frankl's memoir of surviving the Nazi death camps and his exploration of logotherapy -- the idea that the primary human drive is not pleasure but the pursuit of meaning.",
    longDescription:
      "Psychiatrist Viktor Frankl's memoir has riveted generations of readers with its descriptions of life in Nazi death camps and its lessons for spiritual survival. Between 1942 and 1945 Frankl labored in four different concentration camps, including Auschwitz, while his parents, brother, and pregnant wife perished. Based on his own experience and the experiences of others he treated later in his practice, Frankl argues that we cannot avoid suffering but we can choose how to cope with it, find meaning in it, and move forward with renewed purpose. Frankl's theory -- known as logotherapy, from the Greek word logos ('meaning') -- holds that our primary drive in life is not pleasure, as Freud maintained, but the discovery and pursuit of what we personally find meaningful. This book has sold over 16 million copies worldwide.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
    pageCount: 184,
    language: "en",
    isbn13: "9780807014295",
    publishedDate: "1946-01-01",
    publisher: "Beacon Press",
    avgRating: 4.37,
    ratingsCount: 900000,
    readingDifficulty: "moderate",
    pacing: "slow",
    emotionalTone: ["profound", "devastating", "hopeful", "philosophical"],
    isFiction: false,
    authors: ["Viktor E. Frankl"],
    genres: ["Nonfiction", "Psychology", "Philosophy", "Memoir", "History"],
    themes: [
      "meaning",
      "suffering",
      "freedom",
      "resilience",
      "hope",
      "human nature",
    ],
    tags: [
      "profound",
      "essential",
      "philosophical",
      "life-changing",
      "classic",
      "short",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "The Washington Post",
        content:
          "One of the outstanding contributions to psychological thought in the last century -- a book that everyone should read.",
        rating: 5,
        highlight: "outstanding contribution",
        sentiment: "positive",
      },
      {
        source: "The New York Times",
        content:
          "A slim volume of extraordinary power that distills the essence of what it means to be human in the face of the unimaginable.",
        rating: 5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "Everything can be taken from a man but one thing: the last of the human freedoms -- to choose one's attitude in any given set of circumstances.",
        page: 66,
      },
      {
        text: "When we are no longer able to change a situation, we are challenged to change ourselves.",
      },
    ],
    similarBooks: [
      "the-alchemist",
      "educated",
      "the-power-of-now",
      "the-body-keeps-the-score",
    ],
    personalityFit: {
      "deep-feeler": 0.85,
      "soulful-romantic": 0.3,
      "intellectual-strategist": 0.7,
      "ambitious-builder": 0.5,
      "creative-explorer": 0.4,
      "mindful-philosopher": 0.95,
      "social-connector": 0.4,
      "resilient-survivor": 0.95,
    },
    themeVector: {
      meaning: 0.95,
      suffering: 0.9,
      freedom: 0.85,
      resilience: 0.9,
      hope: 0.8,
      "human-nature": 0.75,
    },
    toneVector: {
      profound: 0.95,
      devastating: 0.7,
      hopeful: 0.75,
      philosophical: 0.9,
      solemn: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 13. The Subtle Art of Not Giving a F*ck
  // ─────────────────────────────────────────────
  {
    title: "The Subtle Art of Not Giving a F*ck",
    slug: "the-subtle-art-of-not-giving-a-fck",
    subtitle: "A Counterintuitive Approach to Living a Good Life",
    description:
      "Mark Manson delivers a brash wake-up call about accepting life's limitations and choosing what truly matters. A no-nonsense guide to living with honesty and grit.",
    longDescription:
      "In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be 'positive' all the time so that we can truly become better, happier people. For decades we've been told that positive thinking is the key to a happy life. Mark Manson says forget that. In his wildly popular blog, he doesn't sugarcoat or equivocate. He tells you what it is, and that's exactly what he does in this refreshingly honest book. Manson argues that life's struggles give it meaning, and that the mindless positivity of our culture is actually holding us back. He advises us to get to know our limitations and accept them, once we embrace our fears, faults, and uncertainties, we can begin to find the courage and confidence we desperately seek.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",
    pageCount: 224,
    language: "en",
    isbn13: "9780062457714",
    publishedDate: "2016-09-13",
    publisher: "Harper",
    avgRating: 3.92,
    ratingsCount: 1100000,
    readingDifficulty: "easy",
    pacing: "fast",
    emotionalTone: ["blunt", "humorous", "irreverent", "honest"],
    isFiction: false,
    authors: ["Mark Manson"],
    genres: ["Self-Help", "Nonfiction", "Psychology", "Philosophy"],
    themes: [
      "values",
      "suffering",
      "responsibility",
      "acceptance",
      "authenticity",
    ],
    tags: [
      "blunt",
      "funny",
      "practical",
      "no-nonsense",
      "popular",
      "quick-read",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "Kirkus Reviews",
        content:
          "A bracing, profanity-laced antidote to the feel-good self-help industry that actually contains solid psychological insights.",
        rating: 3.5,
        highlight: "bracing antidote",
        sentiment: "positive",
      },
      {
        source: "The Guardian",
        content:
          "Manson's irreverent tone may grate on some, but his core message about choosing your struggles wisely is genuinely useful.",
        rating: 3.5,
        sentiment: "mixed",
      },
    ],
    quotes: [
      {
        text: "Who you are is defined by what you're willing to struggle for.",
      },
      {
        text: "The desire for more positive experience is itself a negative experience. And, paradoxically, the acceptance of one's negative experience is itself a positive experience.",
      },
    ],
    similarBooks: ["atomic-habits", "the-power-of-now", "range"],
    personalityFit: {
      "deep-feeler": 0.3,
      "soulful-romantic": 0.1,
      "intellectual-strategist": 0.6,
      "ambitious-builder": 0.75,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.65,
      "social-connector": 0.5,
      "resilient-survivor": 0.8,
    },
    themeVector: {
      values: 0.9,
      suffering: 0.7,
      responsibility: 0.85,
      acceptance: 0.9,
      authenticity: 0.8,
    },
    toneVector: {
      blunt: 0.95,
      humorous: 0.8,
      irreverent: 0.9,
      honest: 0.85,
      energetic: 0.7,
    },
  },

  // ─────────────────────────────────────────────
  // 14. Circe
  // ─────────────────────────────────────────────
  {
    title: "Circe",
    slug: "circe",
    description:
      "Madeline Miller reimagines the life of Circe, the enchantress from Greek mythology, as she discovers her powers and defies the gods. A sweeping feminist retelling of an ancient legend.",
    longDescription:
      "In the house of Helios, god of the sun, a daughter is born -- but Circe is a strange child, not powerful like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power: the power of witchcraft, which can transform rivals into monsters and menace the gods themselves. Threatened, Zeus banishes her to the island of Aiaia, where she hones her craft, tames wild beasts, and crosses paths with many of the most famous figures of Greek mythology, including the Minotaur, Daedalus, Odysseus, and Medea. But there is danger for a woman who stands alone, and Circe unwittingly draws the wrath of both men and gods, ultimately finding she must choose between the world of the gods she was born into and the world of the mortals she has come to love.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg",
    pageCount: 393,
    language: "en",
    isbn13: "9780316556347",
    publishedDate: "2018-04-10",
    publisher: "Little, Brown and Company",
    avgRating: 4.27,
    ratingsCount: 900000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["empowering", "lush", "epic", "defiant"],
    isFiction: true,
    authors: ["Madeline Miller"],
    genres: [
      "Fantasy",
      "Historical Fiction",
      "Mythology",
      "Literary Fiction",
      "Feminist Fiction",
    ],
    themes: [
      "power",
      "identity",
      "womanhood",
      "transformation",
      "independence",
      "motherhood",
    ],
    tags: [
      "feminist",
      "epic",
      "beautiful-prose",
      "mythology",
      "empowering",
      "immersive",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Fantasy",
        year: 2018,
        won: false,
      },
    ],
    adaptations: [
      {
        type: "TV Series",
        title: "Circe",
        platform: "HBO Max",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A bold and subversive retelling that wrestles the story of Circe free from the male gaze and gives her a voice that rings with power.",
        rating: 4.5,
        highlight: "bold and subversive",
        sentiment: "positive",
      },
      {
        source: "NPR",
        content:
          "Miller's prose is as intoxicating as Circe's potions, weaving a feminist tale of self-realization that feels urgently modern.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "It is a common saying that women are delicate creatures, flowers, eggs, anything that may be broken with a touch. If I had ever believed it, I would not believe it now.",
      },
      {
        text: "I will not be shamed by a world that has shamed me enough already.",
      },
    ],
    similarBooks: [
      "the-song-of-achilles",
      "the-seven-husbands-of-evelyn-hugo",
      "pride-and-prejudice",
    ],
    personalityFit: {
      "deep-feeler": 0.8,
      "soulful-romantic": 0.7,
      "intellectual-strategist": 0.5,
      "ambitious-builder": 0.5,
      "creative-explorer": 0.8,
      "mindful-philosopher": 0.6,
      "social-connector": 0.3,
      "resilient-survivor": 0.85,
    },
    themeVector: {
      power: 0.85,
      identity: 0.9,
      womanhood: 0.9,
      transformation: 0.85,
      independence: 0.9,
      motherhood: 0.65,
    },
    toneVector: {
      empowering: 0.9,
      lush: 0.85,
      epic: 0.8,
      defiant: 0.85,
      lyrical: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 15. Dune
  // ─────────────────────────────────────────────
  {
    title: "Dune",
    slug: "dune",
    description:
      "Frank Herbert's epic science fiction masterpiece set on the desert planet Arrakis, where young Paul Atreides is thrust into a galactic struggle over the most valuable substance in the universe.",
    longDescription:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is 'melange,' a spice drug capable of extending life and expanding consciousness. Coveted across the known universe, melange is a prize worth killing for. When House Atreides is betrayed, Paul must journey into the planet's vast desert, where he encounters the Fremen, a people whose ways are based on the ecological necessities of their planet. As Paul rises among them, he begins to fulfill a prophecy that could change the course of human history. A stunning blend of adventure and mysticism, environmentalism and politics, Dune is a towering achievement in world-building and one of the most influential science fiction novels ever written.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg",
    pageCount: 688,
    language: "en",
    isbn13: "9780441013593",
    publishedDate: "1965-08-01",
    publisher: "Ace Books",
    avgRating: 4.26,
    ratingsCount: 1200000,
    readingDifficulty: "challenging",
    pacing: "slow",
    emotionalTone: ["epic", "intense", "complex", "philosophical"],
    isFiction: true,
    authors: ["Frank Herbert"],
    genres: [
      "Science Fiction",
      "Fantasy",
      "Classic",
      "Epic",
      "Political Fiction",
    ],
    themes: [
      "power",
      "ecology",
      "religion",
      "destiny",
      "politics",
      "survival",
    ],
    tags: [
      "epic",
      "complex",
      "world-building",
      "classic",
      "philosophical",
      "ambitious",
    ],
    awards: [
      { name: "Hugo Award", category: "Best Novel", year: 1966, won: true },
      { name: "Nebula Award", category: "Best Novel", year: 1966, won: true },
    ],
    adaptations: [
      {
        type: "Film",
        title: "Dune",
        year: 2021,
        director: "Denis Villeneuve",
      },
      {
        type: "Film",
        title: "Dune: Part Two",
        year: 2024,
        director: "Denis Villeneuve",
      },
      {
        type: "Film",
        title: "Dune",
        year: 1984,
        director: "David Lynch",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A monumental work of science fiction -- Herbert has created an intricate, fully realized world that rivals Tolkien's Middle-earth.",
        rating: 5,
        highlight: "monumental work",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "Dense and demanding but ultimately rewarding, Dune builds a universe of staggering ambition and prophetic environmental themes.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
        page: 8,
      },
      {
        text: "The mystery of life isn't a problem to solve, but a reality to experience.",
      },
    ],
    similarBooks: [
      "project-hail-mary",
      "the-name-of-the-wind",
      "1984",
      "klara-and-the-sun",
    ],
    personalityFit: {
      "deep-feeler": 0.4,
      "soulful-romantic": 0.2,
      "intellectual-strategist": 0.9,
      "ambitious-builder": 0.7,
      "creative-explorer": 0.85,
      "mindful-philosopher": 0.75,
      "social-connector": 0.3,
      "resilient-survivor": 0.7,
    },
    themeVector: {
      power: 0.9,
      ecology: 0.85,
      religion: 0.7,
      destiny: 0.8,
      politics: 0.85,
      survival: 0.75,
    },
    toneVector: {
      epic: 0.95,
      intense: 0.8,
      complex: 0.9,
      philosophical: 0.8,
      grand: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 16. Project Hail Mary
  // ─────────────────────────────────────────────
  {
    title: "Project Hail Mary",
    slug: "project-hail-mary",
    description:
      "Ryland Grace wakes up alone on a spaceship with no memory of how he got there. As a lone astronaut on an impossible mission, he must save Earth from extinction with only science and ingenuity.",
    longDescription:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission -- and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company. His crewmates dead, his memories fuzzily returning, Ryland realizes that an impossible task now confronts him. Alone on this tiny ship, it's up to him to puzzle out an impossible scientific mystery -- and conquer an extinction-level threat to our species. Andy Weir delivers a gripping, witty, and deeply satisfying science fiction adventure.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
    pageCount: 476,
    language: "en",
    isbn13: "9780593135204",
    publishedDate: "2021-05-04",
    publisher: "Ballantine Books",
    avgRating: 4.52,
    ratingsCount: 800000,
    readingDifficulty: "moderate",
    pacing: "fast",
    emotionalTone: ["thrilling", "funny", "heartwarming", "suspenseful"],
    isFiction: true,
    authors: ["Andy Weir"],
    genres: ["Science Fiction", "Adventure", "Thriller"],
    themes: [
      "survival",
      "science",
      "friendship",
      "problem-solving",
      "sacrifice",
      "hope",
    ],
    tags: [
      "fast-paced",
      "fun",
      "nerdy",
      "page-turner",
      "heartwarming",
      "science-heavy",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Science Fiction",
        year: 2021,
        won: true,
      },
      { name: "Hugo Award", category: "Best Novel", year: 2022, won: false },
    ],
    adaptations: [
      {
        type: "Film",
        title: "Project Hail Mary",
        director: "Phil Lord & Christopher Miller",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A delightful interstellar adventure that's somehow both scientifically rigorous and utterly heartwarming.",
        rating: 4.5,
        highlight: "delightful interstellar adventure",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "Weir proves that hard science fiction can be funny, emotional, and wildly entertaining all at once.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "I penetrated the outer hull of an alien vessel with a rock. I'm pretty sure this violates some space law.",
      },
      {
        text: "Sometimes, the stuff you're good at and the stuff you want to do are different things.",
      },
    ],
    similarBooks: [
      "dune",
      "the-name-of-the-wind",
      "the-midnight-library",
    ],
    personalityFit: {
      "deep-feeler": 0.5,
      "soulful-romantic": 0.2,
      "intellectual-strategist": 0.9,
      "ambitious-builder": 0.7,
      "creative-explorer": 0.8,
      "mindful-philosopher": 0.3,
      "social-connector": 0.5,
      "resilient-survivor": 0.85,
    },
    themeVector: {
      survival: 0.95,
      science: 0.95,
      friendship: 0.8,
      "problem-solving": 0.9,
      sacrifice: 0.7,
      hope: 0.85,
    },
    toneVector: {
      thrilling: 0.85,
      funny: 0.8,
      heartwarming: 0.75,
      suspenseful: 0.8,
      energetic: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 17. The Body Keeps the Score
  // ─────────────────────────────────────────────
  {
    title: "The Body Keeps the Score",
    slug: "the-body-keeps-the-score",
    subtitle: "Brain, Mind, and Body in the Healing of Trauma",
    description:
      "Dr. Bessel van der Kolk draws on decades of research to show how trauma reshapes the body and brain, and explores innovative treatments that offer new paths to recovery.",
    longDescription:
      "Renowned trauma expert Bessel van der Kolk has spent over three decades working with survivors. In The Body Keeps the Score, he uses recent scientific advances to show how trauma literally reshapes both body and brain, compromising sufferers' capacities for pleasure, engagement, self-control, and trust. He explores innovative treatments -- from neurofeedback to meditation, from EMDR to yoga and theater -- that offer new paths to recovery by activating the brain's natural neuroplasticity. Based on his pioneering research and that of other leading specialists, van der Kolk shows that the terror and isolation at the core of trauma literally reshape both brain and body, and that healing must engage the whole organism. This book is essential reading for anyone interested in understanding and treating traumatic stress.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780143127741-L.jpg",
    pageCount: 464,
    language: "en",
    isbn13: "9780143127741",
    publishedDate: "2014-09-25",
    publisher: "Penguin Books",
    avgRating: 4.39,
    ratingsCount: 500000,
    readingDifficulty: "moderate",
    pacing: "slow",
    emotionalTone: ["compassionate", "clinical", "eye-opening", "intense"],
    isFiction: false,
    authors: ["Bessel van der Kolk"],
    genres: ["Nonfiction", "Psychology", "Science", "Health", "Neuroscience"],
    themes: [
      "trauma",
      "healing",
      "neuroscience",
      "mental health",
      "body-mind connection",
      "recovery",
    ],
    tags: [
      "essential",
      "scientific",
      "compassionate",
      "eye-opening",
      "healing",
      "dense",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A pioneering work that fundamentally changes how we understand trauma and the body's role in processing it.",
        rating: 5,
        highlight: "pioneering work",
        sentiment: "positive",
      },
      {
        source: "Publishers Weekly",
        content:
          "Van der Kolk's compassionate authority makes this scientifically dense material accessible and profoundly hopeful.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "Being able to feel safe with other people is probably the single most important aspect of mental health.",
      },
      {
        text: "As long as you keep secrets and suppress information, you are fundamentally at war with yourself.",
      },
    ],
    similarBooks: [
      "mans-search-for-meaning",
      "thinking-fast-and-slow",
      "quiet",
      "the-power-of-now",
    ],
    personalityFit: {
      "deep-feeler": 0.8,
      "soulful-romantic": 0.2,
      "intellectual-strategist": 0.75,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.4,
      "mindful-philosopher": 0.7,
      "social-connector": 0.5,
      "resilient-survivor": 0.9,
    },
    themeVector: {
      trauma: 0.95,
      healing: 0.9,
      neuroscience: 0.85,
      "mental-health": 0.9,
      "body-mind-connection": 0.9,
      recovery: 0.85,
    },
    toneVector: {
      compassionate: 0.85,
      clinical: 0.7,
      "eye-opening": 0.9,
      intense: 0.65,
      hopeful: 0.6,
    },
  },

  // ─────────────────────────────────────────────
  // 18. A Little Life
  // ─────────────────────────────────────────────
  {
    title: "A Little Life",
    slug: "a-little-life",
    description:
      "A devastating portrait of four college classmates in New York City whose lives are shaped by the traumatic past of the enigmatic Jude. An unflinching exploration of friendship, pain, and love.",
    longDescription:
      "When four classmates from a small Massachusetts college move to New York to make their way, they're broke, adrift, and buoyed only by their friendship and ambition. There is kind, handsome Willem, an aspiring actor; JB, a painter; Malcolm, an architect; and withdrawn, brilliant, enigmatic Jude, who is the group's heart. Over the decades, their relationships deepen and darken, impacted most profoundly by Jude, whose traumatic childhood has left him unable to trust or open himself to others. Hanya Yanagihara's novel is about the limits of human endurance, the persistence of memory, and the redemptive power of love. It is one of the most emotionally devastating novels of the twenty-first century, a book that demands everything of its reader and gives everything in return.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780385539258-L.jpg",
    pageCount: 720,
    language: "en",
    isbn13: "9780385539258",
    publishedDate: "2015-03-10",
    publisher: "Doubleday",
    avgRating: 4.31,
    ratingsCount: 600000,
    readingDifficulty: "challenging",
    pacing: "slow",
    emotionalTone: ["devastating", "beautiful", "harrowing", "tender"],
    isFiction: true,
    authors: ["Hanya Yanagihara"],
    genres: ["Literary Fiction", "Contemporary Fiction", "LGBTQ+"],
    themes: [
      "trauma",
      "friendship",
      "suffering",
      "love",
      "abuse",
      "identity",
      "endurance",
    ],
    tags: [
      "dark",
      "emotional",
      "literary",
      "devastating",
      "long",
      "intense",
      "beautiful-prose",
    ],
    awards: [
      { name: "Booker Prize", year: 2015, won: false },
      {
        name: "National Book Award",
        category: "Fiction",
        year: 2015,
        won: false,
      },
      {
        name: "Kirkus Prize",
        category: "Fiction",
        year: 2015,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The New York Times",
        content:
          "An immensely powerful novel that provokes a kind of emotional reckoning most fiction can only aspire to.",
        rating: 5,
        highlight: "immensely powerful",
        sentiment: "positive",
      },
      {
        source: "The Guardian",
        content:
          "Yanagihara writes with brutal honesty about pain and tenderness; this is not an easy read, but it is an unforgettable one.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "You won't understand what I mean now, but someday you will: the only trick of friendship, I think, is to find people who are better than you are -- not smarter, not cooler, but kinder, and more generous, and more forgiving.",
      },
      {
        text: "Things get broken, and sometimes they get repaired, and in most cases, you realize that no matter what gets damaged, life rearranges itself to compensate for your loss, sometimes wonderfully.",
      },
    ],
    similarBooks: [
      "normal-people",
      "the-song-of-achilles",
      "the-kite-runner",
    ],
    personalityFit: {
      "deep-feeler": 0.95,
      "soulful-romantic": 0.7,
      "intellectual-strategist": 0.3,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.5,
      "social-connector": 0.4,
      "resilient-survivor": 0.8,
    },
    themeVector: {
      trauma: 0.95,
      friendship: 0.9,
      suffering: 0.95,
      love: 0.85,
      abuse: 0.8,
      identity: 0.7,
      endurance: 0.85,
    },
    toneVector: {
      devastating: 0.95,
      beautiful: 0.8,
      harrowing: 0.9,
      tender: 0.75,
      intense: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 19. The Power of Now
  // ─────────────────────────────────────────────
  {
    title: "The Power of Now",
    slug: "the-power-of-now",
    subtitle: "A Guide to Spiritual Enlightenment",
    description:
      "Eckhart Tolle's transformative guide to living in the present moment, freeing yourself from the tyranny of the mind, and finding peace and fulfillment beyond thought.",
    longDescription:
      "To make the journey into the Now we will need to leave our analytical mind and its false created self, the ego, behind. Although the journey is challenging, Eckhart Tolle uses simple language and a question-and-answer format to guide us. The Power of Now shows us that our pain, anxiety, and unhappiness are mostly created by identification with the mind and its compulsive thinking. Tolle describes how to connect with the indestructible essence of our Being, the eternal, ever-present One Life beyond the myriad forms of life that are subject to birth and death. This book, which has influenced millions, draws from a wide variety of spiritual traditions to deliver a simple message: living in the Now is the truest path to happiness and enlightenment.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",
    pageCount: 236,
    language: "en",
    isbn13: "9781577314806",
    publishedDate: "1997-01-01",
    publisher: "New World Library",
    avgRating: 4.15,
    ratingsCount: 700000,
    readingDifficulty: "moderate",
    pacing: "slow",
    emotionalTone: ["serene", "transformative", "peaceful", "profound"],
    isFiction: false,
    authors: ["Eckhart Tolle"],
    genres: ["Spirituality", "Self-Help", "Nonfiction", "Philosophy"],
    themes: [
      "mindfulness",
      "presence",
      "consciousness",
      "ego",
      "inner peace",
      "enlightenment",
    ],
    tags: [
      "spiritual",
      "transformative",
      "philosophical",
      "meditative",
      "classic",
      "calming",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "Oprah Winfrey",
        content:
          "A book that has the potential to change your life -- I keep it at my bedside.",
        rating: 5,
        highlight: "change your life",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "Tolle's message is simple but not simplistic -- a genuine guide to inner peace that transcends religious boundaries.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.",
      },
      {
        text: "The primary cause of unhappiness is never the situation but your thoughts about it.",
      },
    ],
    similarBooks: [
      "the-alchemist",
      "mans-search-for-meaning",
      "the-midnight-library",
    ],
    personalityFit: {
      "deep-feeler": 0.6,
      "soulful-romantic": 0.3,
      "intellectual-strategist": 0.4,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.95,
      "social-connector": 0.3,
      "resilient-survivor": 0.65,
    },
    themeVector: {
      mindfulness: 0.95,
      presence: 0.95,
      consciousness: 0.9,
      ego: 0.8,
      "inner-peace": 0.9,
      enlightenment: 0.85,
    },
    toneVector: {
      serene: 0.95,
      transformative: 0.85,
      peaceful: 0.9,
      profound: 0.8,
      gentle: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 20. Pride and Prejudice
  // ─────────────────────────────────────────────
  {
    title: "Pride and Prejudice",
    slug: "pride-and-prejudice",
    description:
      "Jane Austen's beloved classic follows the spirited Elizabeth Bennet as she navigates love, class, and family in Regency-era England, sparring with the proud Mr. Darcy.",
    longDescription:
      "Since its publication in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. The story follows the Bennet family -- particularly the headstrong Elizabeth -- as they navigate the conventions of marriage, class, and propriety in Regency-era England. When the wealthy and seemingly arrogant Mr. Darcy enters Elizabeth's world, their mutual disdain gradually gives way to deeper understanding and, ultimately, love. Austen's razor-sharp wit, keen social observation, and unforgettable characters have made this novel an enduring masterpiece that continues to captivate readers more than two centuries later.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    pageCount: 432,
    language: "en",
    isbn13: "9780141439518",
    publishedDate: "1813-01-28",
    publisher: "Penguin Classics",
    avgRating: 4.28,
    ratingsCount: 4000000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["witty", "romantic", "charming", "sharp"],
    isFiction: true,
    authors: ["Jane Austen"],
    genres: [
      "Classic",
      "Romance",
      "Literary Fiction",
      "Historical Fiction",
    ],
    themes: [
      "pride",
      "prejudice",
      "love",
      "class",
      "marriage",
      "social norms",
    ],
    tags: [
      "classic",
      "romantic",
      "witty",
      "timeless",
      "literary",
      "beloved",
    ],
    awards: [],
    adaptations: [
      {
        type: "Film",
        title: "Pride & Prejudice",
        year: 2005,
        director: "Joe Wright",
      },
      {
        type: "TV Series",
        title: "Pride and Prejudice",
        year: 1995,
        platform: "BBC",
      },
    ],
    reviews: [
      {
        source: "The Guardian",
        content:
          "The greatest English novel of all time -- Austen's wit and insight are as fresh and devastating today as they were in 1813.",
        rating: 5,
        highlight: "greatest English novel",
        sentiment: "positive",
      },
      {
        source: "The New York Times",
        content:
          "Austen writes with such precision and irony that every sentence sparkles with intelligence.",
        rating: 5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        page: 1,
      },
      {
        text: "I was in the middle before I knew that I had begun.",
      },
    ],
    similarBooks: [
      "normal-people",
      "the-song-of-achilles",
      "the-seven-husbands-of-evelyn-hugo",
    ],
    personalityFit: {
      "deep-feeler": 0.6,
      "soulful-romantic": 0.95,
      "intellectual-strategist": 0.5,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.4,
      "social-connector": 0.7,
      "resilient-survivor": 0.4,
    },
    themeVector: {
      love: 0.9,
      class: 0.85,
      pride: 0.85,
      marriage: 0.8,
      "social-norms": 0.8,
      prejudice: 0.85,
    },
    toneVector: {
      witty: 0.95,
      romantic: 0.85,
      charming: 0.9,
      sharp: 0.8,
      elegant: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 21. 1984
  // ─────────────────────────────────────────────
  {
    title: "1984",
    slug: "1984",
    description:
      "George Orwell's chilling dystopia depicts a totalitarian society where Big Brother watches everything and the Thought Police punish independent thinking. A prophetic warning about power and truth.",
    longDescription:
      "Among the seminal texts of the twentieth century, Nineteen Eighty-Four is a rare work that grows more haunting as its prophetic vision approaches reality. Winston Smith is a low-ranking member of the Party in the nation of Oceania, where the omnipresent Big Brother controls every aspect of human life. The Party controls everything -- from history to language to thought. Winston works at the Ministry of Truth, where he rewrites historical records to match the Party's version of reality. When Winston begins a forbidden love affair and secretly rebels against the Party, he discovers the devastating extent of its power. Orwell's masterpiece remains the most compelling portrait of a totalitarian society ever written, and its vocabulary -- Big Brother, doublethink, thoughtcrime, Newspeak -- has become part of our cultural landscape.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    pageCount: 328,
    language: "en",
    isbn13: "9780451524935",
    publishedDate: "1949-06-08",
    publisher: "Signet Classic",
    avgRating: 4.19,
    ratingsCount: 4500000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["bleak", "terrifying", "oppressive", "thought-provoking"],
    isFiction: true,
    authors: ["George Orwell"],
    genres: [
      "Dystopian",
      "Classic",
      "Science Fiction",
      "Political Fiction",
    ],
    themes: [
      "totalitarianism",
      "surveillance",
      "truth",
      "freedom",
      "power",
      "propaganda",
    ],
    tags: [
      "dark",
      "classic",
      "prophetic",
      "essential",
      "political",
      "thought-provoking",
    ],
    awards: [
      {
        name: "Prometheus Hall of Fame Award",
        year: 1984,
        won: true,
      },
    ],
    adaptations: [
      {
        type: "Film",
        title: "Nineteen Eighty-Four",
        year: 1984,
        director: "Michael Radford",
      },
    ],
    reviews: [
      {
        source: "The Atlantic",
        content:
          "Orwell's nightmare vision has become our reality's mirror -- a book that grows more relevant with every passing year.",
        rating: 5,
        highlight: "grows more relevant",
        sentiment: "positive",
      },
      {
        source: "The Guardian",
        content:
          "The definitive novel about the horrors of totalitarianism, written with terrifying clarity and moral urgency.",
        rating: 5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "War is peace. Freedom is slavery. Ignorance is strength.",
        page: 4,
      },
      {
        text: "Who controls the past controls the future. Who controls the present controls the past.",
      },
    ],
    similarBooks: [
      "dune",
      "the-great-gatsby",
      "to-kill-a-mockingbird",
      "klara-and-the-sun",
    ],
    personalityFit: {
      "deep-feeler": 0.5,
      "soulful-romantic": 0.2,
      "intellectual-strategist": 0.85,
      "ambitious-builder": 0.4,
      "creative-explorer": 0.6,
      "mindful-philosopher": 0.8,
      "social-connector": 0.3,
      "resilient-survivor": 0.6,
    },
    themeVector: {
      totalitarianism: 0.95,
      surveillance: 0.9,
      truth: 0.9,
      freedom: 0.85,
      power: 0.9,
      propaganda: 0.85,
    },
    toneVector: {
      bleak: 0.9,
      terrifying: 0.85,
      oppressive: 0.9,
      "thought-provoking": 0.9,
      urgent: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 22. The Great Gatsby
  // ─────────────────────────────────────────────
  {
    title: "The Great Gatsby",
    slug: "the-great-gatsby",
    description:
      "F. Scott Fitzgerald's jazz-age masterpiece follows the mysterious Jay Gatsby and his obsessive pursuit of Daisy Buchanan, capturing the decadence and disillusionment of the American Dream.",
    longDescription:
      "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'ichmaking' as combinin as, the story of the mysterious millionaire and the American Dream has become a cornerstone of American literature. Through narrator Nick Carraway, Fitzgerald paints a vivid portrait of ambition, excess, and the hollowness at the heart of glamour. A slim masterpiece that says more about America in 200 pages than most novels manage in a thousand.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    pageCount: 180,
    language: "en",
    isbn13: "9780743273565",
    publishedDate: "1925-04-10",
    publisher: "Scribner",
    avgRating: 3.93,
    ratingsCount: 4800000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["melancholic", "glamorous", "tragic", "lyrical"],
    isFiction: true,
    authors: ["F. Scott Fitzgerald"],
    genres: ["Classic", "Literary Fiction", "Historical Fiction"],
    themes: [
      "American Dream",
      "wealth",
      "love",
      "obsession",
      "disillusionment",
      "class",
    ],
    tags: [
      "classic",
      "literary",
      "short",
      "beautiful-prose",
      "tragic",
      "American",
    ],
    awards: [],
    adaptations: [
      {
        type: "Film",
        title: "The Great Gatsby",
        year: 2013,
        director: "Baz Luhrmann",
      },
      {
        type: "Film",
        title: "The Great Gatsby",
        year: 1974,
        director: "Jack Clayton",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A glittering prose poem about the American Dream -- perhaps the most perfect American novel ever written.",
        rating: 5,
        highlight: "most perfect American novel",
        sentiment: "positive",
      },
      {
        source: "The Atlantic",
        content:
          "Fitzgerald captures the ecstasy and the ache of aspiration in prose of extraordinary beauty and economy.",
        rating: 5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "So we beat on, boats against the current, borne back ceaselessly into the past.",
        page: 180,
      },
      {
        text: "I hope she'll be a fool -- that's the best thing a girl can be in this world, a beautiful little fool.",
      },
    ],
    similarBooks: [
      "pride-and-prejudice",
      "1984",
      "to-kill-a-mockingbird",
    ],
    personalityFit: {
      "deep-feeler": 0.7,
      "soulful-romantic": 0.8,
      "intellectual-strategist": 0.5,
      "ambitious-builder": 0.5,
      "creative-explorer": 0.7,
      "mindful-philosopher": 0.6,
      "social-connector": 0.5,
      "resilient-survivor": 0.3,
    },
    themeVector: {
      "american-dream": 0.95,
      wealth: 0.9,
      love: 0.8,
      obsession: 0.85,
      disillusionment: 0.9,
      class: 0.75,
    },
    toneVector: {
      melancholic: 0.85,
      glamorous: 0.8,
      tragic: 0.85,
      lyrical: 0.9,
      elegant: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 23. To Kill a Mockingbird
  // ─────────────────────────────────────────────
  {
    title: "To Kill a Mockingbird",
    slug: "to-kill-a-mockingbird",
    description:
      "Harper Lee's Pulitzer Prize-winning novel, set in Depression-era Alabama, follows young Scout Finch as her father, Atticus, defends a Black man falsely accused of rape. A timeless story of justice and moral courage.",
    longDescription:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. To Kill a Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize and has become a classic of modern American literature. Through the young eyes of Scout and Jem Finch, Harper Lee explores with rich humor and unswerving honesty the irrationality of adult attitudes toward race and class in the Deep South of the 1930s. The conscience of a town steeped in prejudice, violence, and hypocrisy is pricked by the stamina and quiet heroism of one man's struggle for justice -- but the weight of history will have its say.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    pageCount: 336,
    language: "en",
    isbn13: "9780061120084",
    publishedDate: "1960-07-11",
    publisher: "Harper Perennial",
    avgRating: 4.27,
    ratingsCount: 5500000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["warm", "poignant", "sobering", "hopeful"],
    isFiction: true,
    authors: ["Harper Lee"],
    genres: [
      "Classic",
      "Literary Fiction",
      "Historical Fiction",
      "Coming-of-Age",
    ],
    themes: [
      "justice",
      "racism",
      "innocence",
      "moral courage",
      "empathy",
      "childhood",
    ],
    tags: [
      "classic",
      "essential",
      "timeless",
      "moral",
      "American",
      "coming-of-age",
    ],
    awards: [
      {
        name: "Pulitzer Prize",
        category: "Fiction",
        year: 1961,
        won: true,
      },
    ],
    adaptations: [
      {
        type: "Film",
        title: "To Kill a Mockingbird",
        year: 1962,
        director: "Robert Mulligan",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A novel of rare excellence -- a story of conscience that challenges readers with uncomfortable truths wrapped in compassion.",
        rating: 5,
        highlight: "rare excellence",
        sentiment: "positive",
      },
      {
        source: "Time Magazine",
        content:
          "Lee's masterpiece teaches empathy through the eyes of a child, and it has lost none of its power in over sixty years.",
        rating: 5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "You never really understand a person until you consider things from his point of view -- until you climb inside of his skin and walk around in it.",
        page: 30,
      },
      {
        text: "The one thing that doesn't abide by majority rule is a person's conscience.",
      },
    ],
    similarBooks: [
      "the-kite-runner",
      "where-the-crawdads-sing",
      "the-great-gatsby",
      "the-vanishing-half",
    ],
    personalityFit: {
      "deep-feeler": 0.8,
      "soulful-romantic": 0.4,
      "intellectual-strategist": 0.5,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.4,
      "mindful-philosopher": 0.75,
      "social-connector": 0.7,
      "resilient-survivor": 0.6,
    },
    themeVector: {
      justice: 0.95,
      racism: 0.9,
      innocence: 0.85,
      "moral-courage": 0.9,
      empathy: 0.9,
      childhood: 0.75,
    },
    toneVector: {
      warm: 0.8,
      poignant: 0.85,
      sobering: 0.8,
      hopeful: 0.65,
      compassionate: 0.85,
    },
  },

  // ─────────────────────────────────────────────
  // 24. The Kite Runner
  // ─────────────────────────────────────────────
  {
    title: "The Kite Runner",
    slug: "the-kite-runner",
    description:
      "Khaled Hosseini's powerful debut follows Amir and Hassan, two boys in Kabul whose friendship is torn apart by betrayal and class, and Amir's quest for redemption decades later.",
    longDescription:
      "The Kite Runner tells the story of Amir, a young boy from the Wazir Akbar Khan district of Kabul, whose closest friend is Hassan, the son of his father's Hazara servant. The story is set against a backdrop of tumultuous events, from the fall of Afghanistan's monarchy through the Soviet military intervention, the exodus of refugees to Pakistan and the United States, and the rise of the Taliban regime. When an act of cowardice and betrayal destroys the boys' friendship, Amir flees to America. Years later, he receives a call from a dying friend that offers him a chance to make amends -- a last opportunity to be the man his father always wanted him to be. A searing tale of betrayal, redemption, and the bonds between fathers and sons.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg",
    pageCount: 371,
    language: "en",
    isbn13: "9781594631931",
    publishedDate: "2003-05-29",
    publisher: "Riverhead Books",
    avgRating: 4.33,
    ratingsCount: 2800000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["heartbreaking", "raw", "redemptive", "haunting"],
    isFiction: true,
    authors: ["Khaled Hosseini"],
    genres: [
      "Literary Fiction",
      "Historical Fiction",
      "Coming-of-Age",
      "Contemporary Fiction",
    ],
    themes: [
      "redemption",
      "guilt",
      "friendship",
      "betrayal",
      "father-son",
      "war",
      "class",
    ],
    tags: [
      "emotional",
      "powerful",
      "heartbreaking",
      "page-turner",
      "cultural",
      "redemptive",
    ],
    awards: [],
    adaptations: [
      {
        type: "Film",
        title: "The Kite Runner",
        year: 2007,
        director: "Marc Forster",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "A vivid and engaging story that reminds us how long his people have been struggling to triumph over the forces of violence.",
        rating: 4.5,
        highlight: "vivid and engaging",
        sentiment: "positive",
      },
      {
        source: "The Washington Post",
        content:
          "Hosseini's debut novel is an intimate portrait of friendship and guilt set against the epic sweep of Afghan history.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "For you, a thousand times over.",
        page: 67,
      },
      {
        text: "There is a way to be good again.",
      },
    ],
    similarBooks: [
      "educated",
      "a-little-life",
      "to-kill-a-mockingbird",
      "where-the-crawdads-sing",
    ],
    personalityFit: {
      "deep-feeler": 0.9,
      "soulful-romantic": 0.5,
      "intellectual-strategist": 0.3,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.4,
      "mindful-philosopher": 0.6,
      "social-connector": 0.5,
      "resilient-survivor": 0.85,
    },
    themeVector: {
      redemption: 0.95,
      guilt: 0.9,
      friendship: 0.85,
      betrayal: 0.85,
      "father-son": 0.8,
      war: 0.7,
      class: 0.65,
    },
    toneVector: {
      heartbreaking: 0.9,
      raw: 0.8,
      redemptive: 0.85,
      haunting: 0.8,
      emotional: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 25. Quiet
  // ─────────────────────────────────────────────
  {
    title: "Quiet",
    slug: "quiet",
    subtitle:
      "The Power of Introverts in a World That Can't Stop Talking",
    description:
      "Susan Cain argues that our culture dramatically undervalues introverts, revealing the hidden strengths of the one-third to one-half of the population who prefer quiet contemplation.",
    longDescription:
      "At least one-third of the people we know are introverts. They are the ones who prefer listening to speaking; who innovate and create but dislike self-promotion; who favor working on their own over working in teams. In Quiet, Susan Cain argues that we dramatically undervalue introverts and shows how much we lose in doing so. She charts the rise of the Extrovert Ideal throughout the twentieth century and explores how deeply it has come to permeate our culture. Drawing on cutting-edge research in psychology and neuroscience, as well as examples from across history, science, and business, Cain makes the case for a reconsideration of the quiet and contemplative. This book has the power to permanently change how we see introverts and, equally important, how they see themselves.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307352156-L.jpg",
    pageCount: 352,
    language: "en",
    isbn13: "9780307352156",
    publishedDate: "2012-01-24",
    publisher: "Crown Publishing",
    avgRating: 4.08,
    ratingsCount: 500000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["validating", "informative", "thoughtful", "empowering"],
    isFiction: false,
    authors: ["Susan Cain"],
    genres: ["Nonfiction", "Psychology", "Self-Help", "Science"],
    themes: [
      "introversion",
      "personality",
      "society",
      "leadership",
      "creativity",
      "temperament",
    ],
    tags: [
      "validating",
      "research-based",
      "accessible",
      "empowering",
      "insightful",
      "popular-science",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "The New York Times",
        content:
          "An important book that shifts our thinking about the role of personality in society -- introverts everywhere will feel seen.",
        rating: 4,
        highlight: "important book",
        sentiment: "positive",
      },
      {
        source: "The Wall Street Journal",
        content:
          "Cain marshals an impressive body of evidence to challenge the Extrovert Ideal that pervades American culture.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "There's zero correlation between being the best talker and having the best ideas.",
      },
      {
        text: "Solitude matters, and for some people, it is the air that they breathe.",
      },
    ],
    similarBooks: [
      "thinking-fast-and-slow",
      "atomic-habits",
      "the-body-keeps-the-score",
      "invisible-women",
    ],
    personalityFit: {
      "deep-feeler": 0.7,
      "soulful-romantic": 0.3,
      "intellectual-strategist": 0.8,
      "ambitious-builder": 0.5,
      "creative-explorer": 0.65,
      "mindful-philosopher": 0.8,
      "social-connector": 0.4,
      "resilient-survivor": 0.5,
    },
    themeVector: {
      introversion: 0.95,
      personality: 0.9,
      society: 0.8,
      leadership: 0.6,
      creativity: 0.7,
      temperament: 0.85,
    },
    toneVector: {
      validating: 0.9,
      informative: 0.85,
      thoughtful: 0.85,
      empowering: 0.8,
      gentle: 0.7,
    },
  },

  // ─────────────────────────────────────────────
  // 26. The Name of the Wind
  // ─────────────────────────────────────────────
  {
    title: "The Name of the Wind",
    slug: "the-name-of-the-wind",
    description:
      "Kvothe, a legendary figure shrouded in myth, tells the true story of his life to a chronicler -- from his childhood in a troupe of traveling players to his years as an infamous arcanist.",
    longDescription:
      "Told in Kvothe's own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. From his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a legendary school of magic, The Name of the Wind is a masterwork that transports readers into the body and mind of a wizard. It is a rousing adventure told with such vivid detail and breathless pace that it has captivated millions of readers worldwide. Patrick Rothfuss has created a universe as rich and detailed as anything in fantasy literature, and at its center stands Kvothe -- part myth, part man, and wholly unforgettable.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
    pageCount: 662,
    language: "en",
    isbn13: "9780756404741",
    publishedDate: "2007-03-27",
    publisher: "DAW Books",
    avgRating: 4.55,
    ratingsCount: 700000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["enchanting", "adventurous", "lyrical", "nostalgic"],
    isFiction: true,
    authors: ["Patrick Rothfuss"],
    genres: ["Fantasy", "Epic Fantasy", "Fiction", "Adventure"],
    themes: [
      "storytelling",
      "music",
      "knowledge",
      "loss",
      "legend",
      "ambition",
    ],
    tags: [
      "epic",
      "immersive",
      "beautiful-prose",
      "fantasy",
      "beloved",
      "rich-world-building",
    ],
    awards: [
      {
        name: "Quill Award",
        category: "Science Fiction/Fantasy/Horror",
        year: 2007,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "Publishers Weekly",
        content:
          "Rothfuss has real talent, and his ability to create a fully fleshed protagonist in Kvothe is as impressive as any in recent fantasy.",
        rating: 4.5,
        highlight: "real talent",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "A magnificently rendered coming-of-age story set in a richly imagined world -- the best fantasy debut in years.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "Words are pale shadows of forgotten names. As names have power, words have power. Words can light fires in the minds of men.",
      },
      {
        text: "It's like everyone tells a story about themselves inside their own head. Always. All the time. That story makes you what you are.",
      },
    ],
    similarBooks: [
      "dune",
      "project-hail-mary",
      "the-house-in-the-cerulean-sea",
    ],
    personalityFit: {
      "deep-feeler": 0.7,
      "soulful-romantic": 0.6,
      "intellectual-strategist": 0.7,
      "ambitious-builder": 0.6,
      "creative-explorer": 0.95,
      "mindful-philosopher": 0.5,
      "social-connector": 0.4,
      "resilient-survivor": 0.65,
    },
    themeVector: {
      storytelling: 0.95,
      music: 0.8,
      knowledge: 0.85,
      loss: 0.75,
      legend: 0.85,
      ambition: 0.7,
    },
    toneVector: {
      enchanting: 0.9,
      adventurous: 0.85,
      lyrical: 0.85,
      nostalgic: 0.7,
      immersive: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 27. Anxious People
  // ─────────────────────────────────────────────
  {
    title: "Anxious People",
    slug: "anxious-people",
    description:
      "A failed bank robber takes a group of strangers hostage during an apartment open house, leading to an absurdly heartwarming exploration of human vulnerability and connection.",
    longDescription:
      "Looking at a real estate listing, a failed bank robber inadvertently takes an entire open-house viewing hostage. Each of the hostages carries the weight of a complicated life: a wealthy bank director and his wife who bicker incessantly, a young lesbian couple unsure whether they should go through with their plan, a lonely elderly woman who has been hiding a devastating secret, a disgraced man in a rabbit costume, and more. As police surround the building, the would-be robber and the hostages begin to understand each other's vulnerabilities in the most unlikely of ways. Fredrik Backman writes with warmth and humor about the messiness of being alive, showing that sometimes the most unlikely circumstances can bring out the best in people.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781501160844-L.jpg",
    pageCount: 341,
    language: "en",
    isbn13: "9781501160844",
    publishedDate: "2019-08-27",
    publisher: "Atria Books",
    avgRating: 4.10,
    ratingsCount: 600000,
    readingDifficulty: "easy",
    pacing: "medium",
    emotionalTone: ["heartwarming", "funny", "tender", "bittersweet"],
    isFiction: true,
    authors: ["Fredrik Backman"],
    genres: [
      "Fiction",
      "Contemporary Fiction",
      "Humor",
      "Literary Fiction",
    ],
    themes: [
      "human connection",
      "vulnerability",
      "forgiveness",
      "mental health",
      "kindness",
      "family",
    ],
    tags: [
      "heartwarming",
      "funny",
      "comforting",
      "quirky",
      "character-driven",
      "feel-good",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Fiction",
        year: 2020,
        won: false,
      },
    ],
    adaptations: [
      {
        type: "TV Series",
        title: "Anxious People",
        year: 2021,
        platform: "Netflix",
      },
    ],
    reviews: [
      {
        source: "The Washington Post",
        content:
          "Backman has a knack for making you laugh and cry on the same page -- this is a hug of a novel.",
        rating: 4,
        highlight: "hug of a novel",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "A cleverly structured mystery that's really about forgiveness and the messy beauty of being human.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "It's hard to know when to fight and when to give in. Hard to know when to feel ashamed and when to feel proud.",
      },
      {
        text: "You can always tell by looking at other people's carts in the supermarket how their day has been.",
      },
    ],
    similarBooks: [
      "the-midnight-library",
      "the-house-in-the-cerulean-sea",
      "normal-people",
    ],
    personalityFit: {
      "deep-feeler": 0.8,
      "soulful-romantic": 0.5,
      "intellectual-strategist": 0.2,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.6,
      "mindful-philosopher": 0.6,
      "social-connector": 0.85,
      "resilient-survivor": 0.6,
    },
    themeVector: {
      "human-connection": 0.95,
      vulnerability: 0.9,
      forgiveness: 0.85,
      "mental-health": 0.7,
      kindness: 0.85,
      family: 0.75,
    },
    toneVector: {
      heartwarming: 0.9,
      funny: 0.85,
      tender: 0.8,
      bittersweet: 0.7,
      quirky: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 28. Invisible Women
  // ─────────────────────────────────────────────
  {
    title: "Invisible Women",
    slug: "invisible-women",
    subtitle: "Data Bias in a World Designed for Men",
    description:
      "Caroline Criado Perez exposes the gender data gap -- how the systematic exclusion of women from data collection shapes a world that is built for men, with sometimes deadly consequences.",
    longDescription:
      "Imagine a world where your phone is too big for your hand, where your doctor prescribes a drug that is wrong for your body, where in a car accident you are 47% more likely to be seriously injured. If any of this sounds familiar, chances are that you're a woman. Invisible Women shows us how, in a world largely built for and by men, we are systematically ignoring half the population. From government policy and medical research, to technology, workplaces, and the media, Caroline Criado Perez brings together an impressive body of data to expose the gender data gap -- a gap in our knowledge that is at the root of perpetual, systemic discrimination against women. Direct, urgent, and eye-opening, this is a groundbreaking exploration of how data fails women.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781419729072-L.jpg",
    pageCount: 432,
    language: "en",
    isbn13: "9781419729072",
    publishedDate: "2019-03-12",
    publisher: "Abrams Press",
    avgRating: 4.17,
    ratingsCount: 150000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["eye-opening", "urgent", "infuriating", "empowering"],
    isFiction: false,
    authors: ["Caroline Criado Perez"],
    genres: [
      "Nonfiction",
      "Feminism",
      "Science",
      "Social Science",
      "Politics",
    ],
    themes: [
      "gender bias",
      "data",
      "inequality",
      "feminism",
      "systemic discrimination",
      "design",
    ],
    tags: [
      "eye-opening",
      "feminist",
      "research-based",
      "urgent",
      "important",
      "accessible",
    ],
    awards: [
      {
        name: "Royal Society Science Book Prize",
        year: 2019,
        won: true,
      },
      {
        name: "Financial Times & McKinsey Business Book of the Year",
        year: 2019,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "The Guardian",
        content:
          "A brilliantly argued, urgent book that should be required reading for policymakers, designers, and anyone who cares about equality.",
        rating: 5,
        highlight: "brilliantly argued",
        sentiment: "positive",
      },
      {
        source: "The Economist",
        content:
          "Criado Perez has produced a passionate, data-driven manifesto that exposes systemic gender bias with devastating clarity.",
        rating: 4.5,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "One of the most important things to say about the gender data gap is that it is not generally malicious, or even deliberate. Quite the opposite. It is simply the product of a way of thinking that has been around for millennia.",
      },
      {
        text: "When we exclude half of humanity from the production of knowledge, we lose out on potentially transformative insights.",
      },
    ],
    similarBooks: ["sapiens", "quiet", "thinking-fast-and-slow"],
    personalityFit: {
      "deep-feeler": 0.5,
      "soulful-romantic": 0.1,
      "intellectual-strategist": 0.85,
      "ambitious-builder": 0.6,
      "creative-explorer": 0.5,
      "mindful-philosopher": 0.6,
      "social-connector": 0.7,
      "resilient-survivor": 0.5,
    },
    themeVector: {
      "gender-bias": 0.95,
      data: 0.9,
      inequality: 0.9,
      feminism: 0.85,
      "systemic-discrimination": 0.85,
      design: 0.7,
    },
    toneVector: {
      "eye-opening": 0.95,
      urgent: 0.85,
      infuriating: 0.7,
      empowering: 0.75,
      rigorous: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 29. The House in the Cerulean Sea
  // ─────────────────────────────────────────────
  {
    title: "The House in the Cerulean Sea",
    slug: "the-house-in-the-cerulean-sea",
    description:
      "A by-the-book caseworker is sent to evaluate a mysterious orphanage for magical children and finds himself drawn to the island, its inhabitants, and their charismatic caretaker.",
    longDescription:
      "Linus Baker leads a quiet, lonely life as a caseworker at the Department in Charge of Magical Youth. When he's unexpectedly summoned by Extremely Upper Management, he's sent to Marsyas Island Orphanage, where six dangerous children are being raised by the charming and mysterious Arthur Parnassus. Linus must determine whether the children are threats to society, but as he gets to know the residents -- a gnome, a sprite, a wyvern, a tiny girl who can move things with her mind, a garden blob, and the Antichrist himself -- he starts to realize that love and belonging aren't exclusive to the so-called normal world. TJ Klune has written a warm, cozy fantasy about chosen family, acceptance, and the courage it takes to stand up for what's right.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781250217288-L.jpg",
    pageCount: 398,
    language: "en",
    isbn13: "9781250217288",
    publishedDate: "2020-03-17",
    publisher: "Tor Books",
    avgRating: 4.32,
    ratingsCount: 400000,
    readingDifficulty: "easy",
    pacing: "slow",
    emotionalTone: ["heartwarming", "cozy", "hopeful", "gentle"],
    isFiction: true,
    authors: ["TJ Klune"],
    genres: ["Fantasy", "Fiction", "LGBTQ+", "Cozy Fantasy"],
    themes: [
      "chosen family",
      "acceptance",
      "belonging",
      "prejudice",
      "love",
      "courage",
    ],
    tags: [
      "cozy",
      "heartwarming",
      "comforting",
      "LGBTQ+",
      "feel-good",
      "whimsical",
    ],
    awards: [
      { name: "Alex Award", year: 2021, won: true },
      {
        name: "Mythopoeic Fantasy Award",
        category: "Adult Literature",
        year: 2021,
        won: true,
      },
    ],
    adaptations: [],
    reviews: [
      {
        source: "NPR",
        content:
          "A sweet, warm hug of a book that gently insists on the power of love and the importance of standing up for the vulnerable.",
        rating: 4,
        highlight: "warm hug of a book",
        sentiment: "positive",
      },
      {
        source: "Publishers Weekly",
        content:
          "Klune delivers a cozy fantasy with genuine emotional depth, populated by irresistible characters you'll never want to leave.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "I am but paper. Unwanted. Ordinary. But I could be so much more if given the chance.",
      },
      {
        text: "Don't you wish you were free? Free to do what you want, be who you want, without fear of judgement?",
      },
    ],
    similarBooks: [
      "the-midnight-library",
      "anxious-people",
      "the-name-of-the-wind",
    ],
    personalityFit: {
      "deep-feeler": 0.85,
      "soulful-romantic": 0.7,
      "intellectual-strategist": 0.2,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.75,
      "mindful-philosopher": 0.5,
      "social-connector": 0.8,
      "resilient-survivor": 0.5,
    },
    themeVector: {
      "chosen-family": 0.95,
      acceptance: 0.9,
      belonging: 0.9,
      prejudice: 0.7,
      love: 0.85,
      courage: 0.7,
    },
    toneVector: {
      heartwarming: 0.95,
      cozy: 0.95,
      hopeful: 0.9,
      gentle: 0.9,
      whimsical: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 30. Klara and the Sun
  // ─────────────────────────────────────────────
  {
    title: "Klara and the Sun",
    slug: "klara-and-the-sun",
    description:
      "Told from the perspective of Klara, an Artificial Friend with extraordinary observational powers, this novel explores what it means to love and what it means to be human.",
    longDescription:
      "Klara is an Artificial Friend with outstanding observational qualities. From her place in the store, she watches carefully the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful that a customer will soon choose her, and when the possibility emerges that her circumstances may change forever, Klara is warned not to invest too much in the promises of humans. Kazuo Ishiguro's first novel after receiving the Nobel Prize in Literature gives us Klara's perspective on the world -- her limited but moving understanding of the human heart. Through Klara's eyes, Ishiguro explores fundamental questions about love, sacrifice, and what it means to truly know another person.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780593318171-L.jpg",
    pageCount: 303,
    language: "en",
    isbn13: "9780593318171",
    publishedDate: "2021-03-02",
    publisher: "Knopf",
    avgRating: 3.81,
    ratingsCount: 350000,
    readingDifficulty: "moderate",
    pacing: "slow",
    emotionalTone: ["haunting", "tender", "melancholic", "philosophical"],
    isFiction: true,
    authors: ["Kazuo Ishiguro"],
    genres: [
      "Literary Fiction",
      "Science Fiction",
      "Dystopian",
      "Speculative Fiction",
    ],
    themes: [
      "artificial intelligence",
      "love",
      "consciousness",
      "sacrifice",
      "humanity",
      "loneliness",
    ],
    tags: [
      "literary",
      "philosophical",
      "quiet",
      "haunting",
      "thought-provoking",
      "Nobel-Prize-author",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "The New York Times",
        content:
          "Ishiguro has written a quiet masterpiece that uses the perspective of a robot to illuminate the deepest aspects of human love.",
        rating: 4.5,
        highlight: "quiet masterpiece",
        sentiment: "positive",
      },
      {
        source: "The Guardian",
        content:
          "Beautiful and unsettling in equal measure, Klara and the Sun asks profound questions about consciousness and devotion.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "There was something very special, but it wasn't inside Josie. It was inside those who loved her.",
      },
      {
        text: "Do you believe in the human heart? I don't mean simply the organ, obviously. I'm speaking in the poetic sense.",
      },
    ],
    similarBooks: [
      "the-midnight-library",
      "1984",
      "dune",
      "the-great-gatsby",
    ],
    personalityFit: {
      "deep-feeler": 0.8,
      "soulful-romantic": 0.6,
      "intellectual-strategist": 0.65,
      "ambitious-builder": 0.2,
      "creative-explorer": 0.7,
      "mindful-philosopher": 0.85,
      "social-connector": 0.3,
      "resilient-survivor": 0.4,
    },
    themeVector: {
      "artificial-intelligence": 0.85,
      love: 0.85,
      consciousness: 0.8,
      sacrifice: 0.75,
      humanity: 0.9,
      loneliness: 0.7,
    },
    toneVector: {
      haunting: 0.85,
      tender: 0.8,
      melancholic: 0.75,
      philosophical: 0.85,
      quiet: 0.9,
    },
  },

  // ─────────────────────────────────────────────
  // 31. Range
  // ─────────────────────────────────────────────
  {
    title: "Range",
    slug: "range",
    subtitle: "Why Generalists Triumph in a Specialized World",
    description:
      "David Epstein makes a compelling case that in most fields, generalists -- not specialists -- are primed to excel. Breadth of experience and late specialization are the keys to success.",
    longDescription:
      "Plenty of experts argue that anyone who wants to develop a skill, play an instrument, or lead their field should start early, focus intensely, and rack up as many hours of deliberate practice as possible. But David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters, and scientists. He discovered that in most fields -- especially those that are complex and unpredictable -- generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one. They're also more creative, more agile, and able to make connections their more specialized peers can't see. Range shows that the way to excel is to sample widely, gain a breadth of experiences, take detours, and experiment relentlessly.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735214484-L.jpg",
    pageCount: 352,
    language: "en",
    isbn13: "9780735214484",
    publishedDate: "2019-05-28",
    publisher: "Riverhead Books",
    avgRating: 4.06,
    ratingsCount: 80000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["encouraging", "illuminating", "thought-provoking"],
    isFiction: false,
    authors: ["David Epstein"],
    genres: [
      "Nonfiction",
      "Science",
      "Psychology",
      "Business",
      "Self-Help",
    ],
    themes: [
      "generalism",
      "learning",
      "creativity",
      "expertise",
      "adaptability",
    ],
    tags: [
      "inspiring",
      "research-based",
      "counterintuitive",
      "accessible",
      "practical",
      "thought-provoking",
    ],
    awards: [],
    adaptations: [],
    reviews: [
      {
        source: "The Wall Street Journal",
        content:
          "An essential counterpoint to the '10,000 hours' dogma -- Epstein makes a persuasive case for the value of broad experience.",
        rating: 4,
        highlight: "essential counterpoint",
        sentiment: "positive",
      },
      {
        source: "Kirkus Reviews",
        content:
          "A thoughtful, well-researched argument that will comfort anyone who has ever felt behind for not specializing early.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "The challenge we all face is how to maintain the benefits of breadth, diverse experience, interdisciplinary thinking, and delayed concentration in a world that increasingly incentivizes, even demands, hyperspecialization.",
      },
      {
        text: "Compare yourself to yourself yesterday, not to younger people who aren't you.",
      },
    ],
    similarBooks: [
      "atomic-habits",
      "thinking-fast-and-slow",
      "sapiens",
      "quiet",
    ],
    personalityFit: {
      "deep-feeler": 0.3,
      "soulful-romantic": 0.1,
      "intellectual-strategist": 0.8,
      "ambitious-builder": 0.7,
      "creative-explorer": 0.9,
      "mindful-philosopher": 0.6,
      "social-connector": 0.5,
      "resilient-survivor": 0.5,
    },
    themeVector: {
      generalism: 0.95,
      learning: 0.9,
      creativity: 0.85,
      expertise: 0.8,
      adaptability: 0.85,
    },
    toneVector: {
      encouraging: 0.85,
      illuminating: 0.8,
      "thought-provoking": 0.8,
      optimistic: 0.75,
      engaging: 0.8,
    },
  },

  // ─────────────────────────────────────────────
  // 32. The Vanishing Half
  // ─────────────────────────────────────────────
  {
    title: "The Vanishing Half",
    slug: "the-vanishing-half",
    description:
      "Twin sisters born in a small Southern town take very different paths -- one secretly passes for white while the other returns home to raise her Black daughter. A multigenerational story of identity, race, and family.",
    longDescription:
      "The Vignes twin sisters will always be identical. But after growing up together in a small, southern Black community and running away at age sixteen, it's not just the shape of their lives that is different as adults, it's everything: their families, their communities, their racial identities. Many years later, one sister lives with her Black daughter in the same southern town she once tried to escape. The other secretly passes for white, and her white husband knows nothing of her past. Still, even separated by so many miles and so many lies, the fates of the twins remain intertwined. Weaving together multiple strands and generations of this family, Brit Bennett produces a story that is at once a riveting, emotional family story and a brilliant exploration of the American obsession with race and the insidious ways it shapes our identities.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg",
    pageCount: 343,
    language: "en",
    isbn13: "9780525536291",
    publishedDate: "2020-06-02",
    publisher: "Riverhead Books",
    avgRating: 4.10,
    ratingsCount: 600000,
    readingDifficulty: "moderate",
    pacing: "medium",
    emotionalTone: ["thought-provoking", "poignant", "sweeping", "intimate"],
    isFiction: true,
    authors: ["Brit Bennett"],
    genres: [
      "Literary Fiction",
      "Historical Fiction",
      "Contemporary Fiction",
    ],
    themes: [
      "race",
      "identity",
      "family",
      "passing",
      "secrets",
      "community",
    ],
    tags: [
      "literary",
      "thought-provoking",
      "multigenerational",
      "emotional",
      "American",
      "compelling",
    ],
    awards: [
      {
        name: "Goodreads Choice Award",
        category: "Historical Fiction",
        year: 2020,
        won: true,
      },
    ],
    adaptations: [
      {
        type: "TV Series",
        title: "The Vanishing Half",
        platform: "HBO",
      },
    ],
    reviews: [
      {
        source: "The New York Times",
        content:
          "An ambitious, absorbing novel that traces the lives of twin sisters through generations, exploring race and identity with nuance and power.",
        rating: 4.5,
        highlight: "ambitious, absorbing",
        sentiment: "positive",
      },
      {
        source: "The Washington Post",
        content:
          "Bennett writes with empathy and insight about the impossible choices people make when identity itself becomes a performance.",
        rating: 4,
        sentiment: "positive",
      },
    ],
    quotes: [
      {
        text: "The most dangerous part about pretending to be someone you're not is that you just might become that person.",
      },
      {
        text: "She'd always thought of herself as a girl who was only pretending, but what was the difference, really, if the pretending never stopped?",
      },
    ],
    similarBooks: [
      "the-seven-husbands-of-evelyn-hugo",
      "where-the-crawdads-sing",
      "to-kill-a-mockingbird",
    ],
    personalityFit: {
      "deep-feeler": 0.8,
      "soulful-romantic": 0.5,
      "intellectual-strategist": 0.5,
      "ambitious-builder": 0.3,
      "creative-explorer": 0.6,
      "mindful-philosopher": 0.7,
      "social-connector": 0.6,
      "resilient-survivor": 0.7,
    },
    themeVector: {
      race: 0.95,
      identity: 0.95,
      family: 0.85,
      passing: 0.9,
      secrets: 0.8,
      community: 0.7,
    },
    toneVector: {
      "thought-provoking": 0.85,
      poignant: 0.8,
      sweeping: 0.75,
      intimate: 0.8,
      literary: 0.85,
    },
  },
];
