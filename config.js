window.LOVE_STORY_CONFIG = {
  meta: {
    title: "致 雅蕾",
    finalOverlayEyebrow: "2026.4.26",
    finalOverlayTitle: "那我们就从今天开始",
    finalOverlayBody: "好好相爱吧",
    finalCloseLabel: "收好这份心意"
  },
  music: {
    src: "music/love.mp3",
    label: "背景音乐",
    autoplay: true
  },
  pages: [
    {
      id: "cover",
      date: "",
      title: "致 雅蕾",
      subtitle: "我们的故事",
      body: [],
      // hint: "向上滑动",
      images: [],
      layout: "cover",
      theme: {
        tone: "midnight",
        bg: "#0b1024",
        bg2: "#17264a",
        ink: "#f6f8ff",
        muted: "#b9c6e8",
        accent: "#94bfff",
        accent2: "#f7e9b4",
        paper: "rgba(255,255,255,.08)"
      },
      decorations: ["stars", "moon", "lightVeil", "breath"]
    },
    {
      id: "meeting",
      date: "那一天",
      title: "在人海茫茫中，我看见了你",
      subtitle: "初遇",
      body: [
        "在人海茫茫中的第一次相遇",
        "怦然心动的我，一次次鼓足勇气",
        "终于还是在即将各自进入永不相交的世界前",
        "发起了对话"
      ],
      images: [
        {
          src: "photos/meeting.jpg",
          alt: "初遇",
        }
      ],
      layout: "polaroid",
      theme: {
        tone: "violet",
        bg: "#17152a",
        bg2: "#4b3c65",
        ink: "#fff9f4",
        muted: "#e5dce9",
        accent: "#d9b7ff",
        accent2: "#ffd5d5",
        paper: "#fffaf3"
      },
      decorations: ["stars", "grain", "softPetals"]
    },
    {
      id: "first-date",
      date: "首次约会",
      title: "首次约会",
      subtitle: "电影《呼啸山庄》",
      body: [
        "虽然你是素颜+睡衣",
        "但我觉得你比我想象中还要好看"
      ],
      images: [
        {
          src: "photos/first-date.jpg",
          alt: "首次约会",
          caption: "第一次约会"
        }
      ],
      layout: "cinema",
      theme: {
        tone: "moonlight",
        bg: "#11192d",
        bg2: "#2d3958",
        ink: "#fffaf2",
        muted: "#d5dcee",
        accent: "#d8c7ff",
        accent2: "#ffe5bd",
        paper: "rgba(255,255,255,.1)"
      },
      decorations: ["stars", "moonPath"]
    },
    {
      id: "second-date",
      date: "第二次约会",
      subtitle: "花开得很盛，我的焦虑也停了下来",
      body: [
        "本来实验进度停滞emo的我",
        "见到你之后我的焦虑不安一扫而过",
        "对不起，让你久等了"
      ],
      images: [
        {
          src: "photos/bougainvillea-1.jpg",
          alt: "三角梅",
        },
        {
          src: "photos/bougainvillea-2.jpg",
          alt: "合照",
        },
        {
          src: "photos/bougainvillea-3.jpg",
          alt: "深大",
        },
        {
          src: "photos/bougainvillea-4.jpg",
          alt: "三角梅合照",
        }
      ],
      layout: "alternating",
      theme: {
        tone: "blossom",
        bg: "#fff8f2",
        bg2: "#ffdce8",
        ink: "#3d2a34",
        muted: "#8a6671",
        accent: "#f05f99",
        accent2: "#7fc8a5",
        paper: "rgba(255,255,255,.76)"
      },
      decorations: ["petals", "sunFlares"]
    },
    {
      id: "mar29",
      date: "3.29",
      title: "你来深大",
      body: [
        "一起自习 · 一起吃湘土豆 · 一起看电影",
        "你说我线下比线上正常很多哈哈哈"
      ],
      images: [
        {
          src: "photos/beaver-movie.jpg",
          alt: "河狸变身计划",
          caption: "《河狸变身计划》"
        }
      ],
      layout: "report",
      theme: {
        tone: "lilac",
        bg: "#f6f1ff",
        bg2: "#dfe8ff",
        ink: "#312d47",
        muted: "#6d6681",
        accent: "#6d81f5",
        accent2: "#ff9bc7",
        paper: "rgba(255,255,255,.7)"
      },
      decorations: ["reportGrid", "lightVeil"]
    },
    {
      id: "apr2",
      date: "4.2",
      // title: "烤肉与礼物",
      // subtitle: "烟火气里，藏着认真准备的心意",
      body: [
        "一起去吃烤肉",
        "给你带了迟到的生日礼物~"
      ],
      images: [
        {
          src: "photos/camera-gift.jpg",
          alt: "胶片相机",
        },
        {
          src: "photos/bbq.jpg",
          alt: "烤肉",
        }
      ],
      layout: "collage",
      theme: {
        tone: "amber",
        bg: "#fff3e6",
        bg2: "#ffbf8a",
        ink: "#41271f",
        muted: "#8a5a43",
        accent: "#ff8a3d",
        accent2: "#f3c66c",
        paper: "rgba(255,251,244,.78)"
      },
      decorations: ["warmLamp", "grain"]
    },
    {
      id: "apr4",
      date: "4.4",
      title: "小波折",
      // subtitle: "小波折",
      body: [
        "感受到了一些压力，我也难过了一阵",
        "但是和好后我们又变得更好啦",
        "",
        "感谢你清明节假期慰问",
        "突然给我带奶茶和点心"
      ],
      images: [],
      layout: "letter",
      theme: {
        tone: "turning",
        bg: "#d9e1ec",
        bg2: "#ffe5d4",
        ink: "#263044",
        muted: "#677187",
        accent: "#6d86a8",
        accent2: "#ff996f",
        paper: "rgba(255,255,255,.72)"
      },
      decorations: ["rainToWarm", "breath"]
    },
    {
      id: "apr10",
      date: "4.10",
      title: "我来找你了",
      subtitle: "白色雏菊：美好的开始，纯洁的爱",
      body: [
        "今天戴了项链，打扮得像精神小伙",
        "给你带了花，反差大到你反应不过来哈哈哈哈"
      ],
      images: [
        {
          src: "photos/necklace.png",
          alt: "项链",
          caption: "认真打扮"
        },
        {
          src: "photos/bouquet-1.jpg",
          alt: "花束",
          caption: "带着花来见你"
        },
        {
          src: "photos/bouquet-2.jpg",
          alt: "花束特写",
          caption: "美好的开始"
        }
      ],
      layout: "diagonal",
      theme: {
        tone: "daisy",
        bg: "#f8f6ed",
        bg2: "#f7d9c8",
        ink: "#312a22",
        muted: "#776a5e",
        accent: "#f1b85b",
        accent2: "#ffffff",
        paper: "rgba(255,255,255,.74)"
      },
      decorations: ["daisyGlow", "petals"]
    },
    {
      id: "apr12",
      date: "4.12",
      subtitle: "差一点迷路的时候，是你把缘分留住了",
      body: [
        "我以为你对我没有生理性喜欢",
        "挫败感很强，很迷茫",
        "",
        "很感谢你的珍惜和重视",
        "我们的缘分不该到此结束"
      ],
      images: [
        {
          src: "photos/apr12.jpg",
          alt: "珍惜",

        }
      ],
      layout: "tags",
      theme: {
        tone: "daily",
        bg: "#f9f5ed",
        bg2: "#d8e8dd",
        ink: "#31322b",
        muted: "#707568",
        accent: "#8aa77f",
        accent2: "#f2ba7b",
        paper: "rgba(255,255,255,.76)"
      },
      decorations: ["paperTape", "grain"]
    },
    {
      id: "apr14",
      date: "4.14",
      title: "一起逛街",
      subtitle: "喜欢也会落在很日常的事情里",
      body: [
        "一起去优衣库买衣服了"
      ],
      images: [
        {
          src: "photos/uniqlo-1.jpg",
          alt: "优衣库",
        },
        {
          src: "photos/uniqlo-2.jpg",
          alt: "买衣服",
        }
      ],
      layout: "alternating",
      theme: {
        tone: "daily",
        bg: "#f9f5ed",
        bg2: "#d8e8dd",
        ink: "#31322b",
        muted: "#707568",
        accent: "#8aa77f",
        accent2: "#f2ba7b",
        paper: "rgba(255,255,255,.76)"
      },
      decorations: ["paperTape", "grain"]
    },
    {
      id: "apr16",
      date: "4.16",
      title: "风 筝",
      subtitle: "原来我随口说过的遗憾，你真的记住了",
      body: [
        "我说我喜欢放风筝",
        "今年没放风筝很遗憾",
        "没想到你记下来了，还送了我一个风筝",
        "下次我们一起去让它飞起来吧"
      ],
      images: [
        {
          src: "photos/kite.jpg",
          alt: "风筝",
        }
      ],
      layout: "sky",
      theme: {
        tone: "sky",
        bg: "#dff4ff",
        bg2: "#8ec7f3",
        ink: "#22334c",
        muted: "#5b718d",
        accent: "#3e8bd8",
        accent2: "#f5b7c8",
        paper: "rgba(255,255,255,.7)"
      },
      decorations: ["kite", "cloudLines"]
    },
    {
      id: "apr24",
      date: "4.24",
      body: [
        "说我欺负你，我也觉得",
        "但是其实",
        "我早就在精心准备告白",
        "来了~"
      ],
      images: [
        {
          src: "photos/bouquet-2.jpg",
          alt: "告白前准备的花束",
          caption: "精心准备"
        }
      ],
      layout: "countdown",
      theme: {
        tone: "eve",
        bg: "#16142b",
        bg2: "#533d68",
        ink: "#fff8f2",
        muted: "#dfd5ec",
        accent: "#ffb6cf",
        accent2: "#f9d485",
        paper: "rgba(255,255,255,.12)"
      },
      decorations: ["stars", "breath", "lightVeil"]
    },
    {
      id: "finale",
      date: "4.25",
      title: "美丽的雅蕾女士",
      subtitle: "可以做我女朋友吗？",
      body: [
        "恋爱是从收到一束花和正式的告白开始的"
      ],
      images: [
        {
          src: "photos/bouquet-1.jpg",
          alt: "正式告白的花束",
          caption: "正式的告白"
        },
        {
          src: "photos/bouquet-2.jpg",
          alt: "告白花束细节",
          caption: "一束花"
        }
      ],
      cta: {
        label: "愿意的话，点这里"
      },
      layout: "finale",
      theme: {
        tone: "sunset",
        bg: "#fff0df",
        bg2: "#ff9fb5",
        ink: "#382421",
        muted: "#8a5a55",
        accent: "#ff7c75",
        accent2: "#f5c86d",
        paper: "rgba(255,255,255,.74)"
      },
      decorations: ["petals", "sunsetGlow", "breath"]
    }
  ]
};
